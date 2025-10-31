import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GUIDES_DIR = ROOT / "guides"
OUTPUT_FILE = ROOT / "data" / "search.json"

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


def build_index() -> list[dict]:
    records: list[dict] = []
    for html_file in sorted(GUIDES_DIR.glob("*.html")):
        contents = html_file.read_text(encoding="utf-8")
        records.append({
            "title": extract_title(contents),
            "url": f"guides/{html_file.name}",
            "abstract": extract_description(contents),
            "sections": extract_sections(contents),
        })
    return records


def main() -> None:
    index = build_index()
    OUTPUT_FILE.write_text(json.dumps(index, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"search.json rebuilt with {len(index)} entries")


if __name__ == "__main__":
    main()
