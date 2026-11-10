/**
 * DOMAINS — the five disciplines that define the positioning:
 * FINANCE + BUSINESS + DATA + AUTOMATION + DIGITAL TRANSFORMATION
 *
 * `id` is referenced from projects.js (project.domains).
 * `color` is used for accents throughout the site.
 */
export const domains = [
  {
    id: 'finance',
    label: 'Finance',
    color: '#34d399',
    icon: 'Calculator',
    description: 'Financial analysis, variance explanation and the numbers behind decisions.',
    practices: ['Variance & performance analysis', 'Month-end reporting', 'Financial KPIs'],
  },
  {
    id: 'business',
    label: 'Business',
    color: '#fbbf24',
    icon: 'Briefcase',
    description: 'Understanding processes, stakeholders and what actually needs to improve.',
    practices: ['Process analysis', 'Stakeholder requirements', 'Operational KPIs'],
  },
  {
    id: 'data',
    label: 'Data',
    color: '#38bdf8',
    icon: 'Database',
    description: 'Modelling, transforming and visualising data so it can be trusted and used.',
    practices: ['Data modelling', 'SQL & Databricks', 'Power BI & DAX'],
  },
  {
    id: 'automation',
    label: 'Automation',
    color: '#a78bfa',
    icon: 'Workflow',
    description: 'Removing repetitive manual steps with flows, macros and integrations.',
    practices: ['Power Automate flows', 'Excel / VBA tools', 'Notifications & approvals'],
  },
  {
    id: 'transformation',
    label: 'Digital Transformation',
    color: '#f472b6',
    icon: 'Sparkles',
    description: 'Moving manual, spreadsheet-based processes onto connected digital platforms.',
    practices: ['Power Apps solutions', 'SharePoint & Dataverse', 'End-to-end solution design'],
  },
]
