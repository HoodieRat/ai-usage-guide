"""Automate the Idea -> Project Structure workflow using undetected-chromedriver 1.1.3.

The script drives ChatGPT (web) to:
1. Post the Idea -> Structure prompt with templates and schema.
2. Save the response and validate the JSON manifest against guardrails/project-manifest-schema.json.
3. Re-prompt with validation errors until the JSON passes.
4. Post the follow-up prompt that asks for complete source files.
5. Save the generated files for follow-up review.

Prerequisites:
- pip install undetected-chromedriver==1.1.3 selenium==4.24.0 jsonschema==4.23.0
- Matching ChromeDriver/Chrome version installed on the machine.
- Close any existing Chrome session or supply a dedicated profile directory.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

import undetected_chromedriver as uc
from jsonschema import Draft7Validator
from selenium.common.exceptions import TimeoutException
from selenium.webdriver import Chrome
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

PROMPT_INPUT_SELECTOR = "textarea[data-testid='prompt-textarea']"
MESSAGE_SELECTOR = "div[data-message-author-role='assistant']"
CODEBLOCK_SELECTOR = "pre code"
DEFAULT_WAIT_SECONDS = 5.0

STRUCTURE_PROMPT = """Use my templates below to generate a project plan from the IDEA.

Return exactly:
1) File-level Implementation Table (columns: Filename, Description, Methods/Functions, Imports, Exports).
2) Method Cross-Reference Table (columns: File, Method/Function signature, Where it is called (filepath:method), Calls (filepath:method), Notes).
3) A JSON project manifest that validates against my schema (no prose - JSON only).

Rules:
- Use relative paths.
- Show realistic function signatures.
- Keep imports/exports explicit.
- Do not generate any source code in this step.

IDEA:
{idea}

TEMPLATES:
{tables}

SCHEMA:
{schema}

GUARDRAILS:
{contracts}
{validation}

CONTEXT PACK:
{context}

