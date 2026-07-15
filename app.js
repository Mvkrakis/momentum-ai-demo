const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const titles = {
  overview: ['Revenue intelligence', 'Good morning, Alex <span class="spark">✦</span>'],
  accounts: ['Account command center', 'Accounts with momentum'],
  tasks: ['AI tasker', 'Work the right actions'],
  dialer: ['Connected calling', 'Prepare for every conversation'],
  workflows: ['Revenue automation', 'Signal-powered workflows'],
  insights: ['Conversation intelligence', 'Buyer context, synthesized'],
  analytics: ['Performance', 'Execution analytics']
};
let toastTimer;

function toast(message) {
  const element = $('#toast');
  element.textContent = message;
  element.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => element.classList.remove('show'), 2800);
}

function showView(view) {
  $$('.view').forEach((node) => node.classList.remove('active-view'));
  $(`#${view}-view`).classList.add('active-view');
  $$('.nav-item[data-view]').forEach((node) => node.classList.toggle('active', node.dataset.view === view));
  $('#view-kicker').textContent = titles[view][0];
  $('#page-title').innerHTML = titles[view][1];
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function load() {
  try {
    const [dashboard, accounts, workflows, activity, tasks, calls] = await Promise.all(
      ['/api/dashboard', '/api/accounts', '/api/workflows', '/api/activity', '/api/tasks', '/api/calls'].map((url) => fetch(url).then((r) => r.json()))
    );
    renderDashboard(dashboard, accounts, activity);
    renderAccounts(accounts);
    renderWorkflows(workflows);
    renderTasks(tasks);
    renderCall(calls[0]);
  } catch {
    const demo = window.momentumDemoData;
    if (demo) {
      renderDashboard(demo.dashboard, demo.accounts, demo.activity);
      renderAccounts(demo.accounts);
      renderWorkflows(demo.workflows);
      renderTasks(demo.tasks);
      renderCall(demo.calls[0]);
      toast('Running in static demo mode.');
    } else {
      toast('Demo data is unavailable. Start the local server and refresh.');
    }
  }
}

function renderDashboard(data, accounts, activity) {
  $('#metrics').innerHTML = data.metrics.map((metric) => `<article class="panel metric"><div class="label">${metric.label}</div><div class="value">${metric.value}</div><div class="delta ${metric.tone}">${metric.delta}</div></article>`).join('');
  $('#task-list').innerHTML = accounts.slice(0, 3).map((account, index) => {
    const actions = ['Send a tailored follow-up', 'Review new buyer signal', 'Unblock the next step'];
    return `<div class="task"><span class="task-icon">${['✦', '◉', '↗'][index]}</span><div><h3>${actions[index]} · ${account.name}</h3><p>${account.signals[0]} · ${account.stage} · ${account.value}</p></div><button data-compose="${account.id}">Act now</button></div>`;
  }).join('');
  $('#activity-list').innerHTML = activity.map((item) => `<div class="activity ${item.type}"><time>${item.time}</time><h3>${item.title}</h3><p>${item.detail}</p></div>`).join('');
  $$('[data-compose]').forEach((button) => button.addEventListener('click', openComposer));
}

function renderAccounts(accounts) {
  $('#accounts-list').innerHTML = accounts.map((account) => `<div class="account-row"><div class="account-name"><span class="account-logo ${account.id === 1 ? 'blue' : ''}">${account.initials}</span><span>${account.name}<small>${account.owner}</small></span></div><span class="stage-text">${account.stage}</span><strong>${account.value}</strong><span class="intent">${account.score}<small>${account.trend}</small></span><span class="signals">${account.signals[0]}</span><button class="row-action" data-account="${account.id}" aria-label="Open ${account.name}">→</button></div>`).join('');
  $$('[data-account]').forEach((button) => button.addEventListener('click', () => {
    toast('Account detail is represented by the Momentum Focus panel.');
    showView('overview');
  }));
}

function renderWorkflows(workflows) {
  $('#workflow-list').innerHTML = workflows.map((workflow) => `<article class="workflow"><div><h3>${workflow.name}</h3><p>Trigger: ${workflow.trigger}</p></div><span class="status ${workflow.status === 'Draft' ? 'draft' : ''}">${workflow.status}</span><span class="number">${workflow.enrolled}<small>enrolled</small></span><button class="row-action" aria-label="Open workflow">→</button></article>`).join('');
}

function renderTasks(tasks) {
  const open = tasks.filter((task) => task.status === 'Open');
  $('#open-task-count').textContent = open.length;
  $('#full-task-list').innerHTML = tasks.map((task) => `<article class="task-row ${task.status === 'Completed' ? 'completed' : ''}"><div><h3>${task.title} · ${task.account}</h3><p>${task.context}</p></div><span class="task-priority ${task.priority.toLowerCase()}">${task.priority}</span><span class="task-due">${task.status === 'Completed' ? 'Completed' : task.due}</span><button class="complete-task" data-task="${task.id}">${task.status === 'Completed' ? 'Done' : 'Complete'}</button></article>`).join('');
  $$('[data-task]').forEach((button) => button.addEventListener('click', async () => {
    if (button.textContent === 'Done') return;
    button.textContent = 'Saving…';
    try {
      const response = await fetch(`/api/tasks/${button.dataset.task}/complete`, { method: 'POST' });
      if (!response.ok) throw new Error('Request failed');
      toast('Task completed and recorded in the activity stream.'); load();
    } catch {
      const task = window.momentumDemoData?.tasks.find((item) => item.id === Number(button.dataset.task));
      if (task) { task.status = 'Completed'; toast('Task completed in this static demo.'); load(); }
      else { toast('Could not update that task.'); }
    }
  }));
}

function renderCall(call) {
  if (!call) return;
  $('#call-card').innerHTML = `<div class="dialer-contact"><span class="account-logo blue">${call.person.split(' ').map((part) => part[0]).join('')}</span><h3>${call.person}</h3><p>${call.role}</p><div class="number-display">${call.phone}</div><div class="talk-track"><strong>AI CALL BRIEF</strong>${call.talkTrack}</div><div class="call-actions"><button class="dark-btn" id="start-call">${call.status === 'Logged' ? 'Call logged' : 'Start simulated call'}</button><button class="outline-btn" id="skip-call">Skip</button></div></div>`;
  $('#start-call').addEventListener('click', async () => {
    if (call.status === 'Logged') return;
    $('#start-call').textContent = 'Logging…';
    try {
      const response = await fetch(`/api/calls/${call.id}/complete`, { method: 'POST' });
      if (!response.ok) throw new Error('Request failed');
      toast('Simulated call logged. No real number was dialed.'); load();
    } catch {
      if (window.momentumDemoData) { call.status = 'Logged'; toast('Simulated call logged. No real number was dialed.'); load(); }
      else { toast('Could not log this simulated call.'); }
    }
  });
  $('#skip-call').addEventListener('click', () => toast('Call skipped — the next buyer is ready to review.'));
}

function openComposer() {
  $('#composer-modal').classList.add('open');
  $('#composer-modal').setAttribute('aria-hidden', 'false');
  $('#email-subject').focus();
}

function closeComposer() {
  $('#composer-modal').classList.remove('open');
  $('#composer-modal').setAttribute('aria-hidden', 'true');
}

async function regenerate() {
  const button = $('#regenerate');
  button.textContent = 'Generating…';
  button.disabled = true;
  try {
    const response = await fetch('/api/compose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Maya', company: 'Northstar Health', signal: 'your team has revisited pricing and discussed a September rollout' })
    });
    const draft = await response.json();
    $('#email-subject').value = draft.subject;
    $('#email-body').value = draft.body;
    toast('A new context-aware draft is ready.');
  } catch {
    toast('Could not regenerate the draft.');
  } finally {
    button.innerHTML = '✦ Regenerate';
    button.disabled = false;
  }
}

