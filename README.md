# Vibe Kanban UI Kit

Reusable React + Tailwind components extracted from Vibe Kanban. This repo is intended to be cloned and built locally (not consumed from npm).

## Quick Start

- Prereqs: Node 18+ and pnpm 8+
- Install deps: `pnpm install` (repo root)
- Example deps: `pnpm -C example install`
- Run demo: `pnpm -C example dev` → http://localhost:3001
- Build library: `pnpm build` (outputs `dist/`)
- Preview build: `pnpm -C example build && pnpm -C example preview`

## Demo Screenshot

![Vibe Kanban UI Kit Gallery](https://github.com/user-attachments/assets/6e00e9b6-52be-4947-88d1-e4b24d8a73b4)

The demo showcases all available components including alerts, buttons, badges, form controls, interactive components, advanced components, and the kanban board.

## Using The Kit (via clone)

- Styles: import `@vibe-kanban/ui-kit/styles` once in your app entry or CSS.
- Theme: wrap your app with `ThemeProvider` from the kit.
- Development aliasing: see `example/vite.config.ts` for aliases mapping `@vibe-kanban/ui-kit` (to `../src`), `@vibe-kanban/ui-kit/styles` (to `../src/styles/tokens.css`), and `@` (to `../src`). Use a similar setup when integrating directly from the clone.
- Tailwind: tokens live in `src/styles/tokens.css`. Container queries/animate plugins are optional.

## Component Inventory (high level)

- Base: Alert, Badge, Button, Card, Loader
- Form: Input, Label, Textarea, AutoExpandingTextarea, Checkbox, Select
- Overlay/Nav: Tabs, Dialog, DropdownMenu, Tooltip
- Advanced: JSONEditor, MarkdownRenderer, ImageUploadSection, FileSearchTextarea, MultiFileSearchTextarea, FolderPicker, Kanban (Provider/Board/Card/Header/Cards)

## AI Prompt (Design Rules)

Use these rules when generating or modifying UI with this kit:

- Borders: all rectangles. Do not use rounded classes. Prefer `rounded-none`. Global radius token is 0 (`--_radius: 0px`).
- Consistency: match the example app’s look—square corners across inputs, badges, tabs, selects, dropdowns, tooltips, dialogs, folder picker, image tiles/thumbnails, JSON editor container, markdown inline code, and kanban status markers.
- Tokens: use Tailwind classes plus CSS vars from `src/styles/tokens.css` (e.g., `--background`, `--foreground`, `--primary`). Avoid hard-coded colors.
- Theme: wrap UI under `ThemeProvider`; honor `ThemeMode` if toggling themes.
- Overlays: dropdowns, tooltips, dialogs use square corners and default shadows/borders from the kit.
- Aliases: import from the kit’s public index; internal imports use `@/...` alias as configured.
- Don’t regress spacing/typography; keep existing sizes and gaps unless explicitly asked.

## Notes

- The example runs against `src/` via Vite aliases for instant iteration.
- Tailwind plugins `@tailwindcss/container-queries` and `tailwindcss-animate` are optional; the config skips missing plugins gracefully.
- Git hygiene: `node_modules/` and `dist/` are ignored by `.gitignore` and should not be committed.

## License

MIT
