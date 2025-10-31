# Validation guardrails

- Validate every JSON manifest with `npx ajv validate -s guardrails/project-manifest-schema.json -d manifest.json` (or use the local validator script). Re-prompt with the error list until it passes.
- Reject outputs that miss required table columns or include prose inside the JSON block.
- Block merges when tests fail or required files from the implementation table are missing.
