const dashboard = {
  user: { name: 'Alex Morgan', initials: 'AM' },
  metrics: [
    { label: 'Pipeline influenced', value: '$482.4k', delta: '+18.6%', tone: 'positive' },
    { label: 'Accounts needing action', value: '24', delta: '7 high intent', tone: 'warning' },
    { label: 'Reply rate', value: '31.8%', delta: '+6.2% vs. last month', tone: 'positive' },
    { label: 'Tasks completed', value: '186', delta: '92% on time', tone: 'neutral' }
  ],
  insight: { score: 86, title: 'Northstar Health is ready for a point of view', text: 'Three stakeholders engaged with pricing this week. Their VP of Operations mentioned a September rollout target in yesterday\'s call.', tags: ['3 buying signals', 'High fit', 'Next step overdue'] }
};

const accounts = [
  { id: 1, name: 'Northstar Health', initials: 'NH', owner: 'Alex Morgan', stage: 'Evaluation', value: '$72,000', score: 86, trend: '+14', signals: ['Pricing page revisited', 'VP mentioned September', 'Champion opened follow-up'], contacts: [{ name: 'Maya Chen', role: 'VP, Operations' }, { name: 'Jon Bell', role: 'Director, Revenue Ops' }] },
  { id: 2, name: 'Arcade Systems', initials: 'AS', owner: 'Alex Morgan', stage: 'Discovery', value: '$48,000', score: 72, trend: '+8', signals: ['Demo watched', 'New executive buyer'], contacts: [{ name: 'Nate Brooks', role: 'CRO' }] },
  { id: 3, name: 'Meridian Labs', initials: 'ML', owner: 'Jordan Lee', stage: 'Proposal', value: '$120,000', score: 67, trend: '-3', signals: ['Security review stalled'], contacts: [{ name: 'Mina Patel', role: 'Head of IT' }] },
  { id: 4, name: 'Verve Retail', initials: 'VR', owner: 'Alex Morgan', stage: 'Qualification', value: '$31,000', score: 59, trend: '+4', signals: ['Engaged with case study'], contacts: [{ name: 'Sam Wilson', role: 'Growth Lead' }] }
];

const workflows = [
  { id: 1, name: 'High-intent account follow-up', status: 'Active', enrolled: 38, conversion: '24.1%', trigger: 'Intent score exceeds 75' },
  { id: 2, name: 'Stalled deal rescue', status: 'Active', enrolled: 12, conversion: '16.7%', trigger: 'No activity for 10 days' },
  { id: 3, name: 'New champion welcome', status: 'Draft', enrolled: 0, conversion: '—', trigger: 'New senior contact added' }
];

const activity = [
  { type: 'signal', time: '8 min ago', title: 'Northstar Health viewed pricing', detail: 'Maya Chen returned to the Enterprise plan twice.' },
  { type: 'task', time: '31 min ago', title: 'Follow-up completed', detail: 'Sequence step 3 sent to Arcade Systems.' },
  { type: 'call', time: '1 hr ago', title: 'Call insight captured', detail: 'Meridian Labs: security review is now the key blocker.' },
  { type: 'signal', time: '2 hrs ago', title: 'Buying committee expanded', detail: 'A new VP was added at Verve Retail.' }
];

const tasks = [
  { id: 101, title: 'Send a tailored follow-up', account: 'Northstar Health', owner: 'Alex Morgan', due: 'Due now', priority: 'High', type: 'Email', status: 'Open', context: 'Pricing engagement rose 18 points after the technical alignment call.' },
  { id: 102, title: 'Call the new executive buyer', account: 'Arcade Systems', owner: 'Alex Morgan', due: 'Today, 2:00 PM', priority: 'High', type: 'Call', status: 'Open', context: 'Nate Brooks, CRO, was added to the account buying committee.' },
  { id: 103, title: 'Share security overview', account: 'Meridian Labs', owner: 'Jordan Lee', due: 'Tomorrow', priority: 'Medium', type: 'Email', status: 'Open', context: 'Security review was named as the next decision gate.' },
  { id: 104, title: 'Review engagement summary', account: 'Verve Retail', owner: 'Alex Morgan', due: 'Tomorrow', priority: 'Low', type: 'Review', status: 'Open', context: 'A new executive buyer engaged with the retail case study.' }
];

const calls = [
  { id: 301, person: 'Nate Brooks', role: 'CRO at Arcade Systems', phone: '+1 (415) 555-0198', account: 'Arcade Systems', status: 'Ready', talkTrack: 'Open with the leadership priority observed in the demo follow-up, then explore the new executive buying process.' },
  { id: 302, person: 'Maya Chen', role: 'VP, Operations at Northstar Health', phone: '+1 (212) 555-0144', account: 'Northstar Health', status: 'Ready', talkTrack: 'Confirm September rollout requirements and offer a steering committee prep session.' }
];

module.exports = { dashboard, accounts, workflows, activity, tasks, calls };
