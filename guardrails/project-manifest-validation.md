# Project manifest validation example

Sample command capturing a successful schema check:

```
npx ajv validate -s guardrails/project-manifest-schema.json -d guardrails/project-manifest-sample.json
```

Recorded output:

```
guardrails/project-manifest-sample.json valid
```

If the manifest fails, rerun the workflow and supply the AJV error message to the assistant.
