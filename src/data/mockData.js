export const MOCK_USER = {
  name: 'Arnav Amrit',
  email: 'arnav.amrit@company.io',
  role: 'Product Manager',
  avatar: 'AA',
  joinedDate: 'January 2024',
  totalMeetings: 47,
  thisMonth: 8,
}

export const MOCK_HISTORY = [
  {
    id: '1',
    title: 'Q1 Product Roadmap Review',
    date: '2026-03-18',
    duration: '52 min',
    participants: ['Alex Morgan', 'Sarah Chen', 'Mike Torres', 'Priya Nair'],
    preview: 'Reviewed Q1 milestones, discussed feature prioritization for mobile app, and aligned on launch timeline.',
    summary:
      'The team reviewed Q1 progress against OKRs. Mobile app development is on track for April release. Three features were deprioritized due to resource constraints. The design system migration will be completed by end of Q1.',
    decisions: [
      'Launch mobile app beta on April 15th',
      'Deprioritize dark mode until Q2',
      'Hire two additional frontend engineers',
      'Migrate design system to Figma by March 31st',
    ],
    actionItems: [
      { owner: 'Sarah Chen', task: 'Finalize mobile app beta testing plan', due: 'Mar 25' },
      { owner: 'Mike Torres', task: 'Post job listings for frontend engineers', due: 'Mar 22' },
      { owner: 'Priya Nair', task: 'Complete Figma design system audit', due: 'Mar 28' },
      { owner: 'Alex Morgan', task: 'Update Q1 OKR tracker with new timelines', due: 'Mar 20' },
    ],
    tag: 'Product',
  },
  {
    id: '2',
    title: 'Engineering Sprint Planning — Sprint 24',
    date: '2026-03-15',
    duration: '38 min',
    participants: ['Mike Torres', 'Dana Lee', 'Ravi Patel', 'Yuki Tanaka'],
    preview: 'Sprint 24 planning session covering backend API refactor, performance improvements, and bug backlog triage.',
    summary:
      'Sprint 24 scope was finalized with 34 story points. The team agreed to prioritize the authentication refactor and database query optimization. Four critical bugs from the backlog were added to the sprint. CI/CD pipeline improvements were moved to Sprint 25.',
    decisions: [
      'Authentication refactor is top priority for Sprint 24',
      'Database query optimization targeted at 40% performance gain',
      'Move CI/CD improvements to Sprint 25',
      'Daily standups moved to 9:30 AM',
    ],
    actionItems: [
      { owner: 'Ravi Patel', task: 'Begin auth service refactor', due: 'Mar 17' },
      { owner: 'Dana Lee', task: 'Profile slow queries and create optimization plan', due: 'Mar 18' },
      { owner: 'Yuki Tanaka', task: 'Triage and assign remaining bug backlog', due: 'Mar 16' },
      { owner: 'Mike Torres', task: 'Update sprint board and notify stakeholders', due: 'Mar 15' },
    ],
    tag: 'Engineering',
  },
  {
    id: '3',
    title: 'Marketing Campaign — April Launch',
    date: '2026-03-12',
    duration: '61 min',
    participants: ['Jordan Blake', 'Alex Morgan', 'Camille Osei', 'Tom Fischer'],
    preview: 'April product launch campaign strategy, channel allocation, and content calendar finalization.',
    summary:
      'The marketing team aligned on a multi-channel campaign strategy for the April product launch. Budget was allocated across paid social, content marketing, and influencer partnerships. The campaign theme "Work Smarter" was approved. Launch event logistics were confirmed for April 14th in San Francisco.',
    decisions: [
      'Campaign theme approved: "Work Smarter"',
      '$120K total campaign budget approved',
      'Launch event confirmed for April 14th, SF',
      'Influencer partnerships to be finalized by March 20th',
    ],
    actionItems: [
      { owner: 'Jordan Blake', task: 'Draft campaign creative brief', due: 'Mar 19' },
      { owner: 'Camille Osei', task: 'Finalize influencer shortlist and contracts', due: 'Mar 20' },
      { owner: 'Tom Fischer', task: 'Book event venue and catering for April 14th', due: 'Mar 18' },
      { owner: 'Alex Morgan', task: 'Review and approve campaign landing page copy', due: 'Mar 22' },
    ],
    tag: 'Marketing',
  },
  {
    id: '4',
    title: 'Customer Success — Churn Review',
    date: '2026-03-10',
    duration: '44 min',
    participants: ['Lisa Park', 'Alex Morgan', 'Derrick Owens'],
    preview: 'Analysis of Q1 churn trends, at-risk accounts, and retention strategy alignment.',
    summary:
      'Customer success reviewed Q1 churn data showing a 2.3% increase from Q4. Seven enterprise accounts were identified as at-risk. A new 90-day onboarding program was proposed to reduce early churn. Executive business reviews will be scheduled for all accounts over $50K ARR.',
    decisions: [
      'Launch new 90-day onboarding program in April',
      'Schedule EBRs for all accounts over $50K ARR',
      'Assign dedicated CSM to top 10 at-risk accounts',
      'Build churn prediction dashboard by end of Q1',
    ],
    actionItems: [
      { owner: 'Lisa Park', task: 'Design 90-day onboarding playbook', due: 'Mar 25' },
      { owner: 'Derrick Owens', task: 'Reach out to 7 at-risk enterprise accounts', due: 'Mar 13' },
      { owner: 'Alex Morgan', task: 'Commission churn prediction dashboard from data team', due: 'Mar 17' },
    ],
    tag: 'Customer Success',
  },
  {
    id: '5',
    title: 'All-Hands — March Company Update',
    date: '2026-03-05',
    duration: '75 min',
    participants: ['Entire Company (68 attendees)'],
    preview: 'Monthly all-hands covering company performance, Q2 priorities, new hires, and open Q&A.',
    summary:
      'CEO presented strong Q1 results with ARR up 34% YoY. Q2 priorities include expanding into the European market, launching the enterprise tier, and growing the team by 15 people. Three new executives were introduced. The Q&A session surfaced questions around remote work policy, which will be addressed in a separate town hall.',
    decisions: [
      'European market expansion begins Q2',
      'Enterprise tier launch targeted for May',
      'Remote work policy update to be communicated by April 1st',
      '15 new hires planned across engineering, sales, and CS',
    ],
    actionItems: [
      { owner: 'HR Team', task: 'Publish updated remote work policy', due: 'Apr 1' },
      { owner: 'Sales Team', task: 'Begin EU market research and lead gen', due: 'Apr 15' },
      { owner: 'Product Team', task: 'Finalize enterprise tier feature set', due: 'Mar 31' },
    ],
    tag: 'Company',
  },
]

