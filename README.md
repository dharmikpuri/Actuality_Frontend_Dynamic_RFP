# Actuality Frontend Dynamic RFP

A React + TypeScript app that takes structured JSON and renders it as a clean, multi-page, multi-column RFP document — with inline editing and PDF export.

🔗 **Repo:** https://github.com/dharmikpuri/Actuality_Frontend_Dynamic_RFP

---

## Getting Started

```bash
git clone https://github.com/dharmikpuri/Actuality_Frontend_Dynamic_RFP
npm i
npm run dev
```

That's it. App runs at **http://localhost:5173**

---

## Folder Structure

```
src/
├── Components/
│ ├── RfpBlock.tsx # Renders each content block (heading, paragraph, list, image)
│ └── RfpRenderer.tsx # Handles layout, pagination, and 3-column structure
├── utils/
│ ├── data.ts # Mock data used to render the document
│ └── exportPdf.ts # Logic for exporting the document as PDF
├── App.tsx # Main component
├── types.ts # Type definitions
├── main.tsx # Entry point
└── index.css # Global styles

public/
├── actuality.svg # Logo
└── favicon.png
```

---

## What Each File Does

| File | What it does |
|------|-------------|
| `RfpBlock.tsx` | Renders each content type like heading, paragraph, list, and image. Also allows editing using `contentEditable` |
| `RfpRenderer.tsx` | Handles the main layout — splits content into pages, manages 3 columns, and controls PDF export |
| `data.ts` | Contains the mock JSON data used to render the document |
| `exportPdf.ts` | Handles PDF generation using html2canvas and jsPDF |
| `types.ts` | Defines TypeScript types for different block types |

---

## Features

- ✅ 3-column layout with automatic pagination (800px per page)
- ✅ Supports multiple content types (headings, paragraphs, lists, images)
- ✅ Inline editing using `contentEditable`
- ✅ Prevents splitting important content (like heading + paragraph)
- ✅ Export to PDF
- ✅ Page header and footer included
---

## Approach

- First, I grouped content based on headings so related blocks stay together
- Then I calculated approximate height of each block using a hidden DOM element
- Based on height, I split content into pages (800px limit)
- Inside each page, I distributed grouped content across 3 columns
- Used a simple balancing approach to avoid very uneven columns
- Inline editing is handled using `contentEditable` and updating state on blur

The focus was to keep the layout readable instead of perfectly packed.

---

## Screenshots

### Page 1 — Project Overview
<img width="457" height="434" alt="image" src="https://github.com/user-attachments/assets/f3628ffd-0dc5-415a-82b8-5c3bea401531" />

### Page 2 — Development & Testing phases
<img width="457" height="434" alt="image" src="https://github.com/user-attachments/assets/473d76c8-7d03-4ae5-bf56-a62e61af0bfb" />

### Page 3 — Maintenance & Support
<img width="457" height="434" alt="image" src="https://github.com/user-attachments/assets/ff11aa82-c9e3-4f85-b5e1-10e2525eee9c" />

---

## Why is there whitespace at the bottom of pages?

Pagination is handled by estimating the height of each content block using a hidden element before rendering.

Since this is an approximation (not exact pixel height), small differences can happen due to fonts, spacing, and images. Because of this, some content may move to the next page slightly earlier, leaving small empty space.

This is an intentional trade-off — instead of breaking content awkwardly (for example splitting a heading from its paragraph), the renderer keeps related content together to maintain readability and structure.

With more advanced layout logic (like precise height measurement or content splitting), this can be improved further.

---

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- jsPDF + html2canvas (PDF export)

---

## Assumptions

- Mock data in `data.ts` is used as the source — this can be replaced with an API easily  
- Inline edits are stored in component state and reset on refresh  
- Images must be publicly accessible for PDF export to work properly  
- Content is grouped (heading + related blocks) and not split across pages to maintain readability  

---

## Possible Improvements

- Improve column balancing so content is distributed more evenly across columns  
- Allow splitting of large content blocks across columns/pages instead of moving the whole group  
- Persist inline edits using localStorage or a backend  
- Add drag-and-drop support to reorder sections  
- Improve PDF export quality (use vector-based rendering instead of image capture)  
- Add undo/redo support by maintaining edit history  

These are areas that can further enhance the flexibility and user experience of the renderer.

---

## Summary

This project focuses on building a dynamic document renderer using structured JSON.

Key areas handled:
- Pagination logic
- Multi-column layout
- Rendering mixed content types
- Maintaining readable document structure

Instead of forcing perfect column filling, the solution prioritizes keeping related content together, which improves readability but may leave small gaps.

Overall, the goal was to build a clean, maintainable solution that handles real-world document rendering challenges.

---

Built with ❤️ for the Actuality Frontend Engineer role
