/**
 * SKILLS & TECHNOLOGIES
 *
 * To add a skill: append an object to `skills`.
 *  - id:        unique, kebab-case — referenced from projects.js (stack[].skill)
 *  - short:     (optional) shorter label for chips and the network diagram
 *  - category:  one of the skillCategories ids
 *  - icon:      a name registered in src/components/Icon.jsx
 *  - summary:   one sentence
 *  - uses:      2–4 bullets on how you apply it
 *
 * Related case studies and "connects with" links are calculated
 * automatically from projects.js — no need to maintain them here.
 */
export const skillCategories = [
  { id: 'bi', label: 'Business Intelligence', color: '#38bdf8' },
  { id: 'power-platform', label: 'Power Platform & M365', color: '#a78bfa' },
  { id: 'data', label: 'Data Engineering', color: '#fb923c' },
  { id: 'excel', label: 'Excel Automation', color: '#34d399' },
  { id: 'business', label: 'Business & Finance', color: '#fbbf24' },
]

export const skills = [
  // ── Business Intelligence ──────────────────────────────
  {
    id: 'power-bi',
    name: 'Power BI',
    category: 'bi',
    icon: 'BarChart3',
    summary: 'Interactive reporting and self-service analytics, from data preparation to published dashboards.',
    uses: ['Power Query data preparation', 'Report & dashboard design', 'Drill-down and drill-through analysis'],
  },
  {
    id: 'dax',
    name: 'DAX',
    category: 'bi',
    icon: 'Sigma',
    summary: 'Measure logic that defines KPIs once and reuses them consistently across every report.',
    uses: ['KPI and ratio measures', 'Time intelligence & period comparisons', 'Variance calculations'],
  },
  {
    id: 'data-modeling',
    name: 'Data Modeling',
    category: 'bi',
    icon: 'Network',
    summary: 'Star-schema semantic models that are fast, understandable and easy to extend.',
    uses: ['Fact / dimension design', 'Relationships & granularity', 'Date tables & model hygiene'],
  },

  // ── Power Platform & Microsoft 365 ─────────────────────
  {
    id: 'power-apps',
    name: 'Power Apps',
    category: 'power-platform',
    icon: 'AppWindow',
    summary: 'Business applications that replace spreadsheets and email chains with a structured process.',
    uses: ['Canvas app front ends', 'Data entry & review screens', 'Role-specific views'],
  },
  {
    id: 'power-automate',
    name: 'Power Automate',
    category: 'power-platform',
    icon: 'Workflow',
    summary: 'Cloud flows that orchestrate hand-offs, notifications and data movement between systems.',
    uses: ['Form- and event-triggered flows', 'Notifications & reminders', 'Writing data between services'],
  },
  {
    id: 'sharepoint',
    name: 'SharePoint',
    category: 'power-platform',
    icon: 'FolderTree',
    summary: 'Lists and libraries as a lightweight, governed data store for business processes.',
    uses: ['Lists as process data stores', 'Reference & master data', 'Document libraries'],
  },
  {
    id: 'ms-forms',
    name: 'Microsoft Forms',
    short: 'MS Forms',
    category: 'power-platform',
    icon: 'ClipboardList',
    summary: 'Simple, structured data capture that anyone in the organisation can use.',
    uses: ['Standardised questionnaires', 'Evaluation & survey input', 'Triggering automated flows'],
  },
  {
    id: 'dataverse',
    name: 'Dataverse',
    category: 'power-platform',
    icon: 'Boxes',
    summary: 'Relational data platform for Power Platform solutions that need more structure and security.',
    uses: ['Relational tables for apps', 'Business rules & security roles', 'Power Platform integration'],
  },

  // ── Data Engineering ───────────────────────────────────
  {
    id: 'databricks',
    name: 'Databricks',
    category: 'data',
    icon: 'Layers',
    summary: 'Consolidating and transforming data at scale before it reaches the reporting layer.',
    uses: ['Consolidating multiple sources', 'Transformation notebooks', 'Curated tables for Power BI'],
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'data',
    icon: 'Database',
    summary: 'Querying, joining and shaping data with clear, testable transformation logic.',
    uses: ['Joins & aggregations', 'Business-rule transformations', 'Data validation queries'],
  },

  // ── Excel Automation ───────────────────────────────────
  {
    id: 'excel',
    name: 'Excel',
    category: 'excel',
    icon: 'Sheet',
    summary: 'Structured models and analysis tools built where finance teams already work.',
    uses: ['Calculation models', 'Structured tables & lookups', 'Reporting layouts'],
  },
  {
    id: 'vba',
    name: 'VBA',
    category: 'excel',
    icon: 'Code2',
    summary: 'Macros that turn repetitive spreadsheet routines into one-click, repeatable processes.',
    uses: ['Data import & cleanup', 'Automated report generation', 'Recurring month-end routines'],
  },

  // ── Business & Finance ─────────────────────────────────
  {
    id: 'financial-analysis',
    name: 'Financial & Business Analysis',
    short: 'Financial Analysis',
    category: 'business',
    icon: 'TrendingUp',
    summary: 'Framing the right questions, explaining variances and turning numbers into decisions.',
    uses: ['Variance analysis', 'KPI definition', 'Management reporting'],
  },
  {
    id: 'process-automation',
    name: 'Process Automation',
    category: 'business',
    icon: 'Bot',
    summary: 'Identifying repetitive, error-prone steps and designing them out of the process.',
    uses: ['Process mapping', 'Automation opportunity assessment', 'Designing repeatable workflows'],
  },
  {
    id: 'digital-transformation',
    name: 'Digital Transformation',
    category: 'business',
    icon: 'Sparkles',
    summary: 'Re-designing manual processes end to end on connected digital platforms.',
    uses: ['End-to-end solution design', 'Stakeholder adoption', 'Replacing manual workarounds'],
  },
]
