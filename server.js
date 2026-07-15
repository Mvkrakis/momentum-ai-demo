const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { dashboard, accounts, workflows, activity, tasks, calls } = require('./mock-data');

const root = __dirname;
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml' };

function json(res, body, status = 200) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname === '/api/dashboard') return json(res, dashboard);
  if (url.pathname === '/api/accounts') return json(res, accounts);
  if (url.pathname === '/api/workflows') return json(res, workflows);
  if (url.pathname === '/api/activity') return json(res, activity);
  if (url.pathname === '/api/tasks') return json(res, tasks);
  if (url.pathname === '/api/calls') return json(res, calls);
  const completeTask = url.pathname.match(/^\/api\/tasks\/(\d+)\/complete$/);
  if (completeTask && req.method === 'POST') {
    const task = tasks.find((item) => item.id === Number(completeTask[1]));
    if (!task) return json(res, { error: 'Task not found' }, 404);
    task.status = 'Completed';
    return json(res, task);
  }
  const completeCall = url.pathname.match(/^\/api\/calls\/(\d+)\/complete$/);
  if (completeCall && req.method === 'POST') {
    const call = calls.find((item) => item.id === Number(completeCall[1]));
    if (!call) return json(res, { error: 'Call not found' }, 404);
    call.status = 'Logged';
    return json(res, call);
  }
  if (url.pathname === '/api/compose' && req.method === 'POST') {
    let body = '';
    req.on('data', (part) => body += part);
    return req.on('end', () => {
      const { name = 'there', company = 'your team', signal = 'your recent priorities' } = JSON.parse(body || '{}');
      json(res, { subject: `A practical next step for ${company}`, body: `Hi ${name},\n\nI noticed ${signal}. Teams like yours are using Momentum to focus every follow-up on the signals that matter most.\n\nWould a 15-minute working session next week be useful?\n\nBest,\nAlex` });
    });
  }
  const safePath = url.pathname === '/' ? '/site.html' : url.pathname;
  const filePath = path.join(root, safePath);
  if (!filePath.startsWith(root) || !fs.existsSync(filePath)) return json(res, { error: 'Not found' }, 404);
  res.writeHead(200, { 'Content-Type': mime[path.extname(filePath)] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(3000, () => console.log('Momentum AI running at http://localhost:3000'));
