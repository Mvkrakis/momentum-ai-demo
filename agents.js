const agentData = {
  scout: { icon: '◉', kicker: 'SIGNAL SCOUT · NORTHSTAR HEALTH', title: 'Three buyer signals need attention.', description: 'A stakeholder revisited pricing, a rollout date was mentioned, and the technical champion opened the follow-up.', evidence: ['Pricing engagement increased this week', 'September target mentioned in call', 'Champion re-opened the proposal'], action: 'Recommended action: prepare a rollout follow-up' },
  brief: { icon: '≋', kicker: 'BRIEF MAKER · MERIDIAN LABS', title: 'A handoff brief is ready for the security review.', description: 'Key stakeholders, timeline, open risks, and relevant conversation evidence are organized into a shareable account view.', evidence: ['Security review is the current decision gate', 'IT lead requested a risk summary', 'Proposal has not been viewed for 6 days'], action: 'Recommended action: share the brief with the account team' },
  steward: { icon: '⌁', kicker: 'CRM STEWARD · ARCADE SYSTEMS', title: 'Two record changes are ready to review.', description: 'The Operator detected a new economic buyer and a changed expected decision window from customer activity.', evidence: ['CRO appeared in the buying committee', 'Decision timeline moved to Q3', 'Opportunity owner is still current'], action: 'Recommended action: approve two suggested field updates' },
  lens: { icon: '◌', kicker: 'THEME LENS · MARKET VIEW', title: 'Security language is appearing across enterprise deals.', description: 'A recurring pattern was found across eight recent customer conversations and can inform positioning.', evidence: ['8 accounts mention security review', 'Mentions rose 28% this month', 'Most common concern: data residency'], action: 'Recommended action: create a market theme report' },
  research: { icon: '⌕', kicker: 'DEAL RESEARCHER · VERVE RETAIL', title: 'An account preparation report is ready.', description: 'The Operator assembled public account context with recent interaction history for a more useful first meeting.', evidence: ['New executive stakeholder identified', 'Retail case study was engaged twice', 'No competitive risk found in demo data'], action: 'Recommended action: review the account preparation report' },
  coach: { icon: '↗', kicker: 'PRACTICE COACH · ALEX MORGAN', title: 'A targeted practice moment is ready.', description: 'The Operator created a role-play based on a recurring objection and evidence from recent conversations.', evidence: ['Pricing objection surfaced in 3 calls', 'Talk-time balance dropped below target', 'Top performers lead with rollout planning'], action: 'Recommended action: start a 5-minute role play' },
  bridge: { icon: '文', kicker: 'LANGUAGE BRIDGE · GLOBAL TEAM', title: 'A translated account summary is ready.', description: 'Customer context has been adapted for a regional teammate while keeping source evidence linked.', evidence: ['Summary prepared in Spanish', 'Original quote is preserved', 'Account owner access is verified'], action: 'Recommended action: share the localized brief' },
  builder: { icon: '✦', kicker: 'PLAYBOOK BUILDER · FOLLOW-UP FLOW', title: 'A repeatable follow-up flow is ready to test.', description: 'The Operator turned a strong account motion into a reviewable automation with a clear stop condition.', evidence: ['Based on 12 high-reply examples', 'Human review required before send', 'Stops when a reply is detected'], action: 'Recommended action: run the workflow test' }
};

const operatorButtons = [...document.querySelectorAll('.operator')];
const agentIcon = document.querySelector('#agent-icon');
const agentKicker = document.querySelector('#agent-kicker');
const agentTitle = document.querySelector('#agent-title');
const agentDescription = document.querySelector('#agent-description');
const agentEvidence = document.querySelector('#agent-evidence');
const agentAction = document.querySelector('#agent-action');
const agentState = document.querySelector('#agent-state');
const run = document.querySelector('#run-agent');

function showAgent(key) {
  const agent = agentData[key];
  agentIcon.textContent = agent.icon;
  agentKicker.textContent = agent.kicker;
  agentTitle.textContent = agent.title;
  agentDescription.textContent = agent.description;
  agentEvidence.innerHTML = agent.evidence.map((item) => '<li>' + item + '</li>').join('');
  agentAction.textContent = agent.action;
  agentState.textContent = 'Ready';
  operatorButtons.forEach((button) => button.classList.toggle('active', button.dataset.agent === key));
  run.dataset.agent = key;
}

operatorButtons.forEach((button) => button.addEventListener('click', () => showAgent(button.dataset.agent)));
run.addEventListener('click', () => {
  run.disabled = true;
  run.textContent = 'Running…';
  agentState.textContent = 'Working';
  setTimeout(() => {
    run.disabled = false;
    run.innerHTML = 'Preview ready <b>✓</b>';
    agentState.textContent = 'Reviewed';
  }, 650);
});
showAgent('scout');
