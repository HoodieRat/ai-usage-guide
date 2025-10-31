# Output contracts

- Return the implementation tables with the exact column headers shown in guardrails/implementation-tables.md.
- Emit JSON that validates against guardrails/project-manifest-schema.json. If JSON is impossible, provide the CSV fallback with matching headers.
- Every generated source file must start with the filepath comment (`<!-- filepath: relative/path.ext -->`) and be wrapped with `//START` and `//DONE` markers.
- Avoid external services; use local stubs with clear TODO comments when integration points are required.
