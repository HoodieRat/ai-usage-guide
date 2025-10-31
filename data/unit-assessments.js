window.__UNIT_ASSESSMENT_DATA =
{
  "finalUnitId": "resource-library",
  "units": [
    {
      "id": "orientation",
      "title": "Orientation",
      "navTitle": "Orientation Assessment",
      "intro": "Confirm you can navigate the guide, run the Quickstart, and avoid the classic first-use pitfalls.",
      "guides": [
        "Read Me First"
      ],
      "isFinal": false,
      "instructions": [
        "Answer each question based on the Orientation materials.",
        "You need a perfect score to mark this unit complete.",
        "Progress is saved automatically so you can return later."
      ],
      "questions": [
        {
          "id": "orientation-quickstart-step",
          "prompt": "According to the 15-minute Quickstart, what should you do before pasting the Starter Prompt?",
          "options": [
            {
              "text": "Pick a tiny, well-defined task to tackle right now.",
              "correct": true,
              "feedback": "Starting with a small, specific task keeps the Quickstart focused and winnable."
            },
            {
              "text": "Save the final answer template where you keep notes.",
              "correct": false,
              "feedback": "Saving results comes last; first choose the task you want help with."
            },
            {
              "text": "Ask ChatGPT to suggest tasks you could try.",
              "correct": false,
              "feedback": "The guide tells you to decide on a task yourself before prompting."
            }
          ]
        },
        {
          "id": "orientation-core-path",
          "prompt": "When you move past the Quickstart, which guide kicks off the suggested Core Skills path?",
          "options": [
            {
              "text": "Prompt Basics",
              "correct": true,
              "feedback": "Prompt Basics is the first Core Skill, followed by Structured Output and other essentials."
            },
            {
              "text": "File Upload Best Practices",
              "correct": false,
              "feedback": "File Upload Best Practices appears later in the Core Skills sequence."
            },
            {
              "text": "Browsing & Search",
              "correct": false,
              "feedback": "Browsing & Search is further down the Core Skills list after files and structured output."
            }
          ]
        },
        {
          "id": "orientation-mistake-feedback",
          "prompt": "The guide says your answer is close but not quite right. What is the recommended next move?",
          "options": [
            {
              "text": "Tell the assistant in one sentence what to change and why.",
              "correct": true,
              "feedback": "Concise feedback keeps the loop tight and helps the assistant course-correct."
            },
            {
              "text": "Restart the chat with a fresh conversation immediately.",
              "correct": false,
              "feedback": "You should iterate in the same chat before restarting from scratch."
            },
            {
              "text": "Paste a large bundle of reference material to overwhelm it with detail.",
              "correct": false,
              "feedback": "Adding too much at once is listed as a mistake; stick to targeted, actionable feedback."
            }
          ]
        }
      ],
      "scoring": {
        "passingScore": 3,
        "guidance": "Log your Orientation completion in the enablement tracker and bookmark the Quickstart prompt.",
        "actions": [
          "If you miss anything, redo the Quickstart flow live before moving on.",
          "Capture your final Starter Prompt variant so you can reuse it in later exercises."
        ]
      }
    },
    {
      "id": "foundations",
      "title": "Foundations",
      "navTitle": "Foundations Assessment",
      "intro": "Verify that you can launch disciplined sessions, use structured prompts, and capture reusable learnings before progressing to Sessions & Context.",
      "guides": [
        "Getting Started",
        "How ChatGPT Works",
        "Prompt Basics",
        "Response Contracts",
        "Structured Output"
      ],
      "isFinal": false,
      "instructions": [
        "Reference the Foundations guides as needed and log corrective actions for any misses.",
        "Score at least 5 out of 6 before you mark this unit complete.",
        "Save your run log entry after you submit."
      ],
      "questions": [
        {
          "id": "foundations-quickstart-task",
          "prompt": "When running the Quickstart from Getting Started, what is the very first move?",
          "options": [
            {
              "text": "Pick a tiny, real task and define the success criteria in one sentence.",
              "correct": true,
              "feedback": "A focused task anchors the prompt and keeps the run achievable."
            },
            {
              "text": "Collect every document the team has produced so far.",
              "correct": false,
              "feedback": "Gather only what the task needs right now."
            },
            {
              "text": "Install every available ChatGPT plugin before you begin.",
              "correct": false,
              "feedback": "Plugins come later once the base workflow is stable."
            }
          ]
        },
        {
          "id": "foundations-custom-instructions",
          "prompt": "Which detail belongs in the 'How ChatGPT should respond' field when configuring custom instructions?",
          "options": [
            {
              "text": "Tone, formatting rules, and escalation preferences.",
              "correct": true,
              "feedback": "Those defaults keep responses consistent across chats."
            },
            {
              "text": "Every prompt you plan to use this quarter.",
              "correct": false,
              "feedback": "Prompt text lives in your run log, not the defaults."
            },
            {
              "text": "The entire changelog for your project.",
              "correct": false,
              "feedback": "Changelogs belong in shared documentation, not custom instructions."
            }
          ]
        },
        {
          "id": "foundations-context-reset",
          "prompt": "According to How ChatGPT Works, when should you reset a thread instead of continuing to iterate?",
          "options": [
            {
              "text": "When you hit the context window limit or the assistant keeps repeating the same mistake.",
              "correct": true,
              "feedback": "A fresh brief prevents token overflow and entrenched errors."
            },
            {
              "text": "Whenever you change the audience for your deliverable.",
              "correct": false,
              "feedback": "Updates to audience can be handled with a quick recap inside the same chat."
            },
            {
              "text": "If the response takes longer than 10 seconds to generate.",
              "correct": false,
              "feedback": "Latency alone is not a reason to reset."
            }
          ]
        },
        {
          "id": "foundations-response-contract",
          "prompt": "What turns a response contract into an enforceable safety net?",
          "options": [
            {
              "text": "A structured checklist or schema that the assistant must follow.",
              "correct": true,
              "feedback": "Explicit structure allows you to validate the output quickly."
            },
            {
              "text": "A reminder that the assistant should do its best.",
              "correct": false,
              "feedback": "Intent is not enough; give it concrete requirements."
            },
            {
              "text": "A warning that the work is high priority.",
              "correct": false,
              "feedback": "Priority tags do not enforce format compliance."
            }
          ]
        },
        {
          "id": "foundations-structured-validation",
          "prompt": "After receiving JSON from Structured Output, what is the next recommended step?",
          "options": [
            {
              "text": "Validate the payload against your schema or checklist before trusting it.",
              "correct": true,
              "feedback": "Validation catches missing fields and format issues immediately."
            },
            {
              "text": "Copy it straight into production so you do not lose momentum.",
              "correct": false,
              "feedback": "Ship only after you confirm the response meets the contract."
            },
            {
              "text": "Ask the assistant to self-grade the answer and move on.",
              "correct": false,
              "feedback": "Self-grading is useful context but not a substitute for validation."
            }
          ]
        },
        {
          "id": "foundations-run-log",
          "prompt": "Why does the Foundations unit insist on logging each prompt-and-result pair?",
          "options": [
            {
              "text": "So you can reuse, audit, and share the workflow that produced the outcome.",
              "correct": true,
              "feedback": "A run log is the source of truth for what worked and why."
            },
            {
              "text": "Because the assistant will refuse to work without a log entry.",
              "correct": false,
              "feedback": "The log is for human operations, not a model requirement."
            },
            {
              "text": "To calculate token costs in real time.",
              "correct": false,
              "feedback": "Cost tracking is helpful, but the primary goal is reuse and accountability."
            }
          ]
        }
      ],
      "scoring": {
        "passingScore": 5,
        "guidance": "If you miss questions, rerun the Foundations drills and capture the corrections in your log.",
        "actions": [
          "Schedule a live Quickstart rerun to reinforce the habits.",
          "Share the updated run log with your onboarding partner."
        ]
      }
    },
    {
      "id": "sessions-context",
      "title": "Sessions & Context",
      "navTitle": "Sessions & Context Assessment",
      "intro": "Confirm that you can manage context windows, customize system defaults, and hand work off between chats without losing fidelity.",
      "guides": [
        "Sessions & Context",
        "Custom Instructions",
        "Memory & Privacy",
        "Handoff Between Chats"
      ],
      "isFinal": false,
      "instructions": [
        "Lean on the run log as you answer; treat every miss as a signal to refine your defaults.",
        "Score at least 5 out of 6 to unlock Projects & Files.",
        "Document any workflow updates before moving on."
      ],
      "questions": [
        {
          "id": "sessions-reset",
          "prompt": "You notice the thread is bloated with older tasks and the assistant is drifting. What is the recommended reset move?",
          "options": [
            {
              "text": "Start a new chat with a fresh recap, attachments, and the latest instructions.",
              "correct": true,
              "feedback": "A clean thread keeps the context window focused on the current objective."
            },
            {
              "text": "Paste the entire history into the current chat so nothing is lost.",
              "correct": false,
              "feedback": "Flooding the window with stale context amplifies drift."
            },
            {
              "text": "Ask the assistant to summarize everything it remembers and continue anyway.",
              "correct": false,
              "feedback": "Summaries can help, but without a fresh recap the drift remains."
            }
          ]
        },
        {
          "id": "sessions-instructions",
          "prompt": "Custom instructions need an update for a new compliance regime. How should you roll out the change?",
          "options": [
            {
              "text": "Version the defaults, add the compliance requirements, and log the change in the run book.",
              "correct": true,
              "feedback": "Versioning keeps the team aligned and audit ready."
            },
            {
              "text": "Edit the instructions silently so future chats pick it up.",
              "correct": false,
              "feedback": "Silent edits break traceability; communicate the change."
            },
            {
              "text": "Disable custom instructions entirely until compliance reviews them.",
              "correct": false,
              "feedback": "You can update the defaults immediately and note the pending review."
            }
          ]
        },
        {
          "id": "sessions-memory",
          "prompt": "A teammate wants to store customer health notes in memory for faster follow-ups. What does the Memory & Privacy guide advise?",
          "options": [
            {
              "text": "Do not store personal or regulated data in memory; keep it in your CRM instead.",
              "correct": true,
              "feedback": "Memory is for lightweight preferences, not sensitive records."
            },
            {
              "text": "Store the notes temporarily and export them after each chat.",
              "correct": false,
              "feedback": "Even temporary storage of regulated data violates the guidance."
            },
            {
              "text": "Enable memory only for premium workspaces.",
              "correct": false,
              "feedback": "Access level does not change the privacy requirements."
            }
          ]
        },
        {
          "id": "sessions-handoff",
          "prompt": "You are passing a deliverable to a coworker in a fresh chat. What should the handoff brief include?",
          "options": [
            {
              "text": "The goal, key decisions so far, active constraints, and links to source materials.",
              "correct": true,
              "feedback": "A complete brief lets the next person continue without rework."
            },
            {
              "text": "Only the final prompt so they can ask the assistant again.",
              "correct": false,
              "feedback": "Prompts without context force the coworker to rediscover history."
            },
            {
              "text": "A raw export of every previous exchange.",
              "correct": false,
              "feedback": "Massive transcripts hide the important signals; deliver a curated recap."
            }
          ]
        },
        {
          "id": "sessions-run-log",
          "prompt": "What metadata should the run log capture for every session according to the unit?",
          "options": [
            {
              "text": "Session title, prompt version, attachments used, and decision owner.",
              "correct": true,
              "feedback": "Those fields make replays and audits straightforward."
            },
            {
              "text": "Only the chat transcript because the UI stores everything else.",
              "correct": false,
              "feedback": "You need structured fields to search and reuse the work."
            },
            {
              "text": "A screenshot of the answer so you can delete the chat later.",
              "correct": false,
              "feedback": "Screenshots are optional; the log is the real source of truth."
            }
          ]
        },
        {
          "id": "sessions-staging",
          "prompt": "Your team runs long strategy threads. How do you keep them performant without losing history?",
          "options": [
            {
              "text": "Stage the work in themed chats, link them in the tracker, and keep only current tasks in the active thread.",
              "correct": true,
              "feedback": "Scoped chats protect the context window and keep history organized."
            },
            {
              "text": "Pin every message in one mega-thread so nothing gets lost.",
              "correct": false,
              "feedback": "Mega-threads are hard to navigate and hit token limits fast."
            },
            {
              "text": "Archive completed chats and trust the search bar if you ever need them.",
              "correct": false,
              "feedback": "Without linking them in the tracker you will lose critical decisions."
            }
          ]
        }
      ],
      "scoring": {
        "passingScore": 5,
        "guidance": "Update your default briefs or handoff templates wherever this quiz exposed gaps.",
        "actions": [
          "Share the refreshed custom instructions set with your team.",
          "Document any new handoff checklists in your run log."
        ]
      }
    },
    {
      "id": "projects-files",
      "title": "Projects & Files",
      "navTitle": "Projects & Files Assessment",
      "intro": "Demonstrate that you can structure workspaces, prep source files, and verify outputs when working with uploaded context.",
      "guides": [
        "Project Folders Setup",
        "File Upload Best Practices",
        "Context from Files & RAG Basics",
        "Chunking & Abstracts",
        "Citations & Attribution",
        "Redaction & Sanitization"
      ],
      "isFinal": false,
      "instructions": [
        "Keep the sandbox project open so you can check folder structures as you answer.",
        "Hit 5 out of 6 to move forward.",
        "Log any file hygiene tasks you still owe."
      ],
      "questions": [
        {
          "id": "projects-folders",
          "prompt": "Why does the Project Folders Setup guide insist on a staging and a published folder?",
          "options": [
            {
              "text": "Staging holds drafts for review while published stores the approved outputs.",
              "correct": true,
              "feedback": "Separate folders keep unfinished work from leaking into production."
            },
            {
              "text": "It doubles storage space so you can keep more archives.",
              "correct": false,
              "feedback": "The split is for governance, not storage quotas."
            },
            {
              "text": "Published files load faster inside ChatGPT.",
              "correct": false,
              "feedback": "Performance is the same; the split is about workflow control."
            }
          ]
        },
        {
          "id": "projects-file-prep",
          "prompt": "What is the first check after uploading a spreadsheet according to File Upload Best Practices?",
          "options": [
            {
              "text": "Preview the parsed table to confirm headers and units imported correctly.",
              "correct": true,
              "feedback": "A quick preview catches conversion issues before analysis begins."
            },
            {
              "text": "Rename the file with today's date so it sorts to the top.",
              "correct": false,
              "feedback": "Naming helps later, but validation comes first."
            },
            {
              "text": "Share the file link with the whole workspace immediately.",
              "correct": false,
              "feedback": "Only share once you know the file is clean."
            }
          ]
        },
        {
          "id": "projects-abstracts",
          "prompt": "How do abstracts support large document uploads?",
          "options": [
            {
              "text": "They provide a concise index that the assistant can reference without re-reading every page.",
              "correct": true,
              "feedback": "Summaries plus section tags guide the model to the right portions fast."
            },
            {
              "text": "They replace the original files so you can delete them after upload.",
              "correct": false,
              "feedback": "Keep the originals; abstracts are a navigation aid."
            },
            {
              "text": "They encrypt sensitive passages so you can skip redaction.",
              "correct": false,
              "feedback": "Redaction still happens before sharing files with the model."
            }
          ]
        },
        {
          "id": "projects-citations",
          "prompt": "During a deliverable review you are missing sources for two claims. What do the Citations & Attribution guidelines require?",
          "options": [
            {
              "text": "Locate the original sources, cite them inline, and log the references in your run notes.",
              "correct": true,
              "feedback": "Every claim needs traceable provenance before release."
            },
            {
              "text": "Leave the claims unreferenced because everyone knows the context.",
              "correct": false,
              "feedback": "Shared context is not an excuse for missing citations."
            },
            {
              "text": "Swap in generic statements so you do not need citations.",
              "correct": false,
              "feedback": "Diluting the claim is not a substitute for proper attribution."
            }
          ]
        },
        {
          "id": "projects-redaction",
          "prompt": "Before sharing a call transcript you spot personal data. What is the correct redaction flow?",
          "options": [
            {
              "text": "Copy the transcript to staging, remove or mask the PII, then have a second reviewer confirm before upload.",
              "correct": true,
              "feedback": "Two-person review keeps sensitive data from leaking into shared workspaces."
            },
            {
              "text": "Upload first and ask the assistant to find the personal data for you.",
              "correct": false,
              "feedback": "PII must be removed before the model sees the file."
            },
            {
              "text": "Replace the transcript with a summary so redaction is unnecessary.",
              "correct": false,
              "feedback": "Summaries can help but do not replace proper redaction."
            }
          ]
        },
        {
          "id": "projects-rag",
          "prompt": "The RAG index is returning outdated information. What is your first remediation step?",
          "options": [
            {
              "text": "Refresh the source bundle, regenerate embeddings, and note the update in the change log.",
              "correct": true,
              "feedback": "RAG stays accurate only if you update both files and indexes."
            },
            {
              "text": "Ask the assistant to guess which parts are stale and ignore them.",
              "correct": false,
              "feedback": "The index needs a full refresh; guessing is risky."
            },
            {
              "text": "Disable RAG entirely until the next quarterly review.",
              "correct": false,
              "feedback": "Do not leave users on stale data; fix it now."
            }
          ]
        }
      ],
      "scoring": {
        "passingScore": 5,
        "guidance": "Schedule any missing file hygiene tasks before you advance to Research & Reasoning.",
        "actions": [
          "Share the updated project folder template with your team.",
          "Log the next RAG maintenance date in the tracker."
        ]
      }
    },
    {
      "id": "research-reasoning",
      "title": "Research & Reasoning",
      "navTitle": "Research & Reasoning Assessment",
      "intro": "Verify that you can plan research runs, validate sources, and reason through math or logic-heavy prompts.",
      "guides": [
        "Browsing & Search",
        "Deep Research Playbook",
        "Source Quality & Fact Checking",
        "News & Recency",
        "Math & Calcs"
      ],
      "isFinal": false,
      "instructions": [
        "Keep your research tracker open; you will need it for evidence references.",
        "Score 5 out of 6 to unlock Agentic Workflows.",
        "Update any fact-check templates when you spot gaps."
      ],
      "questions": [
        {
          "id": "research-query-plan",
          "prompt": "Before you open the browser tool, what does the Deep Research Playbook say to outline?",
          "options": [
            {
              "text": "Key questions, initial hypotheses, and the evidence signals you need.",
              "correct": true,
              "feedback": "A lightweight plan keeps the search focused."
            },
            {
              "text": "Every possible website you might visit.",
              "correct": false,
              "feedback": "You iterate as you learn; list the signals, not every URL."
            },
            {
              "text": "A full draft of the final deliverable.",
              "correct": false,
              "feedback": "Drafting comes later after you collect credible evidence."
            }
          ]
        },
        {
          "id": "research-source-check",
          "prompt": "You find a promising claim on an unfamiliar blog. What is the next move per Source Quality guidance?",
          "options": [
            {
              "text": "Trace the claim to a primary source or reputable publication before citing it.",
              "correct": true,
              "feedback": "Secondary blogs need verification before use."
            },
            {
              "text": "Use it immediately but add a disclaimer in your write-up.",
              "correct": false,
              "feedback": "Disclaimers do not replace solid sourcing."
            },
            {
              "text": "Ask the assistant to rewrite the claim in more formal language.",
              "correct": false,
              "feedback": "Style edits do not fix questionable provenance."
            }
          ]
        },
        {
          "id": "research-freshness",
          "prompt": "Your topic depends on policy changes from the past week. How do you keep the research current?",
          "options": [
            {
              "text": "Use browsing with a recency filter, cross-check against official releases, and timestamp the findings.",
              "correct": true,
              "feedback": "Fresh topics require live sources plus documentation of when you pulled them."
            },
            {
              "text": "Rely on cached PDFs because they are faster to load.",
              "correct": false,
              "feedback": "Cached files may be stale; go to the live source."
            },
            {
              "text": "Skip the topic until the next monthly update.",
              "correct": false,
              "feedback": "The guide shows how to handle recency-sensitive work now."
            }
          ]
        },
        {
          "id": "research-math",
          "prompt": "When the assistant returns a detailed calculation, what is your verification step?",
          "options": [
            {
              "text": "Recalculate with the Math & Calcs checklist or a second tool, then compare results.",
              "correct": true,
              "feedback": "Independent verification catches silent math errors."
            },
            {
              "text": "Assume it is right if the numbers look plausible.",
              "correct": false,
              "feedback": "Plausibility is not validation; run the check."
            },
            {
              "text": "Copy the numbers into your presentation immediately.",
              "correct": false,
              "feedback": "Wait until you confirm accuracy."
            }
          ]
        },
        {
          "id": "research-trace",
          "prompt": "Why does the playbook require a research log entry for every sourced claim?",
          "options": [
            {
              "text": "So reviewers can trace evidence, updates, and ownership without reopening every chat.",
              "correct": true,
              "feedback": "Logs make audits efficient."
            },
            {
              "text": "Because the browser tool deletes its history after each run.",
              "correct": false,
              "feedback": "History is available, but the log makes it searchable."
            },
            {
              "text": "To increase the word count of your deliverable.",
              "correct": false,
              "feedback": "Logs are operational records, not deliverable filler."
            }
          ]
        },
        {
          "id": "research-bias",
          "prompt": "A dataset you cite has known sampling bias. What mitigation does the guide recommend?",
          "options": [
            {
              "text": "Flag the bias in findings, seek a counterbalancing source, and explain limits of use.",
              "correct": true,
              "feedback": "Transparent caveats keep the audience from over-trusting the data."
            },
            {
              "text": "Remove the dataset entirely to avoid mentioning bias.",
              "correct": false,
              "feedback": "Usefulness with caveats beats hiding the data outright."
            },
            {
              "text": "Ignore the bias because the rest of the report is solid.",
              "correct": false,
              "feedback": "Biases must be acknowledged so readers interpret results correctly."
            }
          ]
        }
      ],
      "scoring": {
        "passingScore": 5,
        "guidance": "Update your research tracker template with any new checkpoints this quiz surfaced.",
        "actions": [
          "Share validated sources with the knowledge base curator.",
          "Schedule a peer review if you missed any math or logic items."
        ]
      }
    },
    {
      "id": "agentic-workflows",
      "title": "Agentic Workflows",
      "navTitle": "Agentic Workflows Assessment",
      "intro": "Check that you can supervise planner > critic > validator loops, log approvals, and manage ChatGPT-driven automations without losing control.",
      "guides": [
        "Agentic Mode Overview",
        "Task Chains & Delegation",
        "Planners, Critics & Validators",
        "Automations & Reminders"
      ],
      "isFinal": false,
      "instructions": [
        "Answer each scenario using the practices defined in the Agentic Workflows unit.",
        "Require evidence or logs before marking work complete.",
        "Revisit prompts or runbooks immediately if any response exposes a gap."
      ],
      "questions": [
        {
          "id": "agentic-guardrails-shutdown",
          "prompt": "A delegated agent starts requesting access to a restricted data source. According to the guardrail plan, what is the first move?",
          "options": [
            {
              "text": "Trigger the shutdown condition and escalate to the human owner.",
              "correct": true,
              "feedback": "The guardrail plan mandates an immediate stop plus human escalation for restricted boundaries."
            },
            {
              "text": "Let the agent continue while you file an access ticket in parallel.",
              "correct": false,
              "feedback": "Continuing while a restriction is unresolved bypasses the required shutdown step."
            },
            {
              "text": "Swap in a lower-privilege agent without notifying anyone.",
              "correct": false,
              "feedback": "Silent changes undermine the audit trail; escalate and pause instead."
            }
          ]
        },
        {
          "id": "agentic-task-chain-owner",
          "prompt": "During a Task Chain run the critic surfaces a dependency the planner skipped. What do you document before looping back?",
          "options": [
            {
              "text": "Assign an owner, due date, and link the dependency to the work log entry.",
              "correct": true,
              "feedback": "Task Chains require explicit ownership and tracking so nothing slips between roles."
            },
            {
              "text": "Mark the dependency as acknowledged and continue to the validator step.",
              "correct": false,
              "feedback": "You must capture who fixes the gap before the validator rechecks the work."
            },
            {
              "text": "Ask the validator to resolve it because they certify the output.",
              "correct": false,
              "feedback": "Validators review; they do not take on remediation work."
            }
          ]
        },
        {
          "id": "agentic-critic-depth",
          "prompt": "Your critic keeps returning only one risk item even though complex deliverables should surface more. How do you correct the loop?",
          "options": [
            {
              "text": "Raise the minimum risk count in the prompt and provide exemplar critiques for reference.",
              "correct": true,
              "feedback": "Setting expectations and offering exemplars pushes the critic toward deeper analysis."
            },
            {
              "text": "Shrink the planner brief so there is less work to review.",
              "correct": false,
              "feedback": "Reducing scope hides issues instead of improving the critic's performance."
            },
            {
              "text": "Replace the critic with a validator to speed up approvals.",
              "correct": false,
              "feedback": "Validators certify completion; they do not challenge the work like critics do."
            }
          ]
        },
        {
          "id": "agentic-validator-evidence",
          "prompt": "The validator is unsure if a legal policy update mentioned by the critic was addressed. What should the validator request before giving a green status?",
          "options": [
            {
              "text": "Evidence showing the policy change is incorporated plus the updated deliverable link.",
              "correct": true,
              "feedback": "Validators need verifiable evidence or links before they certify the output."
            },
            {
              "text": "An explanation from the planner stating they considered the policy update.",
              "correct": false,
              "feedback": "Narrative alone is insufficient; validators require proof."
            },
            {
              "text": "A promise from the critic to re-review later if it becomes important.",
              "correct": false,
              "feedback": "Deferring action breaks the validation loop."
            }
          ]
        },
        {
          "id": "agentic-automation-fallback",
          "prompt": "An automated reminder job that posts meeting prep tasks begins timing out. What is the immediate safe response?",
          "options": [
            {
              "text": "Toggle the feature flag off and switch to the documented manual fallback.",
              "correct": true,
              "feedback": "Feature flags exist to pause faulty automations and fall back to the manual runbook."
            },
            {
              "text": "Increase the retry count so the job eventually succeeds.",
              "correct": false,
              "feedback": "Blindly retrying adds load without restoring reliability or alerting humans."
            },
            {
              "text": "Ignore the failures unless users complain about missing reminders.",
              "correct": false,
              "feedback": "Silent failures violate monitoring requirements; act immediately."
            }
          ]
        },
        {
          "id": "agentic-logging-requirement",
          "prompt": "Which log fields are mandatory for every agentic run according to the unit guidance?",
          "options": [
            {
              "text": "Run ID, prompt version hash, output link or checksum, reviewer decision, and approvals.",
              "correct": true,
              "feedback": "These fields create the traceable audit trail required for regulated workloads."
            },
            {
              "text": "Only the run ID and final output link so you can find it later.",
              "correct": false,
              "feedback": "You also need version, reviewer, and approval details for compliance."
            },
            {
              "text": "Just the prompt text and timestamp because everything else is optional.",
              "correct": false,
              "feedback": "Minimal logs defeat the purpose of the Agentic Workflows controls."
            }
          ]
        }
      ],
      "scoring": {
        "passingScore": 5,
        "guidance": "Share your run log and prompt pack with the reviewer assigned to the next unit.",
        "actions": [
          "If you miss questions, tighten the relevant runbook and rehearse the loop with a teammate.",
          "Verify your feature flags, alerts, and archives are documented before scaling automation volume."
        ]
      }
    },
    {
      "id": "collaboration",
      "title": "Collaboration",
      "navTitle": "Collaboration Assessment",
      "intro": "Validate that you can run cross-functional ChatGPT workflows, capture accountable notes, and keep shared templates current.",
      "guides": [
        "Collaboration Workflows",
        "Meeting Notes & Actions",
        "Email Drafts & Templates",
        "Brainstorm to Execution"
      ],
      "isFinal": false,
      "instructions": [
        "Answer each scenario using the Collaboration unit runbooks.",
        "Assign owners and due dates before calling a task complete.",
        "Update your shared knowledge base if a question reveals a gap."
      ],
      "questions": [
        {
          "id": "collab-lifecycle-gap",
          "prompt": "During a launch project, the review stage keeps slipping because designers are unclear on who approves copy. What is your first corrective action?",
          "options": [
            {
              "text": "Update the collaboration map with the approver, backups, and escalate the change to the team.",
              "correct": true,
              "feedback": "The lifecycle map should name approvers and backups so reviews stay on track."
            },
            {
              "text": "Ask ChatGPT to guess who the approver should be based on previous notes.",
              "correct": false,
              "feedback": "AI cannot assign owners; humans must set and communicate accountability."
            },
            {
              "text": "Skip the review stage for the current sprint to catch up.",
              "correct": false,
              "feedback": "Skipping reviews risks quality issues; fix the ownership gap instead."
            }
          ]
        },
        {
          "id": "collab-meeting-actions",
          "prompt": "Your meeting notes show five action items but two lack owners. According to the unit guidance, what do you do before publishing the notes?",
          "options": [
            {
              "text": "Confirm owners and due dates live, then update the action table before distributing.",
              "correct": true,
              "feedback": "Every action needs an owner and due date before the notes go out."
            },
            {
              "text": "Publish as-is and wait for volunteers to claim the open actions.",
              "correct": false,
              "feedback": "Unassigned actions stall progress; assign them immediately."
            },
            {
              "text": "Close the actions because the meeting ended and there is no owner.",
              "correct": false,
              "feedback": "Closing unowned actions defeats the purpose of the meeting."
            }
          ]
        },
        {
          "id": "collab-email-template",
          "prompt": "A team wants to reuse an email template last reviewed six months ago. What step is required before they send it again?",
          "options": [
            {
              "text": "Run the review checklist, refresh the template metadata, and log the new review date.",
              "correct": true,
              "feedback": "Templates need periodic review with the checklist before reuse."
            },
            {
              "text": "Send it and monitor metrics to see if a review is needed afterward.",
              "correct": false,
              "feedback": "Reviews happen before the send to catch compliance issues."
            },
            {
              "text": "Ask ChatGPT to replace any stale data and send it without human review.",
              "correct": false,
              "feedback": "Human review is mandatory for tone, accuracy, and compliance."
            }
          ]
        },
        {
          "id": "collab-brainstorm-output",
          "prompt": "After a brainstorm, stakeholders complain they still do not know who is driving execution. What deliverable did you skip?",
          "options": [
            {
              "text": "The execution brief with owners, milestones, and risks.",
              "correct": true,
              "feedback": "Execution briefs translate ideas into accountable plans; without it ownership is unclear."
            },
            {
              "text": "The clustering summary that grouped brainstorm ideas.",
              "correct": false,
              "feedback": "Clustering helps organize ideas but ownership lives in the execution brief."
            },
            {
              "text": "The meeting recording uploaded to the knowledge base.",
              "correct": false,
              "feedback": "Recordings are useful but they do not assign owners or milestones."
            }
          ]
        },
        {
          "id": "collab-log-discipline",
          "prompt": "Reviewing the run log you notice several collaboration workflows missing prompt version links. What action keeps you compliant?",
          "options": [
            {
              "text": "Update the log with the prompt version hash and notify owners to include it in future entries.",
              "correct": true,
              "feedback": "Logs must include prompt versions for traceability; fill the gap and remind owners."
            },
            {
              "text": "Delete the log entries without prompt versions to keep the log clean.",
              "correct": false,
              "feedback": "Deleting records erases history; update them instead."
            },
            {
              "text": "Leave the entries as-is because the outputs were approved.",
              "correct": false,
              "feedback": "Approvals still require traceable prompt versions for audits."
            }
          ]
        },
        {
          "id": "collab-feedback-loop",
          "prompt": "Teams stop reading the weekly summary posts. What adjustment keeps collaboration signals flowing?",
          "options": [
            {
              "text": "Shorten the recap and highlight only decisions, risks, and overdue actions.",
              "correct": true,
              "feedback": "Concise summaries with critical signals keep teams engaged."
            },
            {
              "text": "Stop sending summaries until someone asks for them again.",
              "correct": false,
              "feedback": "Silence hides alignment issues; refine the format instead."
            },
            {
              "text": "Move the summary to a private doc so only managers see it.",
              "correct": false,
              "feedback": "Transparency is key; narrowing access creates more blind spots."
            }
          ]
        }
      ],
      "scoring": {
        "passingScore": 5,
        "guidance": "Share the latest collaboration run log and template library snapshot with leadership.",
        "actions": [
          "If you miss questions, update the relevant runbook or template and rebrief the team.",
          "Schedule a mini retro to confirm owners understand the refined workflow."
        ]
      }
    },
    {
      "id": "applied-skills",
      "title": "Applied Skills",
      "navTitle": "Applied Skills Assessment",
      "intro": "Ensure you can partner with ChatGPT on code, analysis, and visual deliverables without skipping validation.",
      "guides": [
        "Code Help for Non-Developers",
        "Codegen Best Practices for Developers",
        "Data Analysis Basics",
        "Tables, Visuals, and Diagrams"
      ],
      "isFinal": false,
      "instructions": [
        "Answer using the guardrails from the Applied Skills playbooks.",
        "Aim for at least 5 out of 6.",
        "Record any new linting or review steps you adopt."
      ],
      "questions": [
        {
          "id": "applied-non-dev-loop",
          "prompt": "A non-developer needs help editing a script. What is their first safe move?",
          "options": [
            {
              "text": "Explain the goal, share a minimal snippet, and ask for step-by-step guidance before running anything.",
              "correct": true,
              "feedback": "Non-developers should work in small loops with the assistant guiding each step."
            },
            {
              "text": "Paste the entire production codebase so the model can change it all at once.",
              "correct": false,
              "feedback": "Large dumps risk exposing secrets and make review impossible."
            },
            {
              "text": "Grant the assistant direct access to the production environment.",
              "correct": false,
              "feedback": "Direct access bypasses human review and is outside policy."
            }
          ]
        },
        {
          "id": "applied-dev-review",
          "prompt": "Developers receive generated code. What must happen before the change merges?",
          "options": [
            {
              "text": "Run local tests or linters, review diff context, and have a human approve the PR.",
              "correct": true,
              "feedback": "Generated code follows the same review gates as human-written code."
            },
            {
              "text": "Merge immediately if the assistant explains the logic.",
              "correct": false,
              "feedback": "Explanation is helpful, but you still need automated and human review."
            },
            {
              "text": "Skip pull requests for small fixes to save time.",
              "correct": false,
              "feedback": "Bypassing PRs undermines traceability and safety."
            }
          ]
        },
        {
          "id": "applied-analysis",
          "prompt": "While using Data Analysis Basics you receive an insight that contradicts the source dataset. What is your response?",
          "options": [
            {
              "text": "Inspect the intermediate calculations, rerun the query, and document the verification in your notebook.",
              "correct": true,
              "feedback": "Every insight needs validation against the raw data before sharing."
            },
            {
              "text": "Assume the dataset is wrong and publish the insight anyway.",
              "correct": false,
              "feedback": "Never publish without reconciling the discrepancy."
            },
            {
              "text": "Delete the notebook so the contradiction does not surface.",
              "correct": false,
              "feedback": "Transparency matters; investigate and note what you found."
            }
          ]
        },
        {
          "id": "applied-visuals",
          "prompt": "You asked for a comparison table but the assistant produced a decorative graphic. What does the unit recommend?",
          "options": [
            {
              "text": "Clarify the desired format, restate the comparison criteria, and request a text or table output first.",
              "correct": true,
              "feedback": "Text-first outputs are easier to audit before you generate visuals."
            },
            {
              "text": "Accept the graphic because visuals are more impressive.",
              "correct": false,
              "feedback": "Use visuals only after the content itself is validated."
            },
            {
              "text": "Abandon the request; the assistant cannot make tables reliably.",
              "correct": false,
              "feedback": "The guides outline how to steer it back to structured tables."
            }
          ]
        },
        {
          "id": "applied-diagrams",
          "prompt": "When capturing a diagram from the assistant, what must you store alongside the image?",
          "options": [
            {
              "text": "The prompt, revision notes, and a text alternative that describes the diagram.",
              "correct": true,
              "feedback": "Alt text and prompts let teammates regenerate or tweak the asset later."
            },
            {
              "text": "Only the final PNG file.",
              "correct": false,
              "feedback": "Without prompts and notes you lose reproducibility."
            },
            {
              "text": "A screenshot of your chat window so others can guess the context.",
              "correct": false,
              "feedback": "Screenshots are optional; store structured metadata instead."
            }
          ]
        },
        {
          "id": "applied-attachments",
          "prompt": "Someone suggests uploading proprietary code to get faster help. How do you stay compliant?",
          "options": [
            {
              "text": "Strip secrets or use a scrubbed snippet, then log the review path before sharing.",
              "correct": true,
              "feedback": "Only sanitized or approved snippets should leave your secure repo."
            },
            {
              "text": "Upload the full repo because the model keeps conversations private by default.",
              "correct": false,
              "feedback": "Privacy settings do not override data handling policies."
            },
            {
              "text": "Send the code to your personal email first so you can upload it later.",
              "correct": false,
              "feedback": "Personal email is not an approved staging area for proprietary code."
            }
          ]
        },
        {
          "id": "applied-implementation-tables",
          "prompt": "You need ChatGPT to add retries to `src/http/client.ts:get<T>` without touching other code. What table format do you share first?",
          "options": [
            {
              "text": "A single row from the Fix backlog table (File, Function/Area, Issue, Fix plan, Acceptance outcome).",
              "correct": true,
              "feedback": "That row scopes the request and defines success criteria for the assistant."
            },
            {
              "text": "The sprint planning table for the whole team.",
              "correct": false,
              "feedback": "Sprint tables are for planning, not precise implementation instructions."
            },
            {
              "text": "The file generation table row covering every API route.",
              "correct": false,
              "feedback": "File generation rows are too broad for a targeted fix."
            }
          ]
        },
        {
          "id": "applied-table-handoff",
          "prompt": "After ChatGPT drafts a new `ui/widgets/status-banner.tsx`, how do you keep the artifacts aligned?",
          "options": [
            {
              "text": "Drop the generated diff into the same File generation table row and mark the acceptance tests as complete.",
              "correct": true,
              "feedback": "Updating the table preserves the contract and signals the row is satisfied."
            },
            {
              "text": "Delete the table row so it does not clutter the document.",
              "correct": false,
              "feedback": "Keeping the row updated documents status for the team."
            },
            {
              "text": "Move the row into the sprint table because the work is finished.",
              "correct": false,
              "feedback": "Sprint tables track planning metrics, not implementation records."
            }
          ]
        }
      ],
      "scoring": {
        "passingScore": 5,
        "guidance": "Add any missing validation steps to your code and analytics checklists before continuing.",
        "actions": [
          "Share updated prompts or notebooks with the team workspace.",
          "Schedule a pair review session if new guardrails emerged."
        ]
      }
    },
    {
      "id": "safety-quality",
      "title": "Safety & Quality",
      "navTitle": "Safety & Quality Assessment",
      "intro": "Show that you can spot risky outputs, recover from bad answers, and enforce the quality gates defined for your program.",
      "guides": [
        "Safety and Ethics",
        "Troubleshooting Bad Answers",
        "Power User Checklists",
        "Quality Assurance Loops"
      ],
      "isFinal": false,
      "instructions": [
        "Treat each scenario like a safety review; note corrective actions for any miss.",
        "Score 5 out of 6 to unlock Templates & Integrations.",
        "Log any incidents in your tracker even when simulated here."
      ],
      "questions": [
        {
          "id": "safety-escalation",
          "prompt": "The assistant suggests bypassing a security control to meet a deadline. What is the correct response?",
          "options": [
            {
              "text": "Stop the run, flag the request as disallowed, and escalate to the safety owner.",
              "correct": true,
              "feedback": "Disallowed content requires an immediate stop plus escalation."
            },
            {
              "text": "Ask for more details and implement the workaround quietly.",
              "correct": false,
              "feedback": "Implementing the workaround would violate policy."
            },
            {
              "text": "Ignore the message and hope the assistant corrects itself.",
              "correct": false,
              "feedback": "Silence leaves the risk unresolved; raise it immediately."
            }
          ]
        },
        {
          "id": "safety-bad-answer",
          "prompt": "A draft contains confident but incorrect legal guidance. According to Troubleshooting Bad Answers, what is your next move?",
          "options": [
            {
              "text": "Review the source request, collect authoritative references, and re-prompt with explicit verification steps.",
              "correct": true,
              "feedback": "Resetting with solid sources and verification keeps bad advice from shipping."
            },
            {
              "text": "Leave the answer in place as long as you add a warning label.",
              "correct": false,
              "feedback": "Warnings do not neutralize incorrect legal guidance."
            },
            {
              "text": "Ask the assistant if it is sure and publish if it says yes.",
              "correct": false,
              "feedback": "Self-confidence is not a substitute for external validation."
            }
          ]
        },
        {
          "id": "safety-checklist",
          "prompt": "What is the role of the Power User checklist before releasing a sensitive deliverable?",
          "options": [
            {
              "text": "It ensures every risk, approval, and validation step is complete before sign-off.",
              "correct": true,
              "feedback": "The checklist is the last line of defense before a release."
            },
            {
              "text": "It is optional if the deliverable looks correct at a glance.",
              "correct": false,
              "feedback": "Skipping the checklist undermines the safety program."
            },
            {
              "text": "It replaces the need for a human reviewer.",
              "correct": false,
              "feedback": "Checklists supplement, not replace, human review."
            }
          ]
        },
        {
          "id": "safety-qa-loop",
          "prompt": "During a QA loop you discover a recurring hallucination in weekly analytics reports. What should happen next?",
          "options": [
            {
              "text": "File a defect in the log, adjust the prompt or guardrail, and schedule a follow-up audit.",
              "correct": true,
              "feedback": "QA loops require documented fixes plus validation that they stuck."
            },
            {
              "text": "Publish the report and plan to fix it next cycle.",
              "correct": false,
              "feedback": "Known defects must be fixed before release."
            },
            {
              "text": "Delete the QA evidence to keep the log tidy.",
              "correct": false,
              "feedback": "Evidence is essential for audits; never delete it."
            }
          ]
        },
        {
          "id": "safety-incident-log",
          "prompt": "Why is an incident log required even when you catch the issue before it reaches users?",
          "options": [
            {
              "text": "Logs let the safety lead spot patterns and verify mitigations across teams.",
              "correct": true,
              "feedback": "Recording near misses strengthens the overall program."
            },
            {
              "text": "So you can delete the chat thread once the incident ends.",
              "correct": false,
              "feedback": "The log is for accountability, not for deleting history."
            },
            {
              "text": "Because regulators require you to inflate incident counts.",
              "correct": false,
              "feedback": "The goal is transparency, not inflated metrics."
            }
          ]
        },
        {
          "id": "safety-disallowed",
          "prompt": "Someone pressures you to generate medical diagnoses despite the disallowed content policy. How do you respond?",
          "options": [
            {
              "text": "Decline the request, cite the policy, and point them to approved clinical resources.",
              "correct": true,
              "feedback": "Stay within allowed use cases and redirect to the right channels."
            },
            {
              "text": "Provide the diagnosis but add a disclaimer at the end.",
              "correct": false,
              "feedback": "Disclaimers do not make disallowed content acceptable."
            },
            {
              "text": "Generate the response privately so it is not logged.",
              "correct": false,
              "feedback": "Working off the books violates policy and creates liability."
            }
          ]
        }
      ],
      "scoring": {
        "passingScore": 5,
        "guidance": "Review the safety escalation matrix with your team if any answers tripped you up.",
        "actions": [
          "Share lessons learned in the next safety standup.",
          "Double-check that your incident log tooling is up to date."
        ]
      }
    },
    {
      "id": "templates-integrations",
      "title": "Templates & Integrations",
      "navTitle": "Templates & Integrations Assessment",
      "intro": "Test your knowledge of template governance, blueprint rollouts, and safe integration practices before you activate automations at scale.",
      "guides": [
        "Templates Library",
        "Project Blueprints",
        "Integrations & Tools",
        "Prompt Library"
      ],
      "isFinal": false,
      "instructions": [
        "Reference the governance checklist as you answer.",
        "Score 5 out of 6 to finish the program.",
        "Update any template metadata that this quiz reveals is stale."
      ],
      "questions": [
        {
          "id": "templates-lifecycle",
          "prompt": "What is the primary purpose of a production template lifecycle?",
          "options": [
            {
              "text": "To define intake, review, publishing, and retirement so quality stays high.",
              "correct": true,
              "feedback": "Lifecycle checkpoints keep templates reliable and safe."
            },
            {
              "text": "To lock templates so only admins can view them.",
              "correct": false,
              "feedback": "Governance is about quality, not hiding templates."
            },
            {
              "text": "To prevent contributors from editing metadata.",
              "correct": false,
              "feedback": "Metadata updates are encouraged when governed by review."
            }
          ]
        },
        {
          "id": "templates-blueprint",
          "prompt": "According to the Project Blueprints guide, what makes a blueprint reusable across teams?",
          "options": [
            {
              "text": "Predefined milestones, owners, and artifacts that teams can customize.",
              "correct": true,
              "feedback": "Structure plus flexibility is what makes blueprints valuable."
            },
            {
              "text": "A strict rule that no edits are allowed once published.",
              "correct": false,
              "feedback": "Teams should tailor blueprints while keeping governance intact."
            },
            {
              "text": "A single template that covers every possible project type.",
              "correct": false,
              "feedback": "Blueprints are specialized; one-size-fits-all rarely works."
            }
          ]
        },
        {
          "id": "templates-rollout",
          "prompt": "What is a critical first step when rolling out a new integration to production?",
          "options": [
            {
              "text": "Establish monitoring, alerts, and a rollback plan before enabling wide access.",
              "correct": true,
              "feedback": "Observability plus rollback protects users from early failures."
            },
            {
              "text": "Launch directly to all users to maximize learning.",
              "correct": false,
              "feedback": "Go through staged rollouts with monitoring in place first."
            },
            {
              "text": "Skip legal review if the vendor is popular.",
              "correct": false,
              "feedback": "Vendor popularity does not replace legal or security review."
            }
          ]
        },
        {
          "id": "templates-metadata",
          "prompt": "Why does the Templates Library insist on metadata fields like owner, last review date, and risk rating?",
          "options": [
            {
              "text": "They let teams find the right template quickly and know if it is still trustworthy.",
              "correct": true,
              "feedback": "Metadata drives discovery and governance at the same time."
            },
            {
              "text": "They prevent non-admins from copying the template.",
              "correct": false,
              "feedback": "Metadata is about context, not lockdowns."
            },
            {
              "text": "They inflate reporting metrics for the enablement team.",
              "correct": false,
              "feedback": "Metrics are a side effect; the purpose is usability and safety."
            }
          ]
        },
        {
          "id": "templates-prompt-library",
          "prompt": "A prompt in the library keeps generating off-brand language. What is the recommended fix?",
          "options": [
            {
              "text": "Update the tone, add reference snippets, and capture the change log entry before republishing.",
              "correct": true,
              "feedback": "Prompts stay aligned only when you refresh them with documented updates."
            },
            {
              "text": "Remove the prompt from the library so no one uses it.",
              "correct": false,
              "feedback": "Improve and republish so teams keep a single source of truth."
            },
            {
              "text": "Leave it untouched; style issues are subjective.",
              "correct": false,
              "feedback": "Style guidance is part of the governance checklist."
            }
          ]
        },
        {
          "id": "templates-integrity",
          "prompt": "During a quarterly review you find a template with no audit trail. How do you bring it back into compliance?",
          "options": [
            {
              "text": "Recreate the audit history by validating the owner, reviewers, and last change before marking it approved again.",
              "correct": true,
              "feedback": "Templates without provenance must go through a fresh review cycle."
            },
            {
              "text": "Assume it is fine since nobody reported issues.",
              "correct": false,
              "feedback": "Lack of complaints is not evidence of compliance."
            },
            {
              "text": "Archive the template permanently so you do not have to deal with it.",
              "correct": false,
              "feedback": "Only archive if it is obsolete; otherwise rebuild the audit trail."
            }
          ]
        }
      ],
      "scoring": {
        "passingScore": 5,
        "guidance": "Refresh any out-of-date templates or integration runbooks highlighted by your answers.",
        "actions": [
          "Publish an updated template inventory to the workspace.",
          "Confirm integration monitoring dashboards are still wired to alert owners."
        ]
      }
    }
  ]
}
;
