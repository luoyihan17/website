# Luo Yihan Portfolio

Personal portfolio site for Luo Yihan, an AI full-stack designer working across AI music, interactive entertainment, games, and creative technology.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Content**: Markdown with gray-matter frontmatter
- **CMS**: [Pages CMS](https://pagescms.org) for content management
- **Fonts**: Barlow (English), system default (Chinese)
- **i18n**: English (`/en`) and Chinese (`/zh`)
- **Resume**: Browser print flow for PDF export

## Structure

```
content/
  en/           # English content (experience, project, writing, creation)
  zh/           # Chinese content
  creation/     # Shared across languages (non-localized)
public/
  assets/
    cover-image/  # Cover images for content cards
    favicon/      # Favicons and per-project icons
    images/       # All media assets (organized by project)
resume/
  content/
    en/           # English resumes
    zh/           # Chinese resumes
  components/     # Resume viewer component
  lib/            # Resume data API
  resume.css      # Resume-specific styles
src/
  app/
    [lang]/        # Language-routed pages
  lib/             # Content API, markdown processing, constants
  interfaces/      # TypeScript type definitions
```

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # Production build
npm run start   # Start production server
```

No API keys are required for the static portfolio experience.

## Content Management

Content is managed via Markdown files with frontmatter. Use [Pages CMS](https://pagescms.org) for a visual editing interface, or edit `.md` files directly.

### Adding / Editing Content

1. **Projects, Writings, Experiences, Creations** — Edit or create `.md` files in `content/en/` and `content/zh/`. Each file needs frontmatter with `title`, `date`, `intro`, `coverImage`, `favicon`, and optionally `sorting` (higher = displayed first for projects/experiences).
2. **Resumes** — Edit `resume/content/en/*.md` and `resume/content/zh/*.md`. Resumes use HTML within markdown for precise layout control (icons, meta spans, etc.).
3. **Images** — Place images in `public/assets/images/{project-name}/`. Use `.webp` format for optimized loading. Convert from PNG if needed: `cwebp input.png -o output.webp -q 85`.

### Content Ordering

- **Projects & Experiences**: Ordered by the `sorting` field in frontmatter (descending — higher number appears first).
- **Writings & Creations**: Ordered by `date` field (newest first).

### Bilingual Content

All content must be maintained in both `en/` and `zh/` directories. Keep frontmatter fields (`sorting`, `coverImage`, `favicon`, `date`) in sync across languages.

## Deployment

Push to `main` branch to trigger automatic deployment.

## License

All rights reserved. © Luo Yihan
