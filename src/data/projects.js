/**
 * CASE STUDIES
 *
 * Each project follows: Business Problem → Solution → Technologies → How It Works → Business Value
 *
 * To add a project, copy one object below and edit it.
 *  - id:         unique, kebab-case
 *  - domains:    ids from domains.js  (finance | business | data | automation | transformation)
 *  - stack:      [{ skill: <id from skills.js>, role: 'what it does in this project' }]
 *  - architecture.nodes:
 *        { id, label, sub?, col, row, skill? | type: 'actor' | 'source', note }
 *        col = left→right stage (0,1,2…), row = vertical position (decimals allowed)
 *  - architecture.edges: { from, to, label? }   (always point left → right)
 *
 * PUBLIC-SITE RULE: describe the problem class and the solution design.
 * Do not add confidential data, internal system names, figures or screenshots,
 * and only add measured results you can stand behind publicly.
 */
export const projects = [
  // ─────────────────────────────────────────────────────────────
  {
    id: 'supplier-performance',
    title: 'Supplier Performance Evaluation System',
    subtitle: 'An end-to-end digital evaluation workflow — from stakeholder input to management scorecards.',
    icon: 'Users',
    featured: true,
    domains: ['business', 'data', 'automation', 'transformation'],
    summary:
      'A connected Power Platform and analytics solution that collects supplier evaluations in a standard format, automates the workflow around them, and consolidates results into Power BI scorecards.',

    problem: {
      headline: 'Supplier evaluation needs input from many people — and manual collection does not scale.',
      points: [
        'A fair evaluation depends on structured feedback from multiple stakeholders across functions.',
        'Collecting responses through email and spreadsheets is hard to coordinate, follow up and keep consistent.',
        'Consolidating results by hand makes it slow to compare suppliers or see trends across evaluation periods.',
        'Management needs a reliable, traceable view to support supplier decisions.',
      ],
    },

    solution: {
      headline: 'A connected Power Platform workflow with a consolidated analytics layer on top.',
      points: [
        'Standardised evaluation forms so every supplier is assessed against the same criteria.',
        'An app to manage suppliers, evaluation cycles and submissions in one place.',
        'Automated flows that route submissions, handle notifications and store responses centrally.',
        'A Databricks data layer feeding Power BI scorecards, comparisons and trend analysis.',
      ],
    },

    stack: [
      { skill: 'ms-forms', role: 'Structured evaluation questionnaires for stakeholders' },
      { skill: 'power-apps', role: 'Front end for managing suppliers, evaluation cycles and reviews' },
      { skill: 'power-automate', role: 'Orchestrates triggers, notifications and data movement' },
      { skill: 'sharepoint', role: 'Central store for evaluation records and reference lists' },
      { skill: 'databricks', role: 'Consolidates and transforms evaluation data for analysis' },
      { skill: 'sql', role: 'Transformation and scoring logic in the data layer' },
      { skill: 'power-bi', role: 'Supplier scorecards, comparisons and trend dashboards' },
      { skill: 'process-automation', role: 'Removes manual hand-offs across the evaluation cycle' },
      { skill: 'digital-transformation', role: 'Moves a manual process onto a connected digital platform' },
    ],

    howItWorks: [
      { title: 'Set up the cycle', detail: 'Suppliers and evaluation criteria are maintained as reference data, and an evaluation cycle is managed from the app.' },
      { title: 'Capture', detail: 'Stakeholders complete a standardised Microsoft Form for each supplier they evaluate.' },
      { title: 'Orchestrate', detail: 'Power Automate picks up each submission, writes it to SharePoint and handles notifications along the way.' },
      { title: 'Consolidate', detail: 'Evaluation records are brought into Databricks, where SQL transformations apply consistent scoring and shape the data for reporting.' },
      { title: 'Report', detail: 'Power BI presents supplier scorecards, comparisons and trends for procurement and management.' },
    ],

    value: [
      { title: 'Consistency', detail: 'Every supplier is assessed on the same criteria, in the same format.' },
      { title: 'Less manual coordination', detail: 'Routing, notifications and data capture are handled by flows rather than email follow-ups.' },
      { title: 'Single source of truth', detail: 'Evaluation data is stored centrally and traceable back to each submission.' },
      { title: 'Better decision support', detail: 'Scorecards and trends give management a clearer basis for supplier discussions.' },
    ],

    architecture: {
      nodes: [
        { id: 'evaluators', label: 'Evaluators', sub: 'Stakeholders', type: 'actor', col: 0, row: 0, note: 'Colleagues across functions who assess supplier performance.' },
        { id: 'admins', label: 'Process owners', sub: 'Procurement', type: 'actor', col: 0, row: 1.6, note: 'Manage suppliers, criteria and evaluation cycles.' },
        { id: 'forms', label: 'MS Forms', sub: 'Capture', skill: 'ms-forms', col: 1, row: 0, note: 'Standardised questionnaire — same criteria for every supplier.' },
        { id: 'app', label: 'Power Apps', sub: 'Manage', skill: 'power-apps', col: 1, row: 1.6, note: 'App for managing suppliers, cycles and reviewing submissions.' },
        { id: 'flow', label: 'Power Automate', sub: 'Orchestrate', skill: 'power-automate', col: 2, row: 0, note: 'Triggered by each submission; stores data and sends notifications.' },
        { id: 'sp', label: 'SharePoint', sub: 'Store', skill: 'sharepoint', col: 3, row: 0.8, note: 'Lists holding evaluation records and reference data.' },
        { id: 'dbx', label: 'Databricks', sub: 'Transform · SQL', skill: 'databricks', col: 4, row: 0.8, note: 'Consolidation and scoring logic written in SQL.' },
        { id: 'pbi', label: 'Power BI', sub: 'Analyse', skill: 'power-bi', col: 5, row: 0.8, note: 'Scorecards, supplier comparisons and trends.' },
        { id: 'mgmt', label: 'Management', sub: 'Decisions', type: 'actor', col: 6, row: 0.8, note: 'Uses the scorecards to support supplier decisions.' },
      ],
      edges: [
        { from: 'evaluators', to: 'forms', label: 'submit' },
        { from: 'admins', to: 'app', label: 'manage' },
        { from: 'forms', to: 'flow', label: 'trigger' },
        { from: 'flow', to: 'sp', label: 'write' },
        { from: 'app', to: 'sp', label: 'sync' },
        { from: 'sp', to: 'dbx', label: 'ingest' },
        { from: 'dbx', to: 'pbi', label: 'curated' },
        { from: 'pbi', to: 'mgmt', label: 'insight' },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────
  {
    id: 'production-analytics',
    title: 'Machine & Production Analytics',
    subtitle: 'A Power BI semantic model and reporting suite that turns production data into operational insight.',
    icon: 'Factory',
    featured: true,
    domains: ['data', 'business', 'finance'],
    summary:
      'A dimensional data model and DAX measure layer in Power BI that gives operations and finance a consistent, interactive view of machine and production performance.',

    problem: {
      headline: 'Production data is detailed and plentiful — turning it into consistent KPIs is the hard part.',
      points: [
        'Machine and production data is recorded at a granular, transactional level that is not directly usable for decisions.',
        'Different reports and spreadsheets can end up calculating the same KPI in different ways.',
        'Stakeholders need to move quickly between high-level trends and machine- or period-level detail.',
      ],
    },

    solution: {
      headline: 'A well-structured semantic model with reusable measures and interactive reports.',
      points: [
        'A star-schema model separating facts (production activity) from dimensions such as date, machine and product.',
        'A central library of DAX measures, so each KPI is defined once and reused everywhere.',
        'Interactive Power BI reports with drill-down, filtering and period comparisons.',
      ],
    },

    stack: [
      { skill: 'power-bi', role: 'Data preparation in Power Query, report design and publishing' },
      { skill: 'data-modeling', role: 'Star-schema design, relationships and granularity decisions' },
      { skill: 'dax', role: 'KPI calculations, time intelligence and comparison measures' },
      { skill: 'financial-analysis', role: 'Framing KPIs around the questions operations and finance ask' },
    ],

    howItWorks: [
      { title: 'Prepare', detail: 'Source production data is loaded and shaped in Power Query — cleaned, typed and aligned to a consistent grain.' },
      { title: 'Model', detail: 'Data is organised into fact and dimension tables with clear relationships and a dedicated date table.' },
      { title: 'Measure', detail: 'DAX measures implement the KPIs, time intelligence (e.g. month-to-date, prior period) and variance logic.' },
      { title: 'Visualise', detail: 'Report pages move from an overview to detailed analysis by machine, period and other dimensions.' },
      { title: 'Explore', detail: 'Users answer their own follow-up questions with filters and drill-through instead of requesting ad-hoc extracts.' },
    ],

    value: [
      { title: 'One definition per KPI', detail: 'Central measures keep numbers consistent across every page and report.' },
      { title: 'Self-service insight', detail: 'Stakeholders explore the data themselves at the level of detail they need.' },
      { title: 'Operations + finance view', detail: 'Production performance can be read alongside the financial questions it drives.' },
      { title: 'Easy to extend', detail: 'New measures and pages build on the same model rather than starting from scratch.' },
    ],

    architecture: {
      nodes: [
        { id: 'src', label: 'Machine data', sub: 'Source systems', type: 'source', col: 0, row: 0.6, note: 'Machine and production records at transactional level.' },
        { id: 'pq', label: 'Power Query', sub: 'Prepare', skill: 'power-bi', col: 1, row: 0.6, note: 'Cleansing, typing and shaping data to a consistent grain.' },
        { id: 'fact', label: 'Fact tables', sub: 'Model', skill: 'data-modeling', col: 2, row: 0, note: 'Production activity at the chosen granularity.' },
        { id: 'dim', label: 'Dimensions', sub: 'Model', skill: 'data-modeling', col: 2, row: 1.2, note: 'Date, machine, product and other lookup tables.' },
        { id: 'dax', label: 'DAX measures', sub: 'Calculate', skill: 'dax', col: 3, row: 0.6, note: 'KPIs, time intelligence and variance measures — defined once.' },
        { id: 'rep', label: 'Power BI', sub: 'Reports', skill: 'power-bi', col: 4, row: 0.6, note: 'Overview, drill-down and comparison pages.' },
        { id: 'users', label: 'Ops & Finance', sub: 'Users', type: 'actor', col: 5, row: 0.6, note: 'Explore performance and follow-up questions themselves.' },
      ],
      edges: [
        { from: 'src', to: 'pq', label: 'load' },
        { from: 'pq', to: 'fact' },
        { from: 'pq', to: 'dim' },
        { from: 'fact', to: 'dax', label: 'facts' },
        { from: 'dim', to: 'dax', label: 'filters' },
        { from: 'dax', to: 'rep', label: 'KPIs' },
        { from: 'rep', to: 'users', label: 'insight' },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────
  {
    id: 'workforce-variance',
    title: 'Automated Monthly Workforce & Variance Analysis',
    subtitle: 'An Excel + VBA tool that automates a recurring month-end analysis cycle.',
    icon: 'Table2',
    featured: true,
    domains: ['finance', 'automation'],
    summary:
      'A VBA-driven Excel tool that automates the repetitive steps of monthly workforce reporting and variance analysis, so effort goes into explaining the numbers rather than preparing them.',

    problem: {
      headline: 'Month-end analysis is recurring, time-boxed and full of repetitive steps.',
      points: [
        'The same preparation steps — importing, cleaning, reformatting, reconciling — repeat every month.',
        'Manual copy-paste and formula maintenance add error risk under month-end time pressure.',
        'Variances (e.g. actual vs. plan or prior period) need to be calculated and presented the same way each cycle.',
      ],
    },

    solution: {
      headline: 'A repeatable, macro-driven workflow inside the tool finance already uses.',
      points: [
        'VBA routines that import and standardise the monthly data inputs.',
        'A structured calculation model that computes workforce figures and variances consistently.',
        'Automated generation of formatted output, ready for review and commentary.',
      ],
    },

    stack: [
      { skill: 'excel', role: 'Calculation model, structured tables and report layout' },
      { skill: 'vba', role: 'Automates import, cleanup, recalculation and output generation' },
      { skill: 'financial-analysis', role: 'Variance logic and the analytical framing of results' },
      { skill: 'process-automation', role: 'Turns a manual monthly routine into a repeatable process' },
    ],

    howItWorks: [
      { title: 'Load', detail: "The month's data extracts are placed in the tool and the process is started with a single macro." },
      { title: 'Standardise', detail: 'VBA cleans and reshapes the inputs into a consistent structure and flags anything unexpected.' },
      { title: 'Calculate', detail: 'The model computes workforce figures and variances against the comparison base.' },
      { title: 'Output', detail: 'Formatted summary and detail views are generated automatically.' },
      { title: 'Review', detail: 'The analyst focuses on investigating and explaining the variances.' },
    ],

    value: [
      { title: 'Repeatable month-end', detail: 'The same steps run the same way every cycle.' },
      { title: 'Lower error risk', detail: 'Fewer manual copy-paste and formula edits during time-critical periods.' },
      { title: 'More time for analysis', detail: 'Effort shifts from preparing data to explaining what changed and why.' },
      { title: 'Low adoption barrier', detail: 'Built in Excel, so users work in a familiar tool with no new software.' },
    ],

    architecture: {
      nodes: [
        { id: 'extracts', label: 'Monthly data', sub: 'Actuals', type: 'source', col: 0, row: 0, note: 'Workforce data exported for the month.' },
        { id: 'base', label: 'Plan / prior', sub: 'Comparison', type: 'source', col: 0, row: 1.2, note: 'The reference the month is compared against.' },
        { id: 'import', label: 'VBA import', sub: 'Load & clean', skill: 'vba', col: 1, row: 0.6, note: 'One macro loads, cleans and standardises all inputs.' },
        { id: 'model', label: 'Excel model', sub: 'Calculate', skill: 'excel', col: 2, row: 0.6, note: 'Structured tables compute figures and variances.' },
        { id: 'output', label: 'VBA output', sub: 'Generate', skill: 'vba', col: 3, row: 0.6, note: 'Builds formatted summary and detail views.' },
        { id: 'analyst', label: 'Finance review', sub: 'Commentary', type: 'actor', col: 4, row: 0.6, note: 'Time goes into explaining the variances.' },
      ],
      edges: [
        { from: 'extracts', to: 'import' },
        { from: 'base', to: 'import' },
        { from: 'import', to: 'model', label: 'cleaned' },
        { from: 'model', to: 'output', label: 'results' },
        { from: 'output', to: 'analyst', label: 'report' },
      ],
    },
  },
]