$$('.nav-item[data-view]').forEach((button) => button.addEventListener('click', () => showView(button.dataset.view)));
$$('[data-view-target]').forEach((button) => button.addEventListener('click', () => showView(button.dataset.viewTarget)));
$('#view-account').addEventListener('click', () => showView('accounts'));
$('#listen-call').addEventListener('click', () => showView('insights'));
$('#compose-open').addEventListener('click', openComposer);
$('#draft-email').addEventListener('click', openComposer);
$('#draft-email-2').addEventListener('click', openComposer);
$('#draft-from-call').addEventListener('click', openComposer);
$('#compose-close').addEventListener('click', closeComposer);
$('#composer-modal').addEventListener('click', (event) => { if (event.target === $('#composer-modal')) closeComposer(); });
$('#regenerate').addEventListener('click', regenerate);
$('#send-email').addEventListener('click', () => { closeComposer(); toast('Draft queued for review — no email was sent.'); });
$('#new-workflow').addEventListener('click', () => toast('Workflow builder is ready for the next implementation pass.'));
$('#run-workflow').addEventListener('click', () => toast('Test run complete: brief, task, and email draft created.'));
$('#filter-accounts').addEventListener('click', () => toast('Accounts are sorted by intent score in this prototype.'));
$('#task-filter').addEventListener('click', () => toast('This prototype currently shows open and completed tasks together.'));
$('#save-call-note').addEventListener('click', () => {
  $('#call-note').value = '';
  toast('Call note saved locally for this demo session.');
});

load();
