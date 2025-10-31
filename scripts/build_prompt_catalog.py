"""Rebuild the governed prompt catalog JSON file."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Dict, List


CATALOG_PATH = (
    Path(__file__).resolve().parents[1] / "data" / "prompt-library" / "catalog.json"
)


def make_entry(
    entry_id: str,
    category: str,
    title: str,
    use_case: str,
    owner: str,
    last_review: str,
    review_cadence_days: int,
    risk_level: str,
    guardrails: List[str],
    inputs: List[str],
    outputs: List[str],
    prompt: str,
    examples: List[Dict[str, Any]],
    tags: List[str],
) -> Dict[str, Any]:
    """Return a prompt catalog entry with consistent field ordering."""

    return {
        "id": entry_id,
        "category": category,
        "title": title,
        "use_case": use_case,
        "owner": owner,
        "last_review": last_review,
        "review_cadence_days": review_cadence_days,
        "risk_level": risk_level,
        "guardrails": guardrails,
        "inputs": inputs,
        "outputs": outputs,
        "prompt": prompt,
        "examples": examples,
        "tags": tags,
    }


def build_catalog() -> List[Dict[str, Any]]:
    entries: List[Dict[str, Any]] = [
        make_entry(
            entry_id="PL-001",
            category="Planning",
            title="Quarterly OKR Blueprint",
            use_case="Draft aligned objectives, key results, and initiatives for a new quarter.",
            owner="strategy-ops@contoso.com",
            last_review="2025-10-15",
            review_cadence_days=60,
            risk_level="low",
            guardrails=[
                "Do not list more than five objectives.",
                "Flag any key result without an owner or metric.",
            ],
            inputs=[
                "Company mission statement",
                "Previous quarter performance report",
                "Draft objectives from leadership",
            ],
            outputs=["Markdown OKR table", "Dependency checklist"],
            prompt=(
                "You are the planning facilitator for Q{{quarter}}. Using {{mission}}, "
                "{{last_quarter_results}}, and draft objectives {{draft_objectives}}, produce "
                "an OKR plan with 3-5 objectives. For each objective include up to three "
                "measurable key results, the accountable leader, and milestone checkpoints. "
                "Close with a dependency checklist and risks to monitor."
            ),
            examples=[
                {
                    "input": {
                        "quarter": "1",
                        "mission": "Delight small business customers with reliable automation.",
                        "last_quarter_results": "KR completion averaged 82% with churn up 1.2%.",
                        "draft_objectives": "Grow revenue, Improve retention",
                    },
                    "output": (
                        "Objective: Grow revenue 20% YoY - KR1: Launch tiered pricing by Feb 15 "
                        "(Owner: Sales). KR2: Close 50 net-new accounts (Owner: GTM). "
                        "Dependencies: finance modeling and billing QA."
                    ),
                }
            ],
            tags=["structured", "report"],
        ),
        make_entry(
            entry_id="PL-002",
            category="Planning",
            title="Roadmap Risk Radar",
            use_case="Evaluate roadmap items for delivery, market, and dependency risk.",
            owner="pm-lead@contoso.com",
            last_review="2025-10-10",
            review_cadence_days=45,
            risk_level="medium",
            guardrails=[
                "Score risk on a low, medium, high scale.",
                "Highlight unknowns that need human follow-up instead of guessing.",
            ],
            inputs=[
                "Upcoming roadmap items table",
                "Dependency map",
                "Resource forecast",
            ],
            outputs=["Risk heatmap table", "Mitigation plan bullets"],
            prompt=(
                "Review the roadmap items in {{roadmap_items}} with dependencies "
                "{{dependency_map}} and resource forecast {{resource_forecast}}. Score "
                "delivery, market, and technical risk as low, medium, or high. Summarize the "
                "top five risks with mitigation owners, trigger signals, and next review dates."
            ),
            examples=[
                {
                    "input": {
                        "roadmap_items": "Billing revamp, Analytics overhaul",
                        "dependency_map": "Billing depends on payment gateway contract",
                        "resource_forecast": "Analytics team at 120 percent allocation through March",
                    },
                    "output": (
                        "Billing revamp - technical risk: high (gateway contract pending). "
                        "Mitigation: legal to finalize contract by Jan 15."
                    ),
                }
            ],
            tags=["structured", "report"],
        ),
        make_entry(
            entry_id="PL-003",
            category="Planning",
            title="Stakeholder Brief Builder",
            use_case="Translate a project charter into a one page stakeholder brief.",
            owner="change-office@contoso.com",
            last_review="2025-10-05",
            review_cadence_days=30,
            risk_level="low",
            guardrails=[
                "Use plain language at a grade eight reading level.",
                "List open questions separate from confirmed decisions.",
            ],
            inputs=["Project charter", "Stakeholder list", "Communication goals"],
            outputs=["One page briefing", "FAQ seed list"],
            prompt=(
                "You are preparing a stakeholder brief for {{project_name}}. Summarize the "
                "charter {{charter}}, intended outcomes, timeline, and what stakeholders must "
                "do next. Provide an FAQ seed list of at least six likely questions using the "
                "stakeholder personas in {{stakeholders}}."
            ),
            examples=[
                {
                    "input": {
                        "project_name": "Data Warehouse Migration",
                        "charter": "Move analytics warehouse to cloud provider by Q2",
                        "stakeholders": "Finance, Sales Ops, Engineering",
                    },
                    "output": (
                        "Finance: review new cost model by Mar 1. Sales Ops: update dashboards. "
                        "Engineering: freeze schema changes from Apr 10."
                    ),
                }
            ],
            tags=["meeting", "report"],
        ),
        make_entry(
            entry_id="PL-004",
            category="Planning",
            title="Resourcing Scenario Modeler",
            use_case="Compare alternate resource allocations across initiatives.",
            owner="portfolio@contoso.com",
            last_review="2025-10-18",
            review_cadence_days=30,
            risk_level="medium",
            guardrails=[
                "Do not exceed 100 percent allocation per role.",
                "Highlight headcount gaps instead of inventing capacity.",
            ],
            inputs=[
                "Initiative list with effort estimates",
                "Available capacity by role",
                "Hiring forecast",
            ],
            outputs=["Allocation matrix", "Gap analysis"],
            prompt=(
                "Take the initiatives in {{initiatives}} with effort estimates {{effort_table}} "
                "and match them to role capacity {{capacity}}. Produce three scenarios (focus, "
                "balanced, aggressive) with allocation percent, unstaffed hours, and decisions "
                "required."
            ),
            examples=[
                {
                    "input": {
                        "initiatives": "AI Copilot, Mobile Revamp",
                        "effort_table": "AI: 1800 hours engineering, Mobile: 1400 hours design",
                        "capacity": "Engineering 1500 hours, Design 900 hours",
                    },
                    "output": (
                        "Balanced scenario: AI Copilot staffed 70 percent with a gap of 540 "
                        "engineering hours. Decision: contract backend partner."
                    ),
                }
            ],
            tags=["structured", "table"],
        ),
        make_entry(
            entry_id="PL-005",
            category="Planning",
            title="Discovery Interview Planner",
            use_case="Prepare customer discovery sessions with goals, scripts, and scoring.",
            owner="product-research@contoso.com",
            last_review="2025-09-27",
            review_cadence_days=45,
            risk_level="low",
            guardrails=[
                "Do not use leading or biased questions.",
                "Include at least two open ended probes per theme.",
            ],
            inputs=[
                "Discovery goal statement",
                "Target persona summary",
                "Hypotheses list",
            ],
            outputs=["Interview guide", "Scoring rubric"],
            prompt=(
                "With goal {{goal_statement}}, persona {{persona_summary}}, and hypotheses "
                "{{hypotheses}}, craft a 45 minute interview guide. Include intro script, "
                "thematic sections, neutral questions, and a scoring rubric for need, "
                "willingness, and fit."
            ),
            examples=[
                {
                    "input": {
                        "goal_statement": "Validate pain points for invoice automation",
                        "persona_summary": "Finance managers at mid market firms",
                        "hypotheses": "Manual approvals cause delays; dashboards are unclear",
                    },
                    "output": (
                        "Section: current workflow - question: walk me through how invoices get "
                        "approved today. Probe: where does it usually stall?"
                    ),
                }
            ],
            tags=["structured", "meeting"],
        ),
        make_entry(
            entry_id="PL-006",
            category="Planning",
            title="Budget Scenario Forecaster",
            use_case="Build optimistic, base, and downside budget scenarios for the upcoming fiscal year.",
            owner="finance-planning@contoso.com",
            last_review="2025-10-12",
            review_cadence_days=60,
            risk_level="medium",
            guardrails=[
                "Never invent revenue drivers that are not provided.",
                "Escalate if variance exceeds 15 percent from baseline guidance.",
            ],
            inputs=["Baseline budget", "Scenario assumptions", "Cost center roster"],
            outputs=["Scenario comparison table", "Variance commentary"],
            prompt=(
                "Using the baseline budget {{baseline_budget}} and scenario assumptions "
                "{{assumptions}}, generate optimistic, base, and downside views. Provide line "
                "by line totals, percent deltas, and call out the three largest moves with "
                "rationale."
            ),
            examples=[
                {
                    "input": {
                        "baseline_budget": "Revenue 12M, Operating expenses 7M",
                        "assumptions": "Downside: churn up 3 percent, hiring freeze",
                    },
                    "output": (
                        "Downside scenario reduces operating expenses by 8 percent via hiring "
                        "freeze. Variance commentary flags marketing spend hold."
                    ),
                }
            ],
            tags=["structured", "table"],
        ),
        make_entry(
            entry_id="PL-007",
            category="Planning",
            title="Change Impact Matrix",
            use_case="Map stakeholder groups against expected change impacts and required actions.",
            owner="change-office@contoso.com",
            last_review="2025-09-30",
            review_cadence_days=45,
            risk_level="low",
            guardrails=[
                "Mark unknown impacts as TBD rather than assuming details.",
                "Capture at least one mitigation per high impact cell.",
            ],
            inputs=["Stakeholder segments", "Change summary", "Adoption risks"],
            outputs=["Impact matrix", "Mitigation backlog"],
            prompt=(
                "Given stakeholder segments {{segments}} and change summary {{change_overview}}, "
                "build an impact matrix with reach, severity, and mitigation owners. Highlight "
                "the top three hotspots with the proposed mitigation timeline."
            ),
            examples=[
                {
                    "input": {
                        "segments": "Sales, Support, Partners",
                        "change_overview": "New CRM rollout replacing legacy system",
                    },
                    "output": (
                        "Support shows high severity due to retraining. Mitigation: schedule "
                        "live lab by Nov 12."
                    ),
                }
            ],
            tags=["structured", "report"],
        ),
        make_entry(
            entry_id="PL-008",
            category="Planning",
            title="Launch Readiness Checklist",
            use_case="Coordinate cross functional launch activities and readiness gates.",
            owner="launch-desk@contoso.com",
            last_review="2025-10-01",
            review_cadence_days=30,
            risk_level="medium",
            guardrails=[
                "Require sign off for tasks tagged high risk.",
                "List unresolved dependencies separate from complete tasks.",
            ],
            inputs=["Launch milestone plan", "Functional owners", "Risk register"],
            outputs=["Readiness checklist", "Escalation log"],
            prompt=(
                "Review the launch milestone plan {{milestones}} and risk register {{risks}}. "
                "Generate a readiness checklist grouped by workstream with status, owner, and "
                "go or no go criteria. Surface any risks that lack mitigation."
            ),
            examples=[
                {
                    "input": {
                        "milestones": "Beta exit Sep 5, GA Oct 20",
                        "risks": "Support runbook incomplete",
                    },
                    "output": (
                        "Support workstream: runbook draft due Sep 28. Escalate if not approved "
                        "by Oct 5."
                    ),
                }
            ],
            tags=["structured", "meeting"],
        ),
        make_entry(
            entry_id="PL-009",
            category="Planning",
            title="Portfolio Review Packet",
            use_case="Summarize initiative health for quarterly portfolio councils.",
            owner="portfolio@contoso.com",
            last_review="2025-10-14",
            review_cadence_days=60,
            risk_level="medium",
            guardrails=[
                "Escalate any project more than 30 days past due.",
                "Use provided KPIs; do not invent metrics.",
            ],
            inputs=["Initiative status updates", "Financial burn report", "Risk log"],
            outputs=["Executive summary", "Traffic light dashboard"],
            prompt=(
                "Create a council ready packet summarizing initiatives in {{status_updates}}. "
                "Include a TLDR, a traffic light dashboard with KPIs, and spotlight sections for "
                "red programs detailing recovery plans."
            ),
            examples=[
                {
                    "input": {"status_updates": "Payments modernization red; AI agent amber"},
                    "output": (
                        "Red program recovery: add dedicated QA lead and decide on scope trim by "
                        "Nov 3."
                    ),
                }
            ],
            tags=["structured", "report"],
        ),
        make_entry(
            entry_id="PL-010",
            category="Planning",
            title="Program Risk Status",
            use_case="Roll up program level risks with trend indicators.",
            owner="pmo-office@contoso.com",
            last_review="2025-09-25",
            review_cadence_days=30,
            risk_level="medium",
            guardrails=[
                "Document trend direction with evidence links.",
                "Call out any risk without an assigned owner.",
            ],
            inputs=["Risk register", "Mitigation plans", "Program calendar"],
            outputs=["Risk status table", "Escalation summary"],
            prompt=(
                "Using the risk register {{risk_register}} and mitigation plans {{mitigations}}, "
                "prepare a risk status report with trend (up, down, stable), confidence, and next "
                "review date. Highlight the top three emerging risks with immediate actions."
            ),
            examples=[
                {
                    "input": {
                        "risk_register": "Supplier delay, Security review backlog",
                        "mitigations": "Supplier expedite in progress",
                    },
                    "output": (
                        "Supplier delay trending up. Action: negotiate interim shipment by Nov 8."
                    ),
                }
            ],
            tags=["structured", "report"],
        ),
        make_entry(
            entry_id="PL-011",
            category="Research",
            title="Competitive Landscape Scan",
            use_case="Synthesize competitor moves, positioning, and signals from recent news.",
            owner="market-intel@contoso.com",
            last_review="2025-10-16",
            review_cadence_days=21,
            risk_level="medium",
            guardrails=[
                "Cite all claims with a source URL and access date.",
                "Flag rumors or speculative items as unverified.",
            ],
            inputs=["Competitor list", "News clipping pack", "Pricing intel"],
            outputs=["Briefing document", "Signal log"],
            prompt=(
                "Analyze the competitor updates in {{clippings}} and pricing intel {{pricing}}. "
                "Produce a briefing with positioning shifts, product launches, and go to market "
                "signals. List sources with access date and confidence score."
            ),
            examples=[
                {
                    "input": {
                        "clippings": "Competitor A launched AI add-on Oct 12",
                        "pricing": "Trial discount to 29 USD",
                    },
                    "output": (
                        "Competitor A: new AI add-on targets SMB; confidence high (press release "
                        "2025-10-12)."
                    ),
                }
            ],
            tags=["synthesis", "report"],
        ),
        make_entry(
            entry_id="PL-012",
            category="Research",
            title="Voice of Customer Digest",
            use_case="Consolidate survey, interview, and support signals into a monthly digest.",
            owner="customer-insights@contoso.com",
            last_review="2025-10-20",
            review_cadence_days=30,
            risk_level="medium",
            guardrails=[
                "Remove customer identifiers before summarizing.",
                "Separate verbatim quotes from analyst commentary.",
            ],
            inputs=["NPS survey results", "Interview transcripts", "Support ticket tags"],
            outputs=["Monthly digest", "Theme tracker"],
            prompt=(
                "Combine the survey data {{survey_data}}, interviews {{transcripts}}, and ticket "
                "tags {{ticket_tags}} to produce a voice of customer digest. Include a TLDR, top "
                "themes with frequency, notable quotes (anonymized), and recommended follow ups."
            ),
            examples=[
                {
                    "input": {
                        "survey_data": "120 responses, NPS 42",
                        "transcripts": "Recurring ask for better onboarding",
                    },
                    "output": (
                        "Theme: onboarding confusion (31 mentions). Follow up: refresh email "
                        "walkthrough by Nov 30."
                    ),
                }
            ],
            tags=["synthesis", "report"],
        ),
        make_entry(
            entry_id="PL-013",
            category="Research",
            title="Literature Review Abstractor",
            use_case="Summarize academic or industry papers into structured abstracts with key findings.",
            owner="research-lab@contoso.com",
            last_review="2025-10-11",
            review_cadence_days=30,
            risk_level="medium",
            guardrails=[
                "Clearly label any paywalled sources.",
                "List knowledge gaps that need expert follow up.",
            ],
            inputs=["Paper abstracts", "Methodology notes", "Outcome metrics"],
            outputs=["Structured abstract", "Gap log"],
            prompt=(
                "Given the paper details in {{papers}}, produce structured abstracts with "
                "sections: objective, method, findings, limitations, next questions. Include "
                "citation metadata and note missing data."
            ),
            examples=[
                {
                    "input": {"papers": "Study on LLM safety testing, sample size 42"},
                    "output": (
                        "Findings: 87 percent of safety breaches mitigated with guardrails. "
                        "Limitation: small sample size."
                    ),
                }
            ],
            tags=["synthesis", "structured"],
        ),
        make_entry(
            entry_id="PL-014",
            category="Research",
            title="Regulatory Watch Brief",
            use_case="Aggregate regulatory updates impacting AI deployments.",
            owner="policy-office@contoso.com",
            last_review="2025-10-21",
            review_cadence_days=14,
            risk_level="high",
            guardrails=[
                "Escalate unresolved legal interpretations to counsel.",
                "Include jurisdiction and effective dates for every item.",
            ],
            inputs=["Regulation alerts", "Legal summaries", "Compliance tracker"],
            outputs=["Regulatory brief", "Action items"],
            prompt=(
                "Using regulation alerts {{alerts}} and summaries {{summaries}}, build a brief "
                "that lists changes by jurisdiction, effective date, impacted teams, and "
                "required actions. Highlight items needing legal review."
            ),
            examples=[
                {
                    "input": {
                        "alerts": "EU AI Act update Oct 15",
                        "summaries": "High risk system obligations clarified",
                    },
                    "output": (
                        "EU AI Act: transparency logs mandatory by 2026-01-01. Action: legal "
                        "review to map obligations."
                    ),
                }
            ],
            tags=["synthesis", "report"],
        ),
        make_entry(
            entry_id="PL-015",
            category="Research",
            title="Persona Insight Builder",
            use_case="Compile persona snapshots from qualitative and quantitative research.",
            owner="ux-research@contoso.com",
            last_review="2025-09-29",
            review_cadence_days=45,
            risk_level="low",
            guardrails=[
                "Maintain anonymized identifiers only.",
                "Separate assumptions from validated insights.",
            ],
            inputs=["Interview notes", "Usage analytics", "Job stories"],
            outputs=["Persona cards", "Insight highlights"],
            prompt=(
                "Blend the qualitative insights {{interviews}} with analytics {{analytics}} to "
                "produce persona cards covering goals, pains, workflows, and tech stack. Add the "
                "top three quotes per persona and validation status."
            ),
            examples=[
                {
                    "input": {
                        "interviews": "Operations lead wants faster approvals",
                        "analytics": "Feature adoption 32 percent",
                    },
                    "output": (
                        "Persona: Operations Lead - pain: manual approvals; validation: confirmed "
                        "in 5 of 6 interviews."
                    ),
                }
            ],
            tags=["synthesis", "structured"],
        ),
        make_entry(
            entry_id="PL-016",
            category="Research",
            title="Opportunity Sizing Model",
            use_case="Estimate market size and revenue potential for new opportunities.",
            owner="strategy-ops@contoso.com",
            last_review="2025-10-09",
            review_cadence_days=30,
            risk_level="medium",
            guardrails=[
                "List all assumptions with data source.",
                "Do not extrapolate beyond provided market bands.",
            ],
            inputs=["TAM SAM SOM data", "Pricing model", "Adoption scenarios"],
            outputs=["Sizing table", "Assumption log"],
            prompt=(
                "Using market data {{market_data}} and pricing {{pricing_model}}, estimate TAM, "
                "SAM, and SOM with low, medium, and high adoption scenarios. Provide "
                "calculations, assumptions, and sensitivity commentary."
            ),
            examples=[
                {
                    "input": {
                        "market_data": "TAM 2.5B USD",
                        "pricing_model": "Average revenue per user 49 USD",
                    },
                    "output": (
                        "SAM 450M with medium adoption 12 percent. Assumption: target segment is "
                        "mid market North America."
                    ),
                }
            ],
            tags=["structured", "table"],
        ),
        make_entry(
            entry_id="PL-017",
            category="Research",
            title="Trend Radar Newsletter",
            use_case="Summarize macro and micro trends impacting the business.",
            owner="market-intel@contoso.com",
            last_review="2025-10-19",
            review_cadence_days=21,
            risk_level="medium",
            guardrails=[
                "Include at least one counter signal per trend.",
                "Flag citation confidence levels.",
            ],
            inputs=["Trend data feeds", "Analyst commentary", "Economic indicators"],
            outputs=["Newsletter", "Signal tracker"],
            prompt=(
                "Review trend data {{trend_feed}} and indicators {{indicators}}. Build a "
                "newsletter with sections: macro trends, industry shifts, emerging signals, "
                "counter signals, recommended actions."
            ),
            examples=[
                {
                    "input": {
                        "trend_feed": "Automation adoption up 18 percent",
                        "indicators": "SMB hiring down 4 percent",
                    },
                    "output": (
                        "Macro trend: automation surge. Counter signal: SMB budget tightening "
                        "limits spend."
                    ),
                }
            ],
            tags=["synthesis", "report"],
        ),
        make_entry(
            entry_id="PL-018",
            category="Research",
            title="Experiment Results Synthesizer",
            use_case="Summarize A/B or multivariate experiment outcomes with insights and next steps.",
            owner="growth-analytics@contoso.com",
            last_review="2025-10-17",
            review_cadence_days=21,
            risk_level="medium",
            guardrails=[
                "Label statistical significance and sample sizes.",
                "Flag any data quality issues for analyst follow up.",
            ],
            inputs=["Experiment summary", "Variant performance data", "Segment breakdown"],
            outputs=["Experiment report", "Decision log"],
            prompt=(
                "Using experiment data {{experiment_data}} and segments {{segments}}, create a "
                "summary with hypothesis, key metrics, significance, learnings, and recommended "
                "follow up tests. Include a decision log for roll out."
            ),
            examples=[
                {
                    "input": {
                        "experiment_data": "Variant B click through rate up 6 percent, p=0.03",
                        "segments": "SMB vs Enterprise",
                    },
                    "output": (
                        "Decision: roll Variant B to SMB only. Follow up: retest on Enterprise "
                        "with new messaging."
                    ),
                }
            ],
            tags=["structured", "synthesis"],
        ),
        make_entry(
            entry_id="PL-019",
            category="Research",
            title="Claims Validation Worksheet",
            use_case="Validate marketing or product claims with supporting evidence.",
            owner="brand-compliance@contoso.com",
            last_review="2025-10-08",
            review_cadence_days=30,
            risk_level="high",
            guardrails=[
                "List evidence source and access date for every claim.",
                "Escalate unverifiable claims to compliance before publication.",
            ],
            inputs=["Claim statements", "Evidence repository", "Policy checklist"],
            outputs=["Validation worksheet", "Escalation log"],
            prompt=(
                "Cross check claim statements in {{claims}} with evidence {{evidence}}. For each "
                "claim record status (verified, needs review, rejected), evidence link, and "
                "reviewer notes. Summarize unresolved claims at the end."
            ),
            examples=[
                {
                    "input": {
                        "claims": "Our tool cuts processing time by 40 percent",
                        "evidence": "Case study 2024-09 showing 38 percent",
                    },
                    "output": (
                        "Status: needs review. Gap: difference between 38 percent evidenced and 40 "
                        "percent claim."
                    ),
                }
            ],
            tags=["verification", "structured"],
        ),
        make_entry(
            entry_id="PL-020",
            category="Research",
            title="Insights Workshop Agenda",
            use_case="Create agendas for insight sharing workshops with discussion prompts.",
            owner="insights-team@contoso.com",
            last_review="2025-10-13",
            review_cadence_days=45,
            risk_level="low",
            guardrails=[
                "Include time allocations that match the session length.",
                "Add facilitation tips for sensitive findings.",
            ],
            inputs=["Workshop goal", "Participant list", "Key findings pack"],
            outputs=["Workshop agenda", "Action capture template"],
            prompt=(
                "Design a workshop agenda for {{goal}} with participants {{participants}} using "
                "findings {{findings}}. Include timings, discussion prompts, and capture "
                "template guidance."
            ),
            examples=[
                {
                    "input": {
                        "goal": "Align teams on onboarding insights",
                        "participants": "Product, Support, Design",
                    },
                    "output": (
                        "Segment 2: breakout on onboarding friction (20 minutes). Capture "
                        "template includes success metrics and owners."
                    ),
                }
            ],
            tags=["meeting", "synthesis"],
        ),
        make_entry(
            entry_id="CM-001",
            category="Communication",
            title="Executive Update Draft",
            use_case="Summarize program progress for executive stakeholders each week.",
            owner="exec-comms@contoso.com",
            last_review="2025-10-22",
            review_cadence_days=7,
            risk_level="medium",
            guardrails=[
                "Keep the TLDR to three bullets maximum.",
                "Flag blockers with owner, impact, and target resolution date.",
            ],
            inputs=[
                "Program status notes",
                "Metrics snapshot",
                "Upcoming decisions",
            ],
            outputs=["Email-ready summary", "Blocker list"],
            prompt=(
                "Draft a weekly executive update for {{program_name}} using status notes "
                "{{status_notes}}, metrics {{metrics}}, and upcoming decisions {{decisions}}. "
                "Provide a TLDR with three bullets, progress highlights, a blocker table "
                "(owner, impact, ETA), and a closing call to action."
            ),
            examples=[
                {
                    "input": {
                        "program_name": "Unified Billing",
                        "status_notes": "Portal beta on track, integration tests lagging",
                        "metrics": "Adoption 62%, churn down 1.4%",
                        "decisions": "Approve extended QA window",
                    },
                    "output": (
                        "TLDR: Beta on track; integration risk escalating; decision needed on QA "
                        "window. Blockers table lists test environment outage (Owner: Ops, ETA: "
                        "Nov 2). Action: approve 5-day extension."
                    ),
                }
            ],
            tags=["email", "report"],
        ),
        make_entry(
            entry_id="CM-002",
            category="Communication",
            title="Customer Escalation Reply",
            use_case="Compose empathetic responses to high-priority customer escalations.",
            owner="support-lead@contoso.com",
            last_review="2025-10-20",
            review_cadence_days=14,
            risk_level="high",
            guardrails=[
                "Open with acknowledgement of the customer experience.",
                "Commit only to remediation steps validated by the incident commander.",
            ],
            inputs=[
                "Escalation thread",
                "Customer profile",
                "Resolution plan",
            ],
            outputs=["Customer email draft", "Action summary"],
            prompt=(
                "Write a customer escalation response referencing thread {{thread}}, customer "
                "profile {{customer}}, and resolution plan {{plan}}. Begin with empathy, state "
                "verified facts, outline remediation with owners and timelines, and restate "
                "support contact options."
            ),
            examples=[
                {
                    "input": {
                        "thread": "Payment failures since Oct 18",
                        "customer": "Enterprise tier, 4-year account",
                        "plan": "Hotfix in staging; credit memo approved",
                    },
                    "output": (
                        "Apologized for payment disruption, confirmed hotfix release ETA Oct 31, "
                        "and detailed credit memo processing within 48 hours."
                    ),
                }
            ],
            tags=["email", "structured"],
        ),
        make_entry(
            entry_id="CM-003",
            category="Communication",
            title="Town Hall Agenda Builder",
            use_case="Structure internal town hall meetings with clear segments and prompts.",
            owner="people-ops@contoso.com",
            last_review="2025-10-07",
            review_cadence_days=30,
            risk_level="medium",
            guardrails=[
                "Include live Q&A with anonymized question intake instructions.",
                "Balance airtime across business updates, wins, and risks.",
            ],
            inputs=[
                "Key messages",
                "Speaker list",
                "Audience concerns",
            ],
            outputs=["Agenda outline", "Facilitation notes"],
            prompt=(
                "Create a town hall agenda using key messages {{messages}}, speaker list "
                "{{speakers}}, and audience concerns {{concerns}}. Provide timed segments, "
                "transition notes, Q&A facilitation guidance, and highlight diversity and "
                "inclusion moments."
            ),
            examples=[
                {
                    "input": {
                        "messages": "Product roadmap, hiring pause, support wins",
                        "speakers": "CEO, CPO, Support VP",
                        "concerns": "Job security, roadmap clarity",
                    },
                    "output": (
                        "Agenda slots 10 minutes per segment, embeds moderated Q&A with Slido, "
                        "and notes to address hiring pause transparently."
                    ),
                }
            ],
            tags=["meeting", "report"],
        ),
        make_entry(
            entry_id="CM-004",
            category="Communication",
            title="Incident Communication Plan",
            use_case="Coordinate internal and external messaging during incidents.",
            owner="comms-duty@contoso.com",
            last_review="2025-10-18",
            review_cadence_days=7,
            risk_level="high",
            guardrails=[
                "Clearly separate confirmed facts from investigations in progress.",
                "List approval checkpoints before releasing external statements.",
            ],
            inputs=[
                "Incident summary",
                "Stakeholder map",
                "Mitigation steps",
            ],
            outputs=["Comms playbook", "Message matrix"],
            prompt=(
                "Generate an incident communication plan using summary {{summary}}, stakeholder "
                "map {{stakeholders}}, and mitigation steps {{mitigation}}. Provide timeline "
                "with owners, internal vs external messaging guidance, and approval workflow."
            ),
            examples=[
                {
                    "input": {
                        "summary": "Auth outage affecting 12% of sessions",
                        "stakeholders": "Exec team, enterprise customers, regulators",
                        "mitigation": "Rollback deployed; forensic review ongoing",
                    },
                    "output": (
                        "Plan includes 30-minute cadence updates, executive briefing deck, and "
                        "customer email once mitigation confirmed."
                    ),
                }
            ],
            tags=["report", "structured"],
        ),
        make_entry(
            entry_id="CM-005",
            category="Communication",
            title="FAQ Refresh Writer",
            use_case="Update help center FAQ entries with latest policy and feature details.",
            owner="knowledge-base@contoso.com",
            last_review="2025-10-12",
            review_cadence_days=30,
            risk_level="medium",
            guardrails=[
                "Surface policy changes with effective dates.",
                "Link to supporting guides or videos using relative paths only.",
            ],
            inputs=[
                "Existing FAQ content",
                "Policy updates",
                "Product release notes",
            ],
            outputs=["Updated FAQ article", "Change log snippet"],
            prompt=(
                "Rewrite the FAQ entry using current text {{existing}}, policy updates "
                "{{policy_updates}}, and release notes {{release_notes}}. Keep answers concise, "
                "add change log callout, and include next review date."
            ),
            examples=[
                {
                    "input": {
                        "existing": "How do I reset my password?",
                        "policy_updates": "MFA required starting Nov 15",
                        "release_notes": "New recovery email option",
                    },
                    "output": (
                        "Answer includes MFA requirement, lists recovery steps, and change log "
                        "notes Nov 15 policy go-live."
                    ),
                }
            ],
            tags=["report", "structured"],
        ),
        make_entry(
            entry_id="CM-006",
            category="Communication",
            title="Training Announcement Draft",
            use_case="Notify teams about upcoming training with clear expectations.",
            owner="learning@contoso.com",
            last_review="2025-10-14",
            review_cadence_days=30,
            risk_level="low",
            guardrails=[
                "Include prerequisites and time commitment.",
                "Provide accessibility accommodations contact.",
            ],
            inputs=[
                "Training overview",
                "Participant list",
                "Logistics",
            ],
            outputs=["Email announcement", "Calendar blurb"],
            prompt=(
                "Draft a training announcement for {{training_name}} using overview "
                "{{overview}}, participant list {{participants}}, and logistics {{logistics}}. "
                "Include purpose, expectations, prep work, and contact for accommodations."
            ),
            examples=[
                {
                    "input": {
                        "training_name": "Secure Coding 101",
                        "overview": "Covers OWASP basics and secure review",
                        "participants": "Backend engineers cohort",
                        "logistics": "Nov 12, 2 hours, Teams link",
                    },
                    "output": (
                        "Email outlines goals, time commitment, pre-work video, and RSVP link "
                        "with accessibility contact."
                    ),
                }
            ],
            tags=["email", "structured"],
        ),
        make_entry(
            entry_id="CM-007",
            category="Communication",
            title="Retrospective Summary",
            use_case="Capture outcomes and actions from team retrospectives.",
            owner="delivery-ops@contoso.com",
            last_review="2025-10-16",
            review_cadence_days=14,
            risk_level="medium",
            guardrails=[
                "Group insights by keep/start/stop.",
                "Assign owners and due dates for each action item.",
            ],
            inputs=[
                "Retro raw notes",
                "Action backlog",
                "Metrics snapshot",
            ],
            outputs=["Retro summary", "Action tracker"],
            prompt=(
                "Summarize the retrospective notes {{notes}}, action backlog {{actions}}, and "
                "metrics {{metrics}} into keep/start/stop sections, highlight wins, and list "
                "actions with owners and due dates."
            ),
            examples=[
                {
                    "input": {
                        "notes": "Keep async standups; start pairing; stop late reviews",
                        "actions": "Pairing pilot, set code freeze reminder",
                        "metrics": "Lead time 3.2 days",
                    },
                    "output": (
                        "Summary lists three keep items, two starts, and clarifies owners with "
                        "due dates synced to Jira."
                    ),
                }
            ],
            tags=["report", "meeting"],
        ),
        make_entry(
            entry_id="CM-008",
            category="Communication",
            title="Product Launch Email Kit",
            use_case="Prepare internal and external launch announcements.",
            owner="product-marketing@contoso.com",
            last_review="2025-10-19",
            review_cadence_days=14,
            risk_level="medium",
            guardrails=[
                "Separate internal enablement details from external messaging.",
                "Include CTA links as relative URLs or tracked shortlinks.",
            ],
            inputs=[
                "Launch brief",
                "Feature highlights",
                "Customer benefits",
            ],
            outputs=["Internal email draft", "Customer email draft"],
            prompt=(
                "Create launch emails using brief {{brief}}, highlights {{highlights}}, and "
                "benefits {{benefits}}. Provide internal enablement copy with key actions and "
                "external customer email with CTA and support info."
            ),
            examples=[
                {
                    "input": {
                        "brief": "AI Assistant GA Nov 5",
                        "highlights": "Natural language tasks, dashboard integration",
                        "benefits": "Saves 4 hours weekly per analyst",
                    },
                    "output": (
                        "Internal email includes enablement checklist; customer version focuses "
                        "on time savings with upgrade CTA."
                    ),
                }
            ],
            tags=["email", "report"],
        ),
        make_entry(
            entry_id="CM-009",
            category="Communication",
            title="Internal Newsletter Builder",
            use_case="Compile monthly internal newsletter with highlights and metrics.",
            owner="internal-comms@contoso.com",
            last_review="2025-10-10",
            review_cadence_days=30,
            risk_level="medium",
            guardrails=[
                "Highlight three wins, two learnings, and one upcoming focus.",
                "Embed metrics in plain text tables for accessibility.",
            ],
            inputs=[
                "Story submissions",
                "Metrics roundup",
                "Upcoming events",
            ],
            outputs=["Newsletter draft", "Metrics table"],
            prompt=(
                "Assemble the internal newsletter from stories {{stories}}, metrics {{metrics}}, "
                "and events {{events}}. Provide intro note, themed sections, metric table, and "
                "call to action for submissions."
            ),
            examples=[
                {
                    "input": {
                        "stories": "Support award, hackathon winners",
                        "metrics": "CSAT 4.7, deploys 32",
                        "events": "All hands Nov 8, volunteer day Nov 20",
                    },
                    "output": (
                        "Newsletter segmented by wins, learnings, focus; includes table with CSAT "
                        "and deploy counts plus CTA link."
                    ),
                }
            ],
            tags=["report", "structured"],
        ),
        make_entry(
            entry_id="CM-010",
            category="Communication",
            title="Stakeholder Follow-up Tracker",
            use_case="Document follow-ups after stakeholder meetings with owners and deadlines.",
            owner="program-comms@contoso.com",
            last_review="2025-10-24",
            review_cadence_days=14,
            risk_level="low",
            guardrails=[
                "List open questions separately from decisions.",
                "Assign each follow-up an owner and target date.",
            ],
            inputs=[
                "Meeting notes",
                "Decision log",
                "Action register",
            ],
            outputs=["Follow-up summary", "Owner checklist"],
            prompt=(
                "Summarize stakeholder meeting notes {{notes}}, decisions {{decisions}}, and "
                "actions {{actions}} into a follow-up tracker with decisions made, new actions, "
                "open questions, and owners with deadlines."
            ),
            examples=[
                {
                    "input": {
                        "notes": "Stakeholders aligned on beta scope",
                        "decisions": "Move GA to Dec 12",
                        "actions": "Ops to size infra spend; Legal to review terms",
                    },
                    "output": (
                        "Tracker lists three actions with owners and due dates plus two open "
                        "questions routed to legal."
                    ),
                }
            ],
            tags=["meeting", "structured"],
        ),
        make_entry(
            entry_id="CD-001",
            category="Coding",
            title="Code Review Checklist",
            use_case="Guide thorough peer reviews with focus on correctness and maintainability.",
            owner="engineering-standards@contoso.com",
            last_review="2025-10-18",
            review_cadence_days=14,
            risk_level="medium",
            guardrails=[
                "Do not approve changes lacking tests unless waiver noted.",
                "Flag security-sensitive blocks for additional review.",
            ],
            inputs=[
                "Pull request diff",
                "Issue context",
                "Coding standards",
            ],
            outputs=["Review checklist", "Risk notes"],
            prompt=(
                "Analyze diff {{diff}}, issue context {{context}}, and standards {{standards}} "
                "to produce a review checklist covering functionality, tests, security, "
                "documentation, and follow-up questions."
            ),
            examples=[
                {
                    "input": {
                        "diff": "Adds caching layer to invoice API",
                        "context": "Ticket INC-204 latency spike",
                        "standards": "REST guidelines v4",
                    },
                    "output": (
                        "Checklist asks for cache invalidation tests, concurrency review, and "
                        "docs update confirmation."
                    ),
                }
            ],
            tags=["diff", "test"],
        ),
        make_entry(
            entry_id="CD-002",
            category="Coding",
            title="Refactor Plan Builder",
            use_case="Outline safe refactor steps with validation and rollback checkpoints.",
            owner="platform-eng@contoso.com",
            last_review="2025-10-21",
            review_cadence_days=21,
            risk_level="medium",
            guardrails=[
                "List verification tests for each refactor stage.",
                "Document rollback triggers before execution.",
            ],
            inputs=[
                "Current architecture notes",
                "Tech debt description",
                "Test coverage report",
            ],
            outputs=["Refactor plan", "Validation checklist"],
            prompt=(
                "Build a refactor plan using architecture notes {{architecture}}, debt "
                "description {{debt}}, and coverage report {{coverage}}. Include phased steps, "
                "tests to run, metrics to monitor, and rollback criteria."
            ),
            examples=[
                {
                    "input": {
                        "architecture": "Monolith controller mixing SQL and business logic",
                        "debt": "Difficult to extend billing rules",
                        "coverage": "72% statement coverage",
                    },
                    "output": (
                        "Plan proposes extraction into service layer, adds contract tests, and "
                        "defines rollback if error rate exceeds 0.5%."
                    ),
                }
            ],
            tags=["structured", "diff"],
        ),
        make_entry(
            entry_id="CD-003",
            category="Coding",
            title="Unit Test Generator",
            use_case="Design unit test scenarios based on requirements and edge cases.",
            owner="qe-dev@contoso.com",
            last_review="2025-10-23",
            review_cadence_days=14,
            risk_level="medium",
            guardrails=[
                "Describe expected assertions and fixtures for each case.",
                "Include negative and boundary scenarios when data allows.",
            ],
            inputs=[
                "Function spec",
                "Example inputs",
                "Edge case catalog",
            ],
            outputs=["Test case list", "Coverage rationale"],
            prompt=(
                "Generate unit test scenarios for {{function_name}} using spec {{spec}}, "
                "examples {{examples}}, and edge cases {{edges}}. Detail each test purpose, "
                "inputs, expected outputs, and fixtures."
            ),
            examples=[
                {
                    "input": {
                        "function_name": "parse_invoice",
                        "spec": "Parses CSV rows into Invoice objects",
                        "examples": "Row with discount, row with tax",
                        "edges": "Missing fields, negative totals",
                    },
                    "output": (
                        "List includes happy path, missing field raises ValueError, and "
                        "negative total flagged test with mocked logger."
                    ),
                }
            ],
            tags=["test", "structured"],
        ),
        make_entry(
            entry_id="CD-004",
            category="Coding",
            title="API Contract Validator",
            use_case="Check API changes against agreed contracts and client impact.",
            owner="api-guild@contoso.com",
            last_review="2025-10-17",
            review_cadence_days=14,
            risk_level="high",
            guardrails=[
                "Call out any breaking changes explicitly.",
                "Recommend versioning strategy when new fields are added.",
            ],
            inputs=[
                "API schema diff",
                "Consumer list",
                "Change notes",
            ],
            outputs=["Contract review", "Client impact report"],
            prompt=(
                "Evaluate API schema diff {{schema_diff}}, consumer list {{consumers}}, and "
                "change notes {{change_notes}}. Identify breaking changes, migration steps, and "
                "notify impacted consumers with timeline."
            ),
            examples=[
                {
                    "input": {
                        "schema_diff": "Renamed field total to total_amount",
                        "consumers": "Mobile app, Billing ETL",
                        "change_notes": "New tax field optional",
                    },
                    "output": (
                        "Report flags rename as breaking, suggests temporary alias, and lists "
                        "consumer outreach plan."
                    ),
                }
            ],
            tags=["diff", "verification"],
        ),
        make_entry(
            entry_id="CD-005",
            category="Coding",
            title="Data Migration Playbook",
            use_case="Outline migration steps, backout plans, and validation queries.",
            owner="data-eng@contoso.com",
            last_review="2025-10-20",
            review_cadence_days=21,
            risk_level="high",
            guardrails=[
                "List pre-migration backups and verification queries.",
                "Define backout triggers tied to observed metrics.",
            ],
            inputs=[
                "Source dataset profile",
                "Target schema",
                "Migration window",
            ],
            outputs=["Migration checklist", "Validation query set"],
            prompt=(
                "Create a data migration playbook using source profile {{source}}, target schema "
                "{{target}}, and window {{window}}. Detail preparation, execution steps, data "
                "validation queries, and rollback plan."
            ),
            examples=[
                {
                    "input": {
                        "source": "Invoices table 120M rows",
                        "target": "Partitioned parquet lakehouse",
                        "window": "Nov 14 01:00-03:00 UTC",
                    },
                    "output": (
                        "Playbook lists snapshot backups, checksum queries, canary validation, "
                        "and rollback triggers if error rate >0.2%."
                    ),
                }
            ],
            tags=["structured", "test"],
        ),
        make_entry(
            entry_id="CD-006",
            category="Coding",
            title="Performance Profiling Brief",
            use_case="Summarize profiling results with optimization recommendations.",
            owner="perf-team@contoso.com",
            last_review="2025-10-15",
            review_cadence_days=21,
            risk_level="medium",
            guardrails=[
                "Quantify impact of each recommendation with baseline vs target metrics.",
                "Highlight measurement methodology and tooling."
            ],
            inputs=[
                "Profiler output",
                "Service SLOs",
                "Recent code changes",
            ],
            outputs=["Profiling summary", "Optimization backlog"],
            prompt=(
                "Summarize profiling output {{profile}}, service SLOs {{slos}}, and recent "
                "changes {{changes}}. Identify top bottlenecks, recommend fixes with estimated "
                "impact, and list verification tests."
            ),
            examples=[
                {
                    "input": {
                        "profile": "CPU hotpath in calculate_totals",
                        "slos": "p95 latency 250ms target",
                        "changes": "Added currency conversion",
                    },
                    "output": (
                        "Brief highlights conversion loop hot spot, suggests memoization, and "
                        "targets p95 drop to 210ms with load test verification."
                    ),
                }
            ],
            tags=["report", "test"],
        ),
        make_entry(
            entry_id="CD-007",
            category="Coding",
            title="Error Log Diagnoser",
            use_case="Classify and prioritize production errors with remediation steps.",
            owner="sre@contoso.com",
            last_review="2025-10-22",
            review_cadence_days=7,
            risk_level="high",
            guardrails=[
                "Group errors by root cause hypothesis, not stack trace similarity alone.",
                "Escalate security or privacy related errors immediately.",
            ],
            inputs=[
                "Error logs sample",
                "Alert history",
                "Recent deployments",
            ],
            outputs=["Error clusters", "Remediation plan"],
            prompt=(
                "Analyze error logs {{logs}}, alert history {{alerts}}, and deployments "
                "{{deployments}}. Cluster issues, hypothesize causes, assign severity, and "
                "recommend remediation actions with owners."
            ),
            examples=[
                {
                    "input": {
                        "logs": "Null ref in billing-worker, timeout in auth",
                        "alerts": "Pager duty incidents 3",
                        "deployments": "Billing patch Oct 29",
                    },
                    "output": (
                        "Clusters billing null refs to recent patch with rollback recommendation "
                        "and flags auth timeout to network team."
                    ),
                }
            ],
            tags=["report", "verification"],
        ),
        make_entry(
            entry_id="CD-008",
            category="Coding",
            title="Infrastructure Change Review",
            use_case="Assess infrastructure as code changes for risk and compliance.",
            owner="infra-review@contoso.com",
            last_review="2025-10-23",
            review_cadence_days=14,
            risk_level="high",
            guardrails=[
                "Highlight resource deletions and privilege escalations.",
                "Verify change window aligns with change management policy.",
            ],
            inputs=[
                "Terraform diff",
                "Change ticket",
                "Policy checklist",
            ],
            outputs=["Review notes", "Policy compliance checklist"],
            prompt=(
                "Review Terraform diff {{terraform_diff}}, change ticket {{ticket}}, and policy "
                "checklist {{policy}}. Identify risky changes, policy gaps, required approvals, "
                "and post-change validation steps."
            ),
            examples=[
                {
                    "input": {
                        "terraform_diff": "Adds public S3 bucket",
                        "ticket": "Change 4521 window Nov 1 02:00 UTC",
                        "policy": "No public buckets without waiver",
                    },
                    "output": (
                        "Notes require waiver for public bucket, adds validation to verify block "
                        "public access after deployment."
                    ),
                }
            ],
            tags=["diff", "verification"],
        ),
        make_entry(
            entry_id="CD-009",
            category="Coding",
            title="Security Scan Interpreter",
            use_case="Turn static analysis results into prioritized remediation guidance.",
            owner="appsec@contoso.com",
            last_review="2025-10-18",
            review_cadence_days=7,
            risk_level="high",
            guardrails=[
                "Map each finding to severity and CWE when provided.",
                "Include proof-of-concept reproduction steps only if already validated.",
            ],
            inputs=[
                "Scan report",
                "Code owners map",
                "Remediation SLAs",
            ],
            outputs=["Remediation backlog", "Owner notifications"],
            prompt=(
                "Interpret security scan report {{report}} with code owners {{owners}} and SLAs "
                "{{slas}}. Group findings by severity, assign owners, note deadlines, and "
                "suggest remediation steps."
            ),
            examples=[
                {
                    "input": {
                        "report": "3 high SQL injection alerts in auth controller",
                        "owners": "Auth squad",
                        "slas": "High severity fix in 7 days",
                    },
                    "output": (
                        "Backlog lists SQLi issues with fix recommendations and assigns auth "
                        "squad lead with 7-day deadline."
                    ),
                }
            ],
            tags=["verification", "report"],
        ),
        make_entry(
            entry_id="CD-010",
            category="Coding",
            title="Code Comment Refiner",
            use_case="Improve code comments for clarity and accuracy without changing logic.",
            owner="dev-excellence@contoso.com",
            last_review="2025-10-12",
            review_cadence_days=30,
            risk_level="low",
            guardrails=[
                "Do not modify executable code segments.",
                "Explain rationale and edge cases in comments, not implementation details.",
            ],
            inputs=[
                "Code snippet",
                "Component purpose",
                "Known caveats",
            ],
            outputs=["Rewritten comments", "Rationale summary"],
            prompt=(
                "Revise code comments for snippet {{snippet}} using component purpose {{purpose}} "
                "and caveats {{caveats}}. Provide updated comments clarifying intent, risks, and "
                "usage without altering code."
            ),
            examples=[
                {
                    "input": {
                        "snippet": "Python retry decorator",
                        "purpose": "Retry transient network calls",
                        "caveats": "Backoff capped at 30s",
                    },
                    "output": (
                        "Comments describe retry jitter, note idempotency requirement, and warn "
                        "about 30-second cap."
                    ),
                }
            ],
            tags=["structured", "diff"],
        ),
        make_entry(
            entry_id="QA-001",
            category="QA",
            title="Regression Test Planner",
            use_case="Plan regression suites for releases with risk-based prioritization.",
            owner="qa-lead@contoso.com",
            last_review="2025-10-19",
            review_cadence_days=14,
            risk_level="medium",
            guardrails=[
                "Identify critical paths and impacted integrations.",
                "Map each test suite to execution owner and timeline.",
            ],
            inputs=[
                "Release scope",
                "Historical defects",
                "Test environment matrix",
            ],
            outputs=["Regression plan", "Execution calendar"],
            prompt=(
                "Create a regression plan for release {{release}} using scope {{scope}}, defect "
                "history {{defects}}, and environment matrix {{matrix}}. Prioritize suites, "
                "assign owners, and list entry/exit criteria."
            ),
            examples=[
                {
                    "input": {
                        "release": "2025.11.0",
                        "scope": "New billing flows, updated notifications",
                        "defects": "High severity in billing last sprint",
                        "matrix": "Web, iOS, Android",
                    },
                    "output": (
                        "Plan prioritizes billing regression on all platforms with owners and "
                        "execution dates."
                    ),
                }
            ],
            tags=["test", "structured"],
        ),
        make_entry(
            entry_id="QA-002",
            category="QA",
            title="Bug Reproduction Script",
            use_case="Document reproducible steps for reported defects with environment details.",
            owner="qa-duty@contoso.com",
            last_review="2025-10-20",
            review_cadence_days=7,
            risk_level="medium",
            guardrails=[
                "Record exact data inputs and environment configuration.",
                "Capture expected vs actual results clearly.",
            ],
            inputs=[
                "Bug report",
                "Logs or screenshots",
                "Environment details",
            ],
            outputs=["Repro steps", "Evidence bundle"],
            prompt=(
                "Based on bug report {{report}}, evidence {{evidence}}, and environment "
                "{{environment}}, document numbered reproduction steps, expected vs actual "
                "outcome, and attach evidence references."
            ),
            examples=[
                {
                    "input": {
                        "report": "Checkout button disabled after coupon applied",
                        "evidence": "Screenshot showing greyed button",
                        "environment": "Chrome 118, staging",
                    },
                    "output": (
                        "Steps list coupon application, note disabled button, and attach "
                        "screenshot link with timestamp."
                    ),
                }
            ],
            tags=["test", "verification"],
        ),
        make_entry(
            entry_id="QA-003",
            category="QA",
            title="Test Summary Reporter",
            use_case="Summarize test execution results with metrics and release readiness.",
            owner="qa-program@contoso.com",
            last_review="2025-10-24",
            review_cadence_days=14,
            risk_level="medium",
            guardrails=[
                "Provide pass/fail counts by suite and severity.",
                "Highlight unresolved critical defects with owner and ETA.",
            ],
            inputs=[
                "Test execution logs",
                "Defect tracker",
                "Release criteria",
            ],
            outputs=["Test summary", "Go/No-go recommendation"],
            prompt=(
                "Summarize test logs {{logs}}, defect tracker {{defects}}, and release "
                "criteria {{criteria}}. Provide suite metrics, readiness assessment, and next "
                "steps."
            ),
            examples=[
                {
                    "input": {
                        "logs": "120 tests passed, 5 failed",
                        "defects": "2 critical open",
                        "criteria": "All critical defects resolved",
                    },
                    "output": (
                        "Report recommends no-go until critical defects fixed, lists owners and "
                        "target dates."
                    ),
                }
            ],
            tags=["report", "test"],
        ),
        make_entry(
            entry_id="QA-004",
            category="QA",
            title="Accessibility Audit Checklist",
            use_case="Evaluate UI changes against WCAG compliance checkpoints.",
            owner="accessibility@contoso.com",
            last_review="2025-10-18",
            review_cadence_days=21,
            risk_level="high",
            guardrails=[
                "Reference WCAG version and success criteria for each finding.",
                "Offer remediation guidance with examples or component references.",
            ],
            inputs=[
                "UI mockups or build",
                "Component inventory",
                "Accessibility checklist",
            ],
            outputs=["Audit checklist", "Remediation guidance"],
            prompt=(
                "Audit UI {{ui}}, components {{components}}, and checklist {{checklist}} for "
                "WCAG compliance. List pass/fail per criterion, severity, and remediation "
                "actions."
            ),
            examples=[
                {
                    "input": {
                        "ui": "New onboarding modal",
                        "components": "Button, input, tooltip",
                        "checklist": "WCAG 2.2 AA",
                    },
                    "output": (
                        "Checklist notes insufficient contrast on buttons, recommends token "
                        "update and retest with screen reader."
                    ),
                }
            ],
            tags=["verification", "report"],
        ),
        make_entry(
            entry_id="QA-005",
            category="QA",
            title="Load Test Findings Digest",
            use_case="Interpret performance test outputs and recommend mitigations.",
            owner="performance-qa@contoso.com",
            last_review="2025-10-23",
            review_cadence_days=14,
            risk_level="high",
            guardrails=[
                "Compare observed metrics to SLO thresholds.",
                "Document environment setup to reproduce results.",
            ],
            inputs=[
                "Load test report",
                "SLO targets",
                "Environment config",
            ],
            outputs=["Findings summary", "Mitigation plan"],
            prompt=(
                "Summarize load test report {{report}} against SLOs {{slos}} with environment "
                "{{environment}}. Highlight bottlenecks, recommend mitigations, and specify "
                "retest criteria."
            ),
            examples=[
                {
                    "input": {
                        "report": "p95 latency 480ms at 2k RPS",
                        "slos": "Target 300ms",
                        "environment": "Prod-like cluster, 5 nodes",
                    },
                    "output": (
                        "Digest identifies DB CPU saturation, suggests index tuning, and "
                        "requires retest after fix."
                    ),
                }
            ],
            tags=["report", "test"],
        ),
        make_entry(
            entry_id="QA-006",
            category="QA",
            title="Release QA Checklist",
            use_case="Ensure release readiness across QA sign-offs and environment checks.",
            owner="release-qa@contoso.com",
            last_review="2025-10-21",
            review_cadence_days=7,
            risk_level="high",
            guardrails=[
                "Confirm sign-off from QA, product, and operations.",
                "Document rollback and contingency steps.",
            ],
            inputs=[
                "Release notes",
                "Sign-off matrix",
                "Rollback plan",
            ],
            outputs=["QA checklist", "Sign-off summary"],
            prompt=(
                "Compile a release QA checklist using notes {{notes}}, sign-off matrix "
                "{{signoffs}}, and rollback plan {{rollback}}. Include verification steps, "
                "owner sign-offs, and contingencies."
            ),
            examples=[
                {
                    "input": {
                        "notes": "Hotfix 2025.10.4",
                        "signoffs": "QA approved, Product pending",
                        "rollback": "Deploy previous container version",
                    },
                    "output": (
                        "Checklist shows pending product sign-off, includes smoke test list and "
                        "rollback command set."
                    ),
                }
            ],
            tags=["structured", "test"],
        ),
        make_entry(
            entry_id="QA-007",
            category="QA",
            title="Defect Triage Moderator",
            use_case="Facilitate defect triage sessions with prioritization outcomes.",
            owner="qa-ops@contoso.com",
            last_review="2025-10-17",
            review_cadence_days=7,
            risk_level="medium",
            guardrails=[
                "Escalate any blocker defects to release manager immediately.",
                "Assign follow-up actions with explicit owners and due dates.",
            ],
            inputs=[
                "Defect list",
                "Severity matrix",
                "Release timeline",
            ],
            outputs=["Triage summary", "Action assignments"],
            prompt=(
                "Moderate defect triage using list {{defects}}, severity matrix {{matrix}}, and "
                "timeline {{timeline}}. Categorize defects, set priorities, and assign "
                "resolution owners with deadlines."
            ),
            examples=[
                {
                    "input": {
                        "defects": "15 open bugs, 3 critical",
                        "matrix": "Critical blocks release",
                        "timeline": "Release freeze Nov 3",
                    },
                    "output": (
                        "Summary escalates two blockers, assigns owners, and schedules retest "
                        "dates."
                    ),
                }
            ],
            tags=["meeting", "test"],
        ),
        make_entry(
            entry_id="QA-008",
            category="QA",
            title="Traceability Matrix Builder",
            use_case="Link requirements to test cases and defects for audit readiness.",
            owner="compliance-qa@contoso.com",
            last_review="2025-10-16",
            review_cadence_days=30,
            risk_level="high",
            guardrails=[
                "Ensure every requirement maps to at least one test case.",
                "Highlight orphaned tests or requirements for remediation.",
            ],
            inputs=[
                "Requirement list",
                "Test catalog",
                "Defect mapping",
            ],
            outputs=["Traceability matrix", "Gap report"],
            prompt=(
                "Generate a traceability matrix using requirements {{requirements}}, tests "
                "{{tests}}, and defects {{defects}}. Show coverage links, identify gaps, and "
                "recommend remediation."
            ),
            examples=[
                {
                    "input": {
                        "requirements": "REQ-101 login, REQ-102 MFA",
                        "tests": "TC-10 login happy path, TC-22 MFA challenge",
                        "defects": "BUG-55 MFA resend",
                    },
                    "output": (
                        "Matrix maps requirements to tests, flags REQ-102 missing negative case, "
                        "and links BUG-55."
                    ),
                }
            ],
            tags=["table", "verification"],
        ),
        make_entry(
            entry_id="QA-009",
            category="QA",
            title="UAT Feedback Synthesizer",
            use_case="Summarize user acceptance testing feedback with prioritized fixes.",
            owner="uat-coordinator@contoso.com",
            last_review="2025-10-18",
            review_cadence_days=14,
            risk_level="medium",
            guardrails=[
                "Separate critical blockers from usability suggestions.",
                "Capture user quotes anonymously with role context.",
            ],
            inputs=[
                "UAT session notes",
                "Issue tracker",
                "Participant roster",
            ],
            outputs=["Feedback summary", "Fix backlog"],
            prompt=(
                "Synthesize UAT notes {{notes}}, issue tracker {{issues}}, and roster {{roster}} "
                "into blockers, major findings, minor suggestions, and recommended fixes with "
                "owners."
            ),
            examples=[
                {
                    "input": {
                        "notes": "Checkout flow confusing, export button hidden",
                        "issues": "BUG-98 critical, BUG-102 minor",
                        "roster": "Finance analyst, operations lead",
                    },
                    "output": (
                        "Summary highlights checkout blocker with quote from finance analyst and "
                        "assigns fix to UX owner."
                    ),
                }
            ],
            tags=["report", "synthesis"],
        ),
        make_entry(
            entry_id="QA-010",
            category="QA",
            title="QA Risk Register",
            use_case="Maintain QA-specific risk log with mitigation tracking.",
            owner="qa-risk@contoso.com",
            last_review="2025-10-25",
            review_cadence_days=14,
            risk_level="high",
            guardrails=[
                "Assign each risk a probability, impact, and owner.",
                "Escalate risks breaching threshold to program steering committee.",
            ],
            inputs=[
                "Risk brainstorm",
                "Historical incidents",
                "Mitigation backlog",
            ],
            outputs=["Risk register", "Mitigation tracker"],
            prompt=(
                "Create a QA risk register using brainstorm {{brainstorm}}, incidents {{incidents}}, "
                "and mitigation backlog {{mitigations}}. Provide probability, impact, owner, "
                "and mitigation status for each risk."
            ),
            examples=[
                {
                    "input": {
                        "brainstorm": "Automation flakiness, environment drift",
                        "incidents": "Last release failed due to flaky tests",
                        "mitigations": "Stabilize smoke suite",
                    },
                    "output": (
                        "Register sets high probability for flakiness, owner QA automation lead, "
                        "and mitigation due Nov 5."
                    ),
                }
            ],
            tags=["structured", "report"],
        ),
    ]

    return entries


def write_catalog(entries: List[Dict[str, Any]]) -> None:
    CATALOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    with CATALOG_PATH.open("w", encoding="utf-8") as handle:
        json.dump(entries, handle, indent=2, ensure_ascii=False)
        handle.write("\n")


def main() -> None:
    catalog = build_catalog()
    write_catalog(catalog)
    print(f"Wrote {len(catalog)} entries to {CATALOG_PATH}")


if __name__ == "__main__":
    main()
