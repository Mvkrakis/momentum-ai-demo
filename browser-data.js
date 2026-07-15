window.momentumDemoData = {
  dashboard: {
    metrics: [
      { label: 'Pipeline influenced', value: '$482.4k', delta: '+18.6%', tone: 'positive' },
      { label: 'Accounts needing action', value: '24', delta: '7 high intent', tone: 'warning' },
      { label: 'Reply rate', value: '31.8%', delta: '+6.2% vs. last month', tone: 'positive' },
      { label: 'Tasks completed', value: '186', delta: '92% on time', tone: 'neutral' }
    ]
  },
  accounts: [
    { id: 1, name: 'Northstar Health', initials: 'NH', owner: 'Alex Morgan', stage: 'Evaluation', value: '$72,000', score: 86, trend: '+14', signals: ['Pricing page revisited', 'VP mentioned September', 'Champion opened follow-up'] },
    { id: 2, name: 'Arcade Systems', initials: 'AS', owner: 'Alex Morgan', stage: 'Discovery', value: '$48,000', score: 72, trend: '+8', signals: ['Demo watched', 'New executive buyer'] },
    { id: 3, name: 'Meridian Labs', initials: 'ML', owner: 'Jordan Lee', stage: 'Proposal', value: '$120,000', score: 67, trend: '-3', signals: ['Security review stalled'] },
    { id: 4, name: 'Verve Retail', initials: 'VR', owner: 'Alex Morgan', stage: 'Qualification', value: '$31,000', score: 59, trend: '+4', signals: ['Engaged with case study'] }
  ],
  workflows: [
    { id: 1, name: 'High-intent account follow-up', status: 'Active', enrolled: 38, conversion: '24.1%', trigger: 'Intent score exceeds 75' },
    { id: 2, name: 'Stalled deal rescue', status: 'Active', enrolled: 12, conversion: '16.7%', trigger: 'No activity for 10 days' },
    { id: 3, name: 'New champion welcome', status: 'Draft', enrolled: 0, conversion: '—', trigger: 'New senior contact added' }
  ],
  activity: [
    { type: 'signal', time: '8 min ago', title: 'Northstar Health viewed pricing', detail: 'Maya Chen returned to the Enterprise plan twice.' },
    { type: 'task', time: '31 min ago', title: 'Follow-up completed', detail: 'Sequence step 3 sent to Arcade Systems.' },
    { type: 'call', time: '1 hr ago', title: 'Call insight captured', detail: 'Meridian Labs: security review is now the key blocker.' },
    { type: 'signal', time: '2 hrs ago', title: 'Buying committee expanded', detail: 'A new VP was added at Verve Retail.' }
  ],
  tasks: [
    { id: 101, title: 'Send a tailored follow-up', account: 'Northstar Health', due: 'Due now', priority: 'High', status: 'Open', context: 'Pricing engagement rose 18 points after the technical alignment call.' },
    { id: 102, title: 'Call the new executive buyer', account: 'Arcade Systems', due: 'Today, 2:00 PM', priority: 'High', status: 'Open', context: 'Nate Brooks, CRO, was added to the account buying committee.' },
    { id: 103, title: 'Share security overview', account: 'Meridian Labs', due: 'Tomorrow', priority: 'Medium', status: 'Open', context: 'Security review was named as the next decision gate.' },
    { id: 104, title: 'Review engagement summary', account: 'Verve Retail', due: 'Tomorrow', priority: 'Low', status: 'Open', context: 'A new executive buyer engaged with the retail case study.' }
  ],
  calls: [
    { id: 301, person: 'Nate Brooks', role: 'CRO at Arcade Systems', phone: '+1 (415) 555-0198', status: 'Ready', talkTrack: 'Open with the leadership priority observed in the demo follow-up, then explore the new executive buying process.' }
  ]
};
