# Gate Builders Hub

A showcase hub for the **Gate Builders** collective — a community dedicated to building and maintaining Second Life's Stargate network since 2008, joining forces as a unified collective in 2026.

Built with React, TypeScript, and Vite. Styled with Tailwind CSS.

## Getting Started

**Prerequisites:** [Node.js](https://nodejs.org/)

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:3000` with hot reload.

### Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

Output goes to `dist/`.

## Project Structure

```
├── App.tsx              # Main application component — fetches and parses XML, manages state
├── index.tsx            # React entry point
├── index.html           # Vite HTML entry — loads Tailwind CDN and Google Fonts (Inter)
├── types.ts             # TypeScript interfaces (Group, ModalProps)
├── constants.ts         # Hardcoded fallback group data (currently unused)
├── components/
│   ├── GroupCard.tsx     # Interactive card for each organization
│   ├── GroupModal.tsx    # Detailed view modal for a selected group
│   └── TextModal.tsx    # Generic modal for manifesto and legal content
├── public/
│   ├── favicon.ico
│   └── gate-builders-logo.png
├── groups.xml           # Organization data
├── manifesto.xml        # Collective mission statement
└── legal.xml            # Legal and compliance text
```

## XML Data Files

All content is driven by three XML files at the project root. On page load, `App.tsx` fetches each file and parses it client-side with the browser's `DOMParser` API — no backend required.

### `groups.xml`

Defines the member organizations displayed on the hub. Each `<group>` has an `id` and a `category` attribute (`Gate Network`, `Creators`, or `Experiences`), which determines which section it appears in.

```xml
<groups>
  <group id="alpha-fox" category="Gate Network">
    <name>Alpha-Fox</name>
    <shortDescription>Brief teaser shown on the card</shortDescription>
    <longDescription>Full description shown in the detail modal (supports multiple lines)</longDescription>
    <imageUrl>https://...</imageUrl>
    <logoUrl>https://...</logoUrl>
    <websiteUrl>https://alpha-fox.com</websiteUrl>
    <tags>
      <tag>Prim based Stargates</tag>
      <tag>Public API</tag>
    </tags>
  </group>
  <!-- more groups -->
</groups>
```

To add a new organization, add a `<group>` element with all the fields above. The category must be one of `Gate Network`, `Creators`, or `Experiences`.

### `manifesto.xml`

The collective's mission statement, shown in a modal when the user clicks "Manifesto" in the footer.

```xml
<manifesto>
  <title>The Builders Manifesto</title>
  <motto>Transcending the Grid, Archiving the Infinite.</motto>
  <body>Full manifesto text here...</body>
</manifesto>
```

### `legal.xml`

Legal and compliance information, shown via the "Legal Information" footer link.

```xml
<legal>
  <title>Legal Information</title>
  <body>Full legal text here...</body>
</legal>
```

## Tech Stack

| Category   | Technology              |
|------------|-------------------------|
| Framework  | React 19                |
| Language   | TypeScript 5.8          |
| Build Tool | Vite 6                  |
| Styling    | Tailwind CSS (CDN)      |
| Data       | Static XML, client-side parsed |
