# Adrian Lee — Portfolio

Personal portfolio built with **React + Vite + Tailwind CSS v4**, Framer Motion and Lucide icons.

## Run locally

Requires Node.js 18+ (20 or 22 LTS recommended).

```bash
npm install      # first time only
npm run dev      # dev server at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the production build locally
```

## Edit content

All content lives in `src/data/` — no component changes needed.

| File | What it controls |
| --- | --- |
| `src/data/profile.js` | Name, role, location, hero text, About summary, focus areas, contact links, "How I work" steps |
| `src/data/domains.js` | The five disciplines (Finance, Business, Data, Automation, Digital Transformation) and their colours |
| `src/data/skills.js` | Skill categories and every skill/technology |
| `src/data/projects.js` | Case studies, including the architecture diagram nodes and edges |

- **Add a project:** copy an object in `projects.js`. Reference skills by their `id` from `skills.js` and domains by `id` from `domains.js`. Related projects, skill connections and filters update automatically.
- **Architecture diagram:** each node has a `col` (left → right stage) and `row` (vertical position, decimals allowed). Keep edge labels to about 8 characters.
- **New icon:** import it in `src/components/Icon.jsx` and add it to the `registry` object. Browse icons at https://lucide.dev/icons.
- In dev mode the browser console warns about typos (an unknown skill id, a missing node, and so on).

## Before publishing

- Fill in `profile.contact` (email, LinkedIn, GitHub, CV). Empty values are hidden.
- Review the case-study wording so it matches what you actually built, and keep it free of confidential employer information.

## Deploy

`npm run build` writes a static site to `dist/` with relative asset paths, so it works on GitHub Pages, Netlify, Vercel, Azure Static Web Apps or any static host.
