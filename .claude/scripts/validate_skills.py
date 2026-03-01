#!/usr/bin/env python3

from pathlib import Path
import json
import re

ROOT = Path(".claude/skills")

def parse_frontmatter(text: str):
    if not text.startswith("---"):
        return {}
    parts = text.split("---", 2)
    if len(parts) < 3:
        return {}
    fm = parts[1]
    data = {}
    for line in fm.splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            data[k.strip()] = v.strip().strip('"').strip("'")
    return data

def main():
    results = {
        "ok": True,
        "skills": [],
        "problems": []
    }

    if not ROOT.exists():
        results["ok"] = False
        results["problems"].append(".claude/skills directory does not exist")
        print(json.dumps(results, indent=2))
        return

    seen_names = {}

    for skill_dir in sorted([p for p in ROOT.iterdir() if p.is_dir()]):
        skill_file = skill_dir / "SKILL.md"
        item = {
            "dir": skill_dir.name,
            "has_skill_md": skill_file.exists(),
            "frontmatter": False,
            "name": None,
            "description": None,
            "issues": []
        }

        if not skill_file.exists():
            item["issues"].append("Missing SKILL.md")
            results["ok"] = False
            results["problems"].append(f"{skill_dir.name}: Missing SKILL.md")
            results["skills"].append(item)
            continue

        text = skill_file.read_text(encoding="utf-8", errors="ignore").strip()

        if not text:
            item["issues"].append("Empty SKILL.md")
            results["ok"] = False
            results["problems"].append(f"{skill_dir.name}: Empty SKILL.md")
            results["skills"].append(item)
            continue

        fm = parse_frontmatter(text)
        if fm:
            item["frontmatter"] = True
            item["name"] = fm.get("name")
            item["description"] = fm.get("description")

            if not item["name"]:
                item["issues"].append("Missing frontmatter name")
                results["ok"] = False
                results["problems"].append(f"{skill_dir.name}: Missing frontmatter name")

            if not item["description"]:
                item["issues"].append("Missing frontmatter description")
                results["ok"] = False
                results["problems"].append(f"{skill_dir.name}: Missing frontmatter description")
            elif len(item["description"]) < 20:
                item["issues"].append("Description too short")
                results["ok"] = False
                results["problems"].append(f"{skill_dir.name}: Description too short")

            if item["name"]:
                if item["name"] in seen_names:
                    item["issues"].append(f"Duplicate skill name with {seen_names[item['name']]}")
                    results["ok"] = False
                    results["problems"].append(
                        f"{skill_dir.name}: Duplicate skill name '{item['name']}'"
                    )
                else:
                    seen_names[item["name"]] = skill_dir.name
        else:
            item["issues"].append("Missing or invalid frontmatter")
            results["ok"] = False
            results["problems"].append(f"{skill_dir.name}: Missing or invalid frontmatter")

        results["skills"].append(item)

    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    main()
