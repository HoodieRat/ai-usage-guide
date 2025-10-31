//START
// filepath: guides/TODO.md
# Everyday AI Guide — Implementation Sprints
Updated: 2025-10-31

Purpose
- Replace all remaining placeholders with production-ready guides.
- Fix navigation (ensure every guide is mapped once, grouped into collapsible units).
- Add unit quizzes with grading and a final cumulative scorecard (hidden until all unit quizzes are complete).
- Stand up a searchable prompt library with categories and guardrails.

How to work this plan
- Process sprints in order. Within a sprint, complete tasks top→bottom.
- After each task: update this file’s checkbox, then append a log line to logs/run.log:
  ISO_TIME | TASK_ID | updated/created | PASS (or FAIL: reason)
- Quality gates (each affected page/file must pass):
  - Guides: H1 + intro (2–4 lines), “What you’ll learn” (3–6 bullets), “Step-by-step” (5–8 steps), “Tips & pitfalls” (3–6 bullets).
  - Navigation: groups accordion; active link highlights; all guides present exactly once.
  - Search: data/search.json includes index + every guide (title, url, 2–4 headings, abstract).
  - Offline: no external CDNs; only local /data fetches.
  - Accessibility: header/nav/main/footer landmarks; aria-labels on toggles; sufficient contrast.

Legend
- [ ] Not started
- [~] In progress
- [x] Done

---

## AI coding TODO list (share with ChatGPT before code generation)
- [ ] Extend slugify to handle diacritics
- [ ] Add HTTP retry and circuit breaker
- [ ] Replace axios with fetch if bundle size grows

---

## Sprint 0 — Triage + Navigation Repair
| ID | Status | Task | Acceptance |
|----|--------|------|------------|
| S0-1 | [x] | Fix doubled path bugs in nav highlighting and links (remove extra "guides/" segment; honor body[data-base]) in js/nav.js. | Sidebar links work on every page; active item highlights correctly. |
| S0-2 | [x] | Rebuild data/toc.json to include all guides grouped into units with accordion support. Units: Foundations, Sessions & Context, Projects & Files, Research & Reasoning, Agentic Workflows, Collaboration, Applied Skills, Safety & Quality, Templates & Integrations, Assessments. | All guides appear once, in correct unit; accordions keyboard/ARIA compliant. |
| S0-3 | [x] | Update index.html Quick Start/Featured links (01, 03, 31) and verify search input focus/handlers. | Links resolve; search opens results panel with matches. |
| S0-4 | [x] | Rebuild data/search.json for all guides (title/url/sections/abstract). | Valid JSON; search results show relevant snippets. |
| S0-5 | [x] | Add logs/ folder and initialize logs/run.log. | File exists; subsequent tasks append entries. |

---

## Sprint 1 — Foundations (content completion)
| ID | Status | File | Task |
|----|--------|------|------|
| S1-1 | [x] | guides/00_readme.html | Replace placeholder with full orientation guide (intro, learnings, steps, tips). |
| S1-2 | [x] | guides/01_getting-started.html | Practical onboarding: account, UI, first prompt, guardrails. |
| S1-3 | [x] | guides/02_how-chatgpt-works.html | Full explainer: tokens, context, temperature, hallucinations, verification. |
| S1-4 | [x] | guides/03_prompt-basics.html | Prompt scaffolds, context injection, follow-ups, sanity checks. |
| [x] | guides/60_code-help_for-non-devs.html | Errors explained in plain language; safe loops. |
| S1-6 | [x] | guides/05_structured-output.html | Tables/JSON schemas + validation and downstream use. |
| S1-7 | [x] | guides/foundations-assessment.html | Build Foundations unit quiz and place it after 05 in nav. |

Deliverable: foundations-assessment.html (unit quiz) appears after 05 in nav.

---

## Sprint 2 — Sessions & Context
| ID | Status | File | Task |
|----|--------|------|------|
| S2-1 | [x] | guides/10_sessions-and-context.html | Sessions strategy, recap prompts, reset triggers. |
| S2-2 | [x] | guides/11_custom-instructions.html | Durable defaults; escalation; cadence. |
| S2-3 | [x] | guides/12_memory-and-privacy.html | Retention table; do/don’t; policy notes. |
| S2-4 | [x] | guides/13_handoff-between-chats.html | Handoff packets, logs, reviewer roles. |
| S2-5 | [x] | guides/context-assessment.html | Build Sessions & Context unit quiz; link after 13. |

Deliverable: context-assessment.html appears after 13.

---

## Sprint 3 — Projects & Files
| ID | Status | File | Task |
|----|--------|------|------|
| S3-1 | [x] | guides/20_project-folders-setup.html | Folder archetypes, naming, README-first. |
| S3-2 | [x] | guides/21_file-upload-best-practices.html | Hygiene, preprocessing, verification. |
| S3-3 | [x] | guides/22_context-from-files_rag-basics.html | Sourcing, abstracts, refresh cadence, security. |
| S3-4 | [x] | guides/23_chunking-and-abstracts.html | Chunk sizing, abstract templates, automation. |
| S3-5 | [x] | guides/24_citations-and-attribution.html | Formats, verification, “as of today” notes. |
| S3-6 | [x] | guides/25_redaction-and-sanitization.html | Redaction patterns, tools, incidents. |
| S3-7 | [x] | guides/projects-assessment.html | Build Projects & Files unit quiz; surface after 25. |

