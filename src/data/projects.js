export const projects = [
  {
    slug: "coe-portal",
    name: "COE Question Paper Management System",
    kind: "ERP Module — Production",
    oneLiner: "Re-engineered a legacy, hardcoded exam system into a configurable platform serving a whole institution.",
    status: "Production",
    metrics: [
      { label: "Users", value: "7,000+" },
      { label: "Faculty", value: "500+" },
      { label: "Throughput gain", value: "+45%" },
      { label: "Query optimization", value: "35%" },
      { label: "Uptime", value: "99.9%" },
    ],
    stack: ["React", "Go (Gin)", "MySQL", "Docker", "Nginx"],
    problem:
      "The institution's examination question-paper process ran on a legacy, hardcoded system: fixed formats, no configurability, manual coordination between faculty, HODs, and admins across every exam cycle. It didn't scale, and it broke under real usage patterns.",
    approach: [
      "Designed a dynamic exam template engine so question papers can be generated across multiple exam types without touching code.",
      "Built an asynchronous QP generation pipeline using worker pools and bounded queues to absorb concurrent generation requests without timing out.",
      "Implemented role-based access control (RBAC) for four distinct roles: Admin, Faculty, HOD, and Student.",
      "Redesigned the database schema and backend APIs from the ground up for flexibility and long-term maintainability.",
      "Built a multi-stage question vetting workflow so papers pass quality review before they're usable.",
      "Deployed the full stack on a self-hosted Ubuntu server: containerized frontend, backend, and database behind an Nginx reverse proxy.",
    ],
    architecture: {
      caption: "Request path from browser to database, through the async generation pipeline.",
      nodes: [
        { id: "browser", label: "Browser", sub: "React SPA" },
        { id: "nginx", label: "Nginx", sub: "Reverse Proxy" },
        { id: "api", label: "Gin API", sub: "Go Backend" },
        { id: "auth", label: "RBAC Layer", sub: "Admin · Faculty · HOD · Student" },
        { id: "pool", label: "Worker Pool", sub: "Bounded Queue" },
        { id: "db", label: "MySQL", sub: "Question Bank + Templates" },
        { id: "docker", label: "Docker", sub: "3 Containers" },
      ],
      edges: [
        ["browser", "nginx"],
        ["nginx", "api"],
        ["api", "auth"],
        ["auth", "pool"],
        ["pool", "db"],
        ["api", "docker"],
      ],
    },
    challenges: [
      "Concurrent QP generation requests during peak exam-prep windows risked overwhelming the DB — solved with bounded worker queues that apply backpressure instead of failing requests.",
      "Migrating live faculty workflows off the old hardcoded system without downtime required a phased schema migration and parallel-run period.",
      "Enforcing RBAC consistently across every endpoint, not just the UI, to prevent privilege escalation between Faculty and HOD roles.",
    ],
    learned:
      "How to design for a real institution's messy, exception-filled workflows instead of a clean spec — and how far a well-bounded worker pool goes toward stability under real concurrent load.",
    links: {
      github: "https://github.com/MithileshSP/COE",
      demo: "https://pcdp.bitsathy.ac.in/stf/coe/auth/login",
    },
  },
  {
    slug: "genai-chatbot-suite",
    name: "GEN-AI — Custom Chatbot Suite",
    kind: "GenAI Product Suite — Deployed",
    oneLiner: "Four purpose-built agents on the Gemini API, each tuned for one real task instead of one generic chatbot for everything.",
    status: "Deployed",
    metrics: [
      { label: "Agents shipped", value: "4" },
      { label: "Frontend", value: "Vercel" },
      { label: "Model", value: "Gemini API" },
    ],
    stack: ["React", "Vite", "Node.js", "Express", "Gemini API", "Vercel"],
    problem:
      "General-purpose chatbots are shallow at any one task. The goal was the opposite: four narrow, well-prompted agents, each scoped tightly to a real use case, with a formatting layer that keeps every response consistent.",
    approach: [
      "Quote Generator — themed, styled quote generation with response formatting.",
      "Python Code Generator — scoped code-generation agent with language-specific prompt constraints.",
      "Project Instructor — step-by-step technical guidance agent for project planning.",
      "Content Creator — structured long-form content drafting agent.",
      "Shared Express backend brokers every request to the Gemini API and normalizes responses before they reach the client.",
    ],
    architecture: {
      caption: "Every agent shares one request path: client → API → Gemini → formatter → client.",
      nodes: [
        { id: "user", label: "User", sub: "React + Vite UI" },
        { id: "prompt", label: "Prompt Router", sub: "Per-agent config" },
        { id: "express", label: "Express", sub: "Node.js API" },
        { id: "gemini", label: "Gemini API", sub: "Google GenAI" },
        { id: "fmt", label: "Formatter", sub: "Response normalization" },
        { id: "resp", label: "Response", sub: "Rendered to client" },
      ],
      edges: [
        ["user", "prompt"],
        ["prompt", "express"],
        ["express", "gemini"],
        ["gemini", "fmt"],
        ["fmt", "resp"],
      ],
    },
    challenges: [
      "Keeping four agents' prompts isolated so tuning one (e.g. the code generator) never regressed another.",
      "Normalizing inconsistent model output into a predictable response shape the UI could render safely.",
      "Working within the Gemini free-tier API's rate limits while keeping the UI responsive.",
    ],
    learned:
      "Narrow, well-scoped prompts consistently beat one generic system prompt — and a thin formatting layer between the model and the UI saves a lot of defensive frontend code.",
    links: {
      github: "https://github.com/MithileshSP/GEN-AI",
      demo: "https://gen-ai-7xtq-git-main-mithilesh-s-ps-projects.vercel.app",
    },
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)
