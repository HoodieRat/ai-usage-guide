import json
import unittest
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PROMPT_CATALOG = ROOT / "data" / "prompt-library" / "catalog.json"
TEMPLATE_CATALOG = ROOT / "data" / "templates" / "library.json"
SEARCH_INDEX = ROOT / "data" / "search.json"


class ResourceLibraryTests(unittest.TestCase):
    maxDiff = None

    @staticmethod
    def _load_json(path: Path):
        return json.loads(path.read_text(encoding="utf-8"))

    def test_prompt_catalog_contract(self):
        entries = self._load_json(PROMPT_CATALOG)
        self.assertGreaterEqual(len(entries), 75, "Prompt catalog should contain at least 75 entries")

        ids = [entry["id"] for entry in entries]
        self.assertEqual(len(ids), len(set(ids)), "Prompt IDs must be unique")

        required_fields = {
            "id",
            "title",
            "category",
            "use_case",
            "owner",
            "last_review",
            "guardrails",
            "inputs",
            "outputs",
            "prompt",
            "difficulty",
        }
        allowed_risk = {"low", "medium", "high"}
        allowed_difficulty = {"Beginner", "Intermediate", "Advanced"}
        required_categories = {"Planning", "Research", "Communication", "Coding", "QA"}

        categories_present = set()
        difficulties_present = set()

        for entry in entries:
            with self.subTest(entry=entry["id"]):
                self.assertTrue(required_fields.issubset(entry.keys()), f"Missing fields in {entry['id']}")
                self.assertRegex(entry["id"], r"^[A-Z]{2}-\d{3}$")
                self.assertTrue(entry["title"].strip())
                self.assertTrue(entry["category"].strip())
                self.assertIn(entry["difficulty"], allowed_difficulty)
                self.assertIn(entry.get("risk_level", "medium"), allowed_risk)
                self.assertIsInstance(entry["guardrails"], list)
                self.assertGreater(len(entry["guardrails"]), 0, "Guardrails required")
                self.assertIsInstance(entry["inputs"], list)
                self.assertIsInstance(entry["outputs"], list)
                self.assertGreater(len(entry["prompt"].strip()), 40, "Prompt body looks too short")
                datetime.strptime(entry["last_review"], "%Y-%m-%d")
                self.assertGreater(entry.get("review_cadence_days", 0), 0)

                categories_present.add(entry["category"])
                difficulties_present.add(entry["difficulty"])

        self.assertTrue(required_categories.issubset(categories_present))
        self.assertEqual(difficulties_present, allowed_difficulty)

    def test_template_catalog_contract(self):
        entries = self._load_json(TEMPLATE_CATALOG)
        self.assertGreaterEqual(len(entries), 30, "Template catalog should contain at least 30 entries")

        ids = [entry["id"] for entry in entries]
        self.assertEqual(len(ids), len(set(ids)), "Template IDs must be unique")

        required_fields = {
            "id",
            "category",
            "title",
            "summary",
            "difficulty",
            "format",
            "use_case",
            "owner",
            "last_review",
            "review_cadence_days",
            "guardrails",
            "deliverables",
            "fields",
            "full_template",
            "tags",
        }

        expected_categories = {
            "Strategy & Planning",
            "Customer Experience",
            "Operations",
            "Enablement",
            "Quality & Risk",
            "Integrations",
        }

        difficulties_present = set()

        for entry in entries:
            with self.subTest(entry=entry["id"]):
                self.assertTrue(required_fields.issubset(entry.keys()), f"Missing fields in {entry['id']}")
                self.assertRegex(entry["id"], r"^TL-\d{3}$")
                self.assertTrue(entry["title"].strip())
                self.assertTrue(entry["summary"].strip())
                self.assertTrue(entry["use_case"].strip())
                self.assertIn(entry["difficulty"], {"Beginner", "Intermediate", "Advanced"})
                self.assertTrue(entry["format"].strip())
                self.assertGreater(entry.get("review_cadence_days", 0), 0)
                datetime.strptime(entry["last_review"], "%Y-%m-%d")

                self.assertIsInstance(entry["guardrails"], list)
                self.assertGreater(len(entry["guardrails"]), 0)
                self.assertIsInstance(entry["deliverables"], list)
                self.assertGreater(len(entry["deliverables"]), 0)

                self.assertIsInstance(entry["fields"], list)
                self.assertGreater(len(entry["fields"]), 0)
                for field in entry["fields"]:
                    self.assertIn("label", field)
                    self.assertIn("placeholder", field)
                    self.assertTrue(field["label"].strip())

                self.assertIsInstance(entry["tags"], list)
                self.assertGreater(len(entry["tags"]), 0)
                self.assertGreater(len(entry["full_template"].strip()), 40)

                difficulties_present.add(entry["difficulty"])

        categories_present = {entry["category"] for entry in entries}
        self.assertTrue(expected_categories.issubset(categories_present))
        self.assertEqual(difficulties_present, {"Beginner", "Intermediate", "Advanced"})

    def test_search_index_includes_resource_entries(self):
        index = self._load_json(SEARCH_INDEX)
        self.assertGreater(len(index), 0, "Search index should not be empty")

        types = [item.get("type", "guide") for item in index]
        self.assertIn("guide", types, "Guide entries missing from search index")
        self.assertIn("prompt", types, "Prompt entries missing from search index")
        self.assertIn("template", types, "Template entries missing from search index")

        prompt_links = [item["url"] for item in index if item.get("type") == "prompt"]
        template_links = [item["url"] for item in index if item.get("type") == "template"]

        self.assertTrue(any("#PL-" in url for url in prompt_links), "Prompt links should deep-link to prompt IDs")
        self.assertTrue(any("#TL-" in url for url in template_links), "Template links should deep-link to template IDs")


if __name__ == "__main__":
    unittest.main()
