# Project manifest contract

Use a JSON manifest to capture planned files and functions before generating code. The assistant must produce a manifest that validates against `guardrails/project-manifest-schema.json`.

## Required shape
```json
{
  "project": {
    "name": "MyProject",
    "files": [
      {
        "path": "src/utils/slugify.js",
        "description": "Normalize strings to URL slugs",
        "imports": [],
        "exports": ["slugify"],
        "functions": [
          {
            "name": "slugify",
            "signature": "slugify(input: string): string",
            "returns": "string",
            "calls": [],
            "called_from": ["src/pages/blog.tsx:renderPost"],
            "tests": ["tests/slugify.test.js::slugifies basic ASCII"]
          }
        ]
      }
    ]
  }
}
```

## CSV fallback
When JSON is not possible, capture the same data with headers:
```
path,description,function_name,signature,called_from,calls,tests,imports,exports
src/utils/slugify.js,"Normalize strings to URL slugs","slugify","slugify(input: string): string","src/pages/blog.tsx:renderPost","","tests/slugify.test.js::slugifies basic ASCII","","slugify"
```

## Validation
See `project-manifest-validation.md` for a walkthrough that records a sample schema check using `npx ajv`.