Deliverable: projects-assessment.html appears after 25.
---

## Sprint 4 — Research & Reasoning
|----|--------|------|------|
| S4-1 | [x] | guides/30_browsing-and-search.html | Search operators, synthesis, recency safeguards. |
| S4-2 | [x] | guides/31_deep-research-playbook.html | Planner/actor/reviewer loops with claim logs. |
| S4-3 | [x] | guides/32_source-quality-and-fact-checking.html | Credibility scoring and escalation. |
| S4-4 | [x] | guides/33_news-and-recency.html | Time-sensitive workflows, date-stamped citations. |
| S4-5 | [x] | guides/34_math-and-calcs.html | Step math, units, sanity checks. |
| S4-6 | [x] | guides/research-assessment.html | Build Research & Reasoning unit quiz; surface after 34. |

Deliverable: research-assessment.html appears after 34.

---

## Sprint 5 — Agentic Workflows
| ID | Status | File | Task |
|----|--------|------|------|
| S5-1 | [x] | guides/40_agentic-mode_overview.html | Guardrails, permissions, shutdown conditions. |
| S5-2 | [x] | guides/41_task-chains-and-delegation.html | Multi-step orchestration, ownership, review. |
| S5-3 | [x] | guides/42_planners-critics-validators.html | Roles, prompts, acceptance, logging. |
| S5-4 | [x] | guides/43_automations-and-reminders.html | Scheduling, escalation, maintenance. |
| S5-5 | [x] | guides/agentic-assessment.html | Build Agentic Workflows unit quiz; surface after 43. |

Deliverable: agentic-assessment.html appears after 43.

---

## Sprint 6 — Collaboration
| ID | Status | File | Task |
|----|--------|------|------|
| S6-1 | [x] | guides/50_collaboration-workflows.html | Shared briefs, decision logs, async handoffs. |
| S6-2 | [x] | guides/51_meeting-notes-and-actions.html | Notes capture, action extraction, owners/dates. |
| S6-3 | [x] | guides/52_email-drafts-and-templates.html | Email patterns, tones, QA. |
| S6-4 | [x] | guides/53_brainstorm-to-execution.html | Ideation→prioritization→delivery, checkpoints. |
| S6-5 | [x] | guides/collaboration-assessment.html | Build Collaboration unit quiz; surface after 53. |

