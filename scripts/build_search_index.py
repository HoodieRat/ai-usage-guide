import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GUIDES_DIR = ROOT / "guides"
OUTPUT_FILE = ROOT / "data" / "search.json"
TOC_FILE = ROOT / "data" / "toc.json"
PROMPT_CATALOG = ROOT / "data" / "prompt-library" / "catalog.json"
TEMPLATE_CATALOG = ROOT / "data" / "templates" / "library.json"

H2_RE = re.compile(r"<h2[^>]*>([\s\S]*?)</h2>", re.IGNORECASE)
TITLE_RE = re.compile(r"<title>([^<]*)</title>", re.IGNORECASE)
DESC_RE = re.compile(r"<meta\s+name=\"description\"\s+content=\"([^\"]*)\"", re.IGNORECASE)
TAG_RE = re.compile(r"<[^>]+>")


def clean_text(raw: str) -> str:
    text = TAG_RE.sub(" ", raw)
    text = (text
            .replace("&nbsp;", " ")
            .replace("&amp;", "&")
            .replace("&rarr;", "→"))
    return " ".join(text.split())


def extract_title(contents: str) -> str:
    match = TITLE_RE.search(contents)
    if not match:
        return "Untitled"
    raw = match.group(1).strip()
    if "|" in raw:
        raw = raw.split("|", 1)[0].strip()
    return raw


def extract_description(contents: str) -> str:
    match = DESC_RE.search(contents)
    return match.group(1).strip() if match else ""


def extract_sections(contents: str, limit: int = 4) -> list[str]:
    sections: list[str] = []
    for match in H2_RE.finditer(contents):
        candidate = clean_text(match.group(1))
        if candidate:
            sections.append(candidate)
        if len(sections) >= limit:
            break
    return sections


def load_toc_map() -> dict[str, str]:
    if not TOC_FILE.exists():
        return {}
    toc_data = json.loads(TOC_FILE.read_text(encoding="utf-8"))
    mapping: dict[str, str] = {}
    for unit in toc_data:
        unit_title = unit.get("title", "")
        for item in unit.get("items", []):
            mapping[item.get("url", "")] = unit_title
    return mapping


def build_guide_records(toc_map: dict[str, str]) -> list[dict]:
    records: list[dict] = []
    for html_file in sorted(GUIDES_DIR.glob("*.html")):
        contents = html_file.read_text(encoding="utf-8")
        url = f"guides/{html_file.name}"
        title = extract_title(contents)
        abstract = extract_description(contents)
        sections = extract_sections(contents)
        unit = toc_map.get(url, "Guide")
        meta = f"Guide | {unit}" if unit else "Guide"

        records.append({
            "type": "guide",
            "title": title,
            "url": url,
            "unit": unit,
            "meta": meta,
            "snippet": abstract or " ".join(sections[:2]),
            "tags": sections,
        })
    return records


def build_prompt_records() -> list[dict]:
    if not PROMPT_CATALOG.exists():
        return []
    entries = json.loads(PROMPT_CATALOG.read_text(encoding="utf-8"))
    records: list[dict] = []
    for entry in entries:
        tags = entry.get("tags", [])[:]
        tags.extend([entry.get("category", ""), entry.get("difficulty", ""), entry.get("risk_level", "")])
        meta = "Prompt | {category} | {difficulty}".format(
            category=entry.get("category", "Uncategorised"),
            difficulty=entry.get("difficulty", ""),
        ).strip(" |")
        records.append({
            "type": "prompt",
            "title": f"{entry['id']} - {entry['title']}",
            "url": f"guides/84_prompt-library.html#{entry['id']}",
            "unit": entry.get("category", "Prompt"),
            "meta": meta,
            "snippet": entry.get("use_case", ""),
            "tags": [tag for tag in tags if tag],
            "category": entry.get("category"),
            "difficulty": entry.get("difficulty"),
        })
    return records


def build_template_records() -> list[dict]:
    if not TEMPLATE_CATALOG.exists():
        return []
    entries = json.loads(TEMPLATE_CATALOG.read_text(encoding="utf-8"))
    records: list[dict] = []
    for entry in entries:
        tags = entry.get("tags", [])[:]
        tags.extend([entry.get("category", ""), entry.get("format", ""), entry.get("difficulty", "")])
        meta = "Template | {category} | {format}".format(
            category=entry.get("category", "Uncategorised"),
            format=entry.get("format", ""),
        ).strip(" |")
        records.append({
            "type": "template",
            "title": f"{entry['id']} - {entry['title']}",
            "url": f"guides/80_templates-library.html#{entry['id']}",
            "unit": entry.get("category", "Template"),
            "meta": meta,
            "snippet": entry.get("summary", ""),
            "tags": [tag for tag in tags if tag],
            "category": entry.get("category"),
            "difficulty": entry.get("difficulty"),
            "format": entry.get("format"),
        })
    return records


def main() -> None:
    toc_map = load_toc_map()
    guide_records = build_guide_records(toc_map)
    prompt_records = build_prompt_records()
    template_records = build_template_records()

    index = guide_records + prompt_records + template_records
    OUTPUT_FILE.write_text(json.dumps(index, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(
        "search.json rebuilt with "
        f"{len(guide_records)} guides, {len(prompt_records)} prompts, "
        f"{len(template_records)} templates"
    )


if __name__ == "__main__":
    main()