export const TAG_COLORS = {
  Product: 'rgba(100,140,220,0.15)',
  Engineering: 'rgba(80,200,160,0.15)',
  Marketing: 'rgba(200,140,80,0.15)',
  'Customer Success': 'rgba(180,100,220,0.15)',
  Company: 'rgba(220,100,120,0.15)',
}

export const TAG_TEXT_COLORS = {
  Product: '#7eb3f5',
  Engineering: '#5ee0b0',
  Marketing: '#f5c06a',
  'Customer Success': '#c47df5',
  Company: '#f5748a',
}

export const MOCK_TRANSCRIPT = `[00:00] Sarah: Good morning everyone. Let's get started with our weekly sync.
[00:15] Mike: Morning! I have updates on the backend migration.
[00:30] Sarah: Perfect. Mike, go ahead.
[01:00] Mike: We've completed 70% of the database migration. The remaining tables should be done by Thursday. We did hit one issue with legacy foreign key constraints that required schema changes.
[01:45] Sarah: That's great progress. Any blockers?
[02:00] Mike: We need sign-off from the security team on the new schema before we proceed. Dana, can you help coordinate that?
[02:20] Dana: Yes, I'll reach out to the security team today and aim to get approval by Wednesday.
[02:45] Sarah: Excellent. Next item — the new onboarding flow. Priya, what's the status?
[03:00] Priya: The designs are 90% complete. I have two screens left to finalize. I'm targeting end of day tomorrow to hand off to engineering.
[03:30] Mike: Once we get those, we estimate about 5 days of development time.
[03:45] Sarah: So we're looking at next Wednesday for a dev-complete onboarding flow. Does that work for a Friday QA?
[04:00] Mike: That should work if we don't hit any major bugs.
[04:15] Sarah: Let's plan on it. Last item — the investor demo is scheduled for March 28th. We need to make sure the product is stable and the demo environment is set up.
[04:45] Mike: I'll set up a dedicated demo environment this week.
[05:00] Dana: I can prepare the demo script and talking points.
[05:15] Sarah: Perfect. Let's reconvene Thursday for a demo dry run. Thanks everyone!`

export const generateMockMinutes = (input) => {
  return {
    id: Date.now().toString(),
    title: 'Weekly Engineering Sync',
    date: new Date().toISOString().split('T')[0],
    duration: '35 min',
    participants: ['Sarah', 'Mike', 'Dana', 'Priya'],
    preview: 'Weekly sync covering database migration progress, new onboarding flow designs, and investor demo preparation.',
    summary:
      'The team reviewed weekly progress across three key areas. Database migration is 70% complete with a Thursday target, pending security team approval on schema changes. The new onboarding flow designs are nearly complete with engineering handoff planned for tomorrow, targeting dev-complete by next Wednesday. The investor demo on March 28th was discussed — a dedicated demo environment will be set up and a dry run is scheduled for Thursday.',
    decisions: [
      'Database migration to complete by Thursday pending security approval',
      'Onboarding flow dev-complete target: next Wednesday',
      'QA for onboarding flow scheduled for Friday',
      'Investor demo dry run confirmed for Thursday',
    ],
    actionItems: [
      { owner: 'Dana', task: 'Coordinate security team approval for new DB schema', due: 'Wed' },
      { owner: 'Priya', task: 'Finalize remaining 2 onboarding screens', due: 'Tomorrow EOD' },
      { owner: 'Mike', task: 'Set up dedicated demo environment', due: 'This week' },
      { owner: 'Dana', task: 'Prepare investor demo script and talking points', due: 'Mar 26' },
    ],
    tag: 'Engineering',
  }
}