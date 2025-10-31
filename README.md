# Everyday AI Guide

Everyday AI Guide is a fully offline, production-ready handbook for teams integrating ChatGPT into daily work. The site is a static bundle of HTML, CSS, and JavaScript that you can open locally or host on any static provider (GitHub Pages, Netlify, S3, etc.).

## Highlights

- **Structured curriculum** grouped into Foundations, Context & Memory, Files & Knowledge, Research, Agentic Workflows, Collaboration, and the Resource Library.
- **Consistent page template** featuring prerequisites, planner/actor/reviewer chains, output contracts, logging specs, metrics, troubleshooting, and acceptance criteria.
- **Offline-first experience** – all navigation, search, and syntax highlighting load from local assets.
- **Accessible design system** with light/dark themes, focus-visible states, and keyboard friendly navigation.

## Getting started

1. Download or clone the repository.
2. Open `index.html` in your browser. No build or runtime dependencies are required.
3. Use the left navigation to explore guides. The search box provides instant lookup powered by `data/search.json`.

### Optional local server

For nicer URLs you can serve the folder with any static server, for example in PowerShell:

```powershell
cd path\to\everyday-ai-guide
python -m http.server 8000
```

Then browse to [http://localhost:8000](http://localhost:8000).

## Project layout

```
everyday-ai-guide/
├── index.html            # Landing page and entry point
├── guides/               # Individual guide pages
├── css/                  # Global styles and Prism theme
├── js/                   # Navigation, theme toggle, search, syntax helper
├── data/                 # Navigation tree and search index
└── assets/               # Logo, icons, favicon
```

## Customisation

- Update `data/toc.json` to change sidebar groupings or add new guides.
- Extend `data/search.json` to index fresh pages (title, abstract, section keywords).
- Adjust theming variables in `css/main.css` to align with your brand.
- Add new guides by copying an existing HTML file from `guides/` and editing the content.

## Contributing

1. Fork or branch the project.
2. Keep guides under 5&nbsp;MB in total to remain GitHub Pages friendly.
3. Run automated or manual QA before publishing; every guide ends with an **Acceptance** section you can treat as your done checklist.

## License

This project is released under the MIT License. See [LICENSE](./LICENSE) for details.