## Sprint 7 — Applied Skills
| ID | Status | File | Task |
|----|--------|------|------|
| S7-1 | [x] | guides/60_code-help_for-non-devs.html | Errors explained in plain language; safe loops. |
| S7-2 | [x] | guides/61_codegen-best-practices_for-devs.html | AI coding lifecycle, diffs, tests, rollback. |
| S7-3 | [x] | guides/62_data-analysis_basics.html | Exploratory analysis, tables, charts, checks. |
| S7-4 | [x] | guides/63_tables-visuals-and-diagrams.html | Tables, charts, mermaid with validation. |
| S7-5 | [x] | guides/applied-skills-assessment.html | Build Applied Skills unit quiz; surface after 63. |
| [x] | guides/70_safety-and-ethics.html | Risk classes, approvals, incidents. |
| [x] | guides/71_troubleshooting-bad-answers.html | Diagnostics, recovery prompts, escalation. |
| [x] | guides/72_power-user-checklists.html | Preflight, research, QA checklists. |
| [x] | guides/82_quality-assurance_loops.html | Deterministic QA loops, examples, logging. |
| [x] | guides/safety-quality-assessment.html | Build Safety & Quality unit quiz; surface after 72 (cross-link 82). |
| [x] | guides/80_templates-library.html | Production library structure, intake/review lifecycle. |
| [x] | guides/81_project-blueprints.html | Reusable blueprint structure with milestones. |
| [x] | guides/83_integrations-and-tools.html | Secure rollout, observability, rollback. |
| [x] | data/prompt-library/catalog.json | Build searchable catalog; seed ≥ 30 prompts total. |
| [x] | Prompt categories | Create categories and seed: Planning (≥10), Research (≥10), Communication (≥10), Coding (≥10), QA (≥10). Tag each prompt. |
| [x] | guides/84_prompt-library.html | Add in-page filters (category/tags), search input, copy-to-clipboard; link to guardrail pages. |
| [x] | js/search.js | Ensure prompts are not in main site search; keep catalog search local to page 84 only. |
| [x] | guides/templates-integrations-assessment.html | Build Templates & Integrations unit quiz; surface after 83. |
| [x] | data/unit-assessments.json | Author quizzes for all units; each 6–10 questions; map each question to a guide and section. |
| [x] | js/unit-assessments.js | Implement quiz rendering, per-question feedback, unit scoring, localStorage progress. |
| [x] | guides/*-assessment.html | Create one assessment page per unit; place it last in the unit’s nav group. |
| [x] | guides/scorecard.html | Final cumulative scorecard: compute average; reveal only after all unit quizzes complete; show colored bar chart (CSS-only). |
| [x] | css/main.css | Styles for quizzes and scorecard (focus states, error states, bars, print). |
| [x] | nav.js + toc.json | Ensure assessment pages appear at end of their units and highlight correctly. |
| [x] | data/search.json | Sync abstracts/headings to final guide content (all pages including assessments excluded from search). |
| [x] | js/search.js | Improve ranking by title and unit; keyboard navigation for results; escape handling. |
| [x] | main.js | Ensure copy-link anchors on H2/H3 exist across all guides and assessments. |
| [x] | All pages | Verify landmarks, aria attributes, and heading order; fix any violations. |
| [x] | css/main.css | Print styles (black on white, hide nav, include URL hints). |
| [x] | Offline checks | Open index.html over file:// and validate no external requests; all fetches from /data succeed. |

Deliverable: applied-skills-assessment.html appears after 63.

---

Deliverable: safety-quality-assessment.html appears after 72 (with 82 cross-linked).

---

Deliverable: templates-integrations-assessment.html appears after 83.

---

## Unit quiz anchor points (navigation placement)
- Foundations: add foundations-assessment.html after 05_structured-output.html
- Sessions & Context: context-assessment.html after 13_handoff-between-chats.html
- Projects & Files: projects-assessment.html after 25_redaction-and-sanitization.html
- Research & Reasoning: research-assessment.html after 34_math-and-calcs.html
- Agentic Workflows: agentic-assessment.html after 43_automations-and-reminders.html
- Collaboration: collaboration-assessment.html after 53_brainstorm-to-execution.html
- Applied Skills: applied-skills-assessment.html after 63_tables-visuals-and-diagrams.html
- Safety & Quality: safety-quality-assessment.html after 72_power-user-checklists.html (cross-link 82)
- Templates & Integrations: templates-integrations-assessment.html after 83_integrations-and-tools.html
- Final: scorecard.html appears in a new “Assessments” unit.

---

## Prompt Library deliverables (detail)
- Taxonomy: Planning, Research, Communication, Coding, QA (tags allowed: “structured”, “verification”, “email”, “report”, “meeting”, “table”, “json”, “synthesis”, “diff”, “test”).
- Each catalog entry: id, title, use_case, owner email, risk_level, guardrails[], inputs[], outputs[], prompt (full text), examples[], last_review (YYYY-MM-DD), review_cadence_days, tags[].
- Filters in 84_prompt-library.html: category select, tag chips, free-text search (title/use_case/tags).
- Governance: review cadence and owner are mandatory; high-risk prompts require reviewer sign-off.

---

## Sprint 8 — Workflow Automation & Guardrails
| ID | Status | Task | Acceptance |
|----|--------|------|------------|
| SW-1 | [x] | Publish deterministic implementation table templates for files and methods within the guide workflow. | Templates live under /guardrails and are referenced in prompts. |
| SW-2 | [x] | Establish JSON-first project manifest contract (with CSV fallback) and wire in schema validation. | Schema stored under /guardrails with sample validation run recorded. |
| SW-3 | [x] | Document the “Idea → Project structure” prompting workflow using provided templates and schema. | Guide section walks through the prompt, templates, schema, and expected outputs. |
| SW-4 | [x] | Automate ChatGPT (web) interactions via UndetectedChromeDriver v1.1.3 with matching ChromeDriver profile. | Automation opens dedicated profile, runs prompts, saves outputs, and retries on validation errors. |
| SW-5 | [x] | Create guardrail files and TODO checklist that the AI reads before code generation. | /guardrails/output-contracts.md, /guardrails/validation.md, and TODO.md updates are present and linked in prompts. |
| SW-6 | [x] | Generate context packs (file tree, call graph, dead code, signatures) and integrate them into the prompting workflow. | Context packs produced and documented with usage instructions. |

---

## Sprint 9 — Orientation & Navigation QA
| ID | Status | Task | Acceptance |
|----|--------|------|------------|
| S9-1 | [x] | Align navigation data and fallback with the current guide inventory (Foundations through Assessments). | Online and offline navigation show identical sections, ordering, and links. |
| S9-2 | [x] | Guarantee unit assessments load online/offline by bundling the quiz dataset fallback. | Each assessment page renders its quiz when disconnected from the network. |
| S9-3 | [x] | Regenerate the Read Me First page with updated learning outcomes and key starter links. | Page highlights what users will learn and links to Getting Started and How ChatGPT Works. |

---

## Acceptance to close the project
- No guide contains placeholder text.
- Sidebar groups collapse/expand; keyboard/ARIA verified.
- Search returns useful snippets for every guide.
- Unit quizzes grade locally; final scorecard unlocks on completion, with colored bar chart per unit + overall score.
- Prompt library searchable and governed (≥ 50 prompts across categories).
//DONE