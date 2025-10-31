# Implementation Table Templates

Use these tables as the deterministic contract when planning or reviewing AI generated changes. Copy the Markdown exactly so downstream automation can parse it.

## File level table
| Filename (relative path) | Description | Methods/Functions (signature list) | Imports | Exports |
|--------------------------|-------------|-------------------------------------|---------|---------|
| src/utils/slugify.js     | Normalize strings to URL slugs | slugify(input: string): string | - | slugify |
| src/http/client.ts       | Typed HTTP wrapper | get<T>(url: string): Promise<T>; post<T>(url: string, body: any): Promise<T> | axios | get, post |

## Method cross reference table
| File | Method/Function signature | Where it is called (filepath:method) | Calls (filepath:method) | Notes |
|------|---------------------------|--------------------------------------|-------------------------|-------|
| src/utils/slugify.js | slugify(input: string): string | src/pages/blog.tsx:renderPost | - | Accepts ASCII; extend for diacritics |
| src/http/client.ts   | get<T>(url: string) | src/services/user.ts:getUser | axios.get | 5s timeout |

## Method generation request table
| Filename | Method signature | Purpose / Description | Acceptance criteria | Notes |
|----------|------------------|-----------------------|---------------------|-------|
| services/reporting.py | generate_kpi_summary(accounts: list[Account]) -> dict[str, Any] | Aggregate weekly KPI metrics for dashboard export | Returns dict with keys total_revenue, churn_rate, growth_delta; passes unit tests in tests/reporting/test_kpi_summary.py | Keep API stable for CLI consumers |
| services/reporting.py | format_kpi_email(payload: dict[str, Any]) -> str | Produce HTML email body from KPI payload | HTML validates, includes CTA link, <= 20% inline CSS | Compose with existing templating helpers |

## File generation request table
| Filename | Description | Required exports | Acceptance tests | Delivery notes |
|----------|-------------|------------------|------------------|----------------|
| ui/widgets/status-banner.tsx | Shared status banner component with success, warning, error states | StatusBanner, StatusBannerProps | `npm test -- Banner` passes and snapshot updated | Mirror design tokens from tokens/status.json |
| api/routes/export.ts | Express router for /exports endpoints with rate limiting | router | `npm run test:integration -- exports` passes | Use existing limiter middleware from api/middleware/limiter.ts |

## Fix backlog table (one row per follow-up)
| File | Function / Area | Issue discovered | Fix plan | Acceptance outcome |
|------|-----------------|------------------|----------|--------------------|
| src/http/client.ts | get<T> | Retries missing for 429 responses | Add exponential backoff with max 3 retries | Integration tests cover 429 handling without regressions |
| src/utils/slugify.js | slugify | Fails for accented characters | Add transliteration step via `diacritics` helper | Unit tests prove "café" -> "cafe" |

## Sprint planning table (1 row per scoped item)
| Item | Owner | Scope summary | Dependencies | Definition of done | Target demo |
|------|-------|---------------|--------------|--------------------|-------------|
| Build status banner component | Priya | Implement reusable status banner + stories | Design tokens finalized | Stories reviewed, unit tests passing, accessibility checks logged | Sprint review week 6 |
| Export API hardening | Luis | Add rate limiting, audit logging, and smoke tests | Ops provision new log index | Load tests green, logs visible in Kibana, runbook updated | Sprint review week 6 |

### Workflow notes
- Keep headers identical.
- Expand or replace the sample rows with project specific data.
- If a field is not applicable for a row, use "-" so parsing stays deterministic.
- Send the assistant one table row at a time when asking for updates or diffs.
- Update the tables whenever functions move, rename, or change parameters.
