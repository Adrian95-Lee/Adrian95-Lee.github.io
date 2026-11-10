/**
 * PROFILE — edit your personal details here.
 *
 * Anything left as an empty string ('') is simply hidden on the site,
 * so you never publish a placeholder by accident.
 */
export const profile = {
  name: 'Adrian Lee',
  initials: 'AL',
  role: 'Financial Analyst',
  company: 'Sandvik',
  location: 'Seremban, Malaysia',

  // Short positioning line shown in the hero.
  headline: 'Finance professional who designs and builds data, automation and digital solutions.',

  // Words that rotate in the hero: "Where finance meets ___"
  rotatingWords: ['data', 'automation', 'business intelligence', 'digital transformation'],

  tagline:
    'I start from the business question — the decision, the process, the number that needs explaining — and build the system that answers it: the data model, the workflow, the app and the dashboard.',

  // Paragraphs for the About section.
  summary: [
    'I work as a Financial Analyst, but much of my work sits beyond traditional finance. I look at how a business process actually runs, where the data comes from, and where time and accuracy are lost — then design and build the solution.',
    'That means combining financial and business analysis with hands-on delivery in Power BI, the Power Platform, SharePoint, Databricks/SQL and Excel/VBA. I care about solutions that people actually adopt: clear, maintainable and grounded in how the business works.',
  ],

  // Bullet points on the "Current role" card.
  focusAreas: [
    'Financial & business analysis',
    'Business intelligence & reporting',
    'Process automation',
    'Application development on the Power Platform',
    'Data engineering & modelling',
    'Digital transformation of manual processes',
  ],

  // Role types you want recruiters to associate you with.
  openTo: ['Digital Transformation', 'Business Intelligence', 'Data Analytics', 'Automation'],

  // ⚠️ TODO: fill these in before publishing. Empty values are hidden.
  // Use a personal email for a public site rather than a work address.
  contact: {
    email: '',
    linkedin: '', // e.g. 'https://www.linkedin.com/in/your-handle'
    github: '', // e.g. 'https://github.com/your-handle'
    resumeUrl: '', // e.g. './Adrian-Lee-CV.pdf' (place the file in /public)
  },
}

/**
 * "How I work" — the method used for every case study.
 */
export const approach = [
  {
    id: 'problem',
    title: 'Business Problem',
    icon: 'Target',
    question: 'What decision or process is hard today — and why?',
    text: 'Understand the process, the stakeholders and the cost of the current way of working before touching any tool.',
  },
  {
    id: 'solution',
    title: 'Solution Design',
    icon: 'Lightbulb',
    question: 'What should the end-to-end process look like?',
    text: 'Design the target process and data flow first, so technology serves the process — not the other way around.',
  },
  {
    id: 'technologies',
    title: 'Technologies',
    icon: 'Layers',
    question: 'Which tools fit the people, data and constraints?',
    text: 'Choose the simplest stack that the organisation can run and support — often the platforms it already owns.',
  },
  {
    id: 'how',
    title: 'How It Works',
    icon: 'Workflow',
    question: 'How does data move from input to insight?',
    text: 'Build the pieces — forms, flows, models, measures, reports — and connect them into one reliable pipeline.',
  },
  {
    id: 'value',
    title: 'Business Value',
    icon: 'TrendingUp',
    question: 'What is better for the business now?',
    text: 'Judge the result by consistency, effort saved, decision quality and adoption — not by the technology used.',
  },
]
