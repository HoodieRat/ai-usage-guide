# ChatGPT automation workflow

Use `scripts/chatgpt_workflow_runner.py` to run the Idea -> Project Structure workflow end to end.

## Install requirements
```
pip install undetected-chromedriver==1.1.3 selenium==4.24.0 jsonschema==4.23.0
```
Match the ChromeDriver version bundled with your Chrome install. Close any active Chrome windows or supply a dedicated `--profile-dir` so sessions do not conflict.

## Run the script
```
python scripts/chatgpt_workflow_runner.py \
  --idea-file inputs/idea.txt \
  --output-dir artifacts/chatgpt-run \
  --profile-dir C:/work/chatgpt-profile
```

The script posts the structure prompt, attaches output contracts, validation rules, the AI TODO checklist, and the context pack, validates the returned JSON against `guardrails/project-manifest-schema.json`, retries on validation errors, then posts the generate-files prompt. Responses are saved in the output directory:
- `01_structure*.md`: raw ChatGPT output with tables and manifest.
- `manifest.json`: validated manifest.
- `02_source_files.md`: generated sources with filepath markers.

## Validation loop
If validation fails, the script injects the AJV style error message back into ChatGPT and tries again until the schema passes. After completion, review the saved Markdown and code blocks before committing any changes.