TODO:
{todo}
"""

FILES_PROMPT = """Now generate complete source files for every row in the File-level Implementation Table.
For each file:
- Put the relative path as the first line: <!-- filepath: relative/path.ext -->
- Wrap with //START and //DONE markers.
- No extra commentary outside the code block.
"""

TABLES_TEMPLATE_PATH = Path("guardrails/implementation-tables.md")
SCHEMA_PATH = Path("guardrails/project-manifest-schema.json")
OUTPUT_CONTRACTS_PATH = Path("guardrails/output-contracts.md")
VALIDATION_PATH = Path("guardrails/validation.md")
TODO_PATH = Path("TODO.md")
FILE_TREE_PATH = Path("context/file-tree.txt")
CALL_GRAPH_PATH = Path("context/call-graph.json")
DEAD_CODE_PATH = Path("context/dead-code.json")
SIGNATURES_PATH = Path("context/signatures.csv")


@dataclass
class WorkflowConfig:
    idea_text: str
    output_dir: Path
    profile_dir: Path | None
    schema_text: str
    tables_text: str
    contracts_text: str
    validation_text: str
    todo_text: str
    context_text: str


def load_file_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except FileNotFoundError as exc:
        raise SystemExit(f"Required file missing: {path}") from exc


def extract_ai_todo_section(todo_text: str) -> str:
    match = re.search(r"## AI coding TODO list.*?(?=\n## |\Z)", todo_text, re.DOTALL)
    if not match:
        raise SystemExit("Could not locate 'AI coding TODO list' section in TODO.md")
    return match.group(0).strip()


def build_driver(profile_dir: Path | None) -> Chrome:
    chrome_options = Options()
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    if profile_dir:
        chrome_options.add_argument(f"--user-data-dir={profile_dir}")
    return uc.Chrome(options=chrome_options, version_main=uc.chromedriver.VERSION_MAP["stable"])  # type: ignore[arg-type]


def wait_for_response(driver: Chrome, previous_count: int) -> None:
    deadline = time.time() + 120
    while time.time() < deadline:
        messages = driver.find_elements(By.CSS_SELECTOR, MESSAGE_SELECTOR)
        if len(messages) > previous_count:
            return
        time.sleep(DEFAULT_WAIT_SECONDS)
    raise TimeoutException("Timed out waiting for ChatGPT response")


def send_prompt(driver: Chrome, prompt: str) -> str:
    textarea = driver.find_element(By.CSS_SELECTOR, PROMPT_INPUT_SELECTOR)
    textarea.send_keys(prompt)
    textarea.send_keys(Keys.ENTER)
    previous_count = len(driver.find_elements(By.CSS_SELECTOR, MESSAGE_SELECTOR))
    wait_for_response(driver, previous_count)
    messages = driver.find_elements(By.CSS_SELECTOR, MESSAGE_SELECTOR)
    return messages[-1].get_attribute("innerText")


def extract_json_block(markdown: str) -> str | None:
    match = re.search(r"```json\s*(\{.*?\})\s*```", markdown, re.DOTALL)
    if match:
        return match.group(1)
    try:
        json.loads(markdown)
        return markdown
    except json.JSONDecodeError:
        return None


def save_text(path: Path, content: str) -> None:
    path.write_text(content, encoding="utf-8")


def validate_manifest(schema_text: str, manifest_text: str) -> Iterable[str]:
    schema = json.loads(schema_text)
    manifest = json.loads(manifest_text)
    validator = Draft7Validator(schema)
    for error in validator.iter_errors(manifest):
        yield error.message


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description="Automate ChatGPT Idea -> Project Structure run")
    parser.add_argument("--idea", help="Idea text to seed the workflow")
    parser.add_argument("--idea-file", type=Path, help="Path to a file containing the idea text")
    parser.add_argument("--output-dir", type=Path, default=Path("artifacts/chatgpt-workflow"))
    parser.add_argument("--profile-dir", type=Path, help="Chrome profile directory created for automation")
    parser.add_argument("--schema", type=Path, default=SCHEMA_PATH)
    parser.add_argument("--tables", type=Path, default=TABLES_TEMPLATE_PATH)
    parser.add_argument("--contracts", type=Path, default=OUTPUT_CONTRACTS_PATH)
    parser.add_argument("--validation", type=Path, default=VALIDATION_PATH)
    parser.add_argument("--todo", type=Path, default=TODO_PATH)
    parser.add_argument("--context-tree", type=Path, default=FILE_TREE_PATH)
    parser.add_argument("--context-call-graph", type=Path, default=CALL_GRAPH_PATH)
    parser.add_argument("--context-dead-code", type=Path, default=DEAD_CODE_PATH)
    parser.add_argument("--context-signatures", type=Path, default=SIGNATURES_PATH)
    parser.add_argument("--site", default="https://chat.openai.com/", help="ChatGPT base URL")
    args = parser.parse_args(argv)

    if not args.idea and not args.idea_file:
        parser.error("Provide --idea or --idea-file")

    idea_text = args.idea or load_file_text(args.idea_file)
    schema_text = load_file_text(args.schema)
    tables_text = load_file_text(args.tables)
    contracts_text = load_file_text(args.contracts)
    validation_text = load_file_text(args.validation)
    todo_text = extract_ai_todo_section(load_file_text(args.todo))
    context_text = (
        "FILE TREE:\n" + load_file_text(args.context_tree).strip() +
        "\n\nCALL GRAPH:\n" + load_file_text(args.context_call_graph).strip() +
        "\n\nDEAD CODE:\n" + load_file_text(args.context_dead_code).strip() +
        "\n\nSIGNATURES:\n" + load_file_text(args.context_signatures).strip()
    )

    config = WorkflowConfig(
        idea_text=idea_text.strip(),
        output_dir=args.output_dir,
        profile_dir=args.profile_dir,
        schema_text=schema_text,
    tables_text=tables_text,
    contracts_text=contracts_text,
    validation_text=validation_text,
    todo_text=todo_text,
    context_text=context_text,
    )

    config.output_dir.mkdir(parents=True, exist_ok=True)

    driver = build_driver(config.profile_dir)
    driver.get(args.site)

    try:
        time.sleep(5)
        first_response = send_prompt(
            driver,
            STRUCTURE_PROMPT.format(
                idea=config.idea_text,
                tables=config.tables_text,
                schema=config.schema_text,
                contracts=config.contracts_text,
                validation=config.validation_text,
                context=config.context_text,
                todo=config.todo_text,
            ),
        )
        save_text(config.output_dir / "01_structure.md", first_response)

        json_block = extract_json_block(first_response)
        if not json_block:
            raise SystemExit("ChatGPT did not return a JSON manifest.")

        errors = list(validate_manifest(config.schema_text, json_block))
        attempt = 1
        while errors:
            error_text = "; ".join(errors)
            retry_prompt = (
                "The JSON manifest failed validation with these errors: "
                f"{error_text}. Please regenerate all three outputs and fix the manifest."
            )
            first_response = send_prompt(driver, retry_prompt)
            save_text(config.output_dir / f"01_structure_retry_{attempt}.md", first_response)
            json_block = extract_json_block(first_response)
            if not json_block:
                errors = ["JSON manifest missing from retry response"]
                attempt += 1
                continue
            errors = list(validate_manifest(config.schema_text, json_block))
            attempt += 1

        save_text(config.output_dir / "manifest.json", json_block)

        second_response = send_prompt(driver, FILES_PROMPT)
        save_text(config.output_dir / "02_source_files.md", second_response)
    finally:
        driver.quit()

    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
