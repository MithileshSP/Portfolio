# Mithilesh S P — Portfolio

An "engineering dashboard" portfolio, not a template. Built with React 19 + Vite + Tailwind CSS v4 + React Router.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

## Folder structure

```
src/
  data/
    profile.js       # name, summary, stats, skills, experience, lab entries
    projects.js       # COE Portal + GenAI Suite — content, metrics, architecture graphs
  components/
    WindowFrame.jsx        # signature "window chrome" card used everywhere
    ArchitectureDiagram.jsx # SVG box-and-arrow system diagram renderer
    Nav.jsx, CommandPalette.jsx, Hero.jsx, About.jsx, Skills.jsx,
    Projects.jsx, Experience.jsx, Lab.jsx, Contact.jsx, Footer.jsx, Section.jsx
  pages/
    Home.jsx           # composes all the sections above
    ProjectDetail.jsx  # /project/:slug — full write-up per project
  App.jsx               # routes + ⌘K command palette wiring
  main.jsx
  index.css             # design tokens (@theme) + base styles
```

## What's real vs. stubbed

- All copy is pulled from your resume + project details — not placeholder lorem ipsum.
- `profile.links` (LinkedIn/GitHub/LeetCode) and `project.links` (GitHub/demo) are wired to your real
  URLs already: LinkedIn, GitHub, LeetCode, plus GitHub + live demo links for both COE and GEN-AI.
- Put your actual PDF at `public/resume.pdf` — the "Download Resume" button and command palette action already point to it.
- Everything is static content. **No backend is needed to ship this.**

## Interaction & motion

- **Scroll reveal** (`src/hooks/useReveal.js`) — every section, and each architecture diagram, fades/slides
  in the first time it enters the viewport (IntersectionObserver, fires once).
- **TiltGlow** (`src/components/TiltGlow.jsx`) — project cards and the two hero panels tilt slightly toward
  the cursor and get a soft teal spotlight on hover, like tilting a physical panel toward the light.
- **Magnetic buttons** (`src/components/Magnetic.jsx`) — the hero's primary/secondary CTAs nudge toward the
  cursor on hover.
- **Architecture diagrams** draw themselves in node-by-node and connector-by-connector, staggered left to
  right, the first time you scroll to them on a project page.
- **Typewriter terminal line** in the hero cycles through a few one-line summaries.
- All of it respects `prefers-reduced-motion` (see `index.css`) — animations collapse to instant for anyone
  who has that OS setting on.

Want more (e.g. a page-transition when opening a project, animated GitHub contribution graph, confetti on
the resume-download button)? Easy to layer on top of the same `useReveal` / `TiltGlow` primitives — just say
which one and I'll wire it in.

## Do you need the Java backend?

Not for the portfolio itself — it's fully static and can deploy to Vercel/Netlify/GitHub Pages as-is.
You'd only add a backend if you want a real **contact form that emails you** (instead of `mailto:`) or a
**live GitHub-activity widget** that needs a server-side token. If you want that:
- A tiny Spring Boot service with one `POST /api/contact` endpoint (using JavaMailSender) is enough — no
  database needed. Happy to scaffold that separately if/when you want it.
- For GitHub stats, the public GitHub REST API can actually be called straight from the browser (no key
  needed for public data), so even that doesn't strictly require a backend.

## Extending

- **Blog**: add an MDX pipeline (`@mdx-js/rollup`) and a `src/content/` folder when you're ready to write posts.
- **New project**: add an entry to `src/data/projects.js` (including an `architecture` graph) — the detail
  page and command palette pick it up automatically.
- **⌘K palette**: sections and projects are wired automatically; add more actions in `src/components/CommandPalette.jsx`.
