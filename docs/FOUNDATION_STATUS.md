# Foundation Status — Phase 01

## Project identity

- Name: Casino Show Switzerland
- Domain being rebuilt: casinoshow.ch
- Purpose: Swiss premium casino-event entertainment website
- Package name: `casinoshow-website` (private, version 0.1.0)
- Working directory: `C:\Progetti\casinoshow-website`
- Phase: 01 — Environment audit and Next.js bootstrap
- Status: COMPLETE
- Stack: npm, stable Next.js, TypeScript, App Router, Tailwind CSS, ESLint, `src/` directory

Localization, page content, and the design system were not implemented in this phase.

## Seven-page sitemap

The approved sitemap contains exactly these seven main pages:

1. Home
2. Events (all event types on one page)
3. Games & Services
4. Gallery
5. About Us
6. Contact
7. Request a Quote

Legal pages are out of scope for this sitemap and will be added separately.

Phase 01 created only the official starter routes: `/` and `/_not-found`. The seven pages above are not routed yet.

## Mandatory languages

All seven pages must ultimately ship in:

- Italian (`it`)
- German (`de`)
- French (`fr`)
- English (`en`)

Required end state for each page: localized URLs, SEO-localized content, metadata, canonical URLs, reciprocal hreflang, and sitemap entries.

None of that localization work was done in Phase 01.

## Approved palette

Swiss premium palette. Recorded here for later phases. Not applied to the starter UI.

| Token | Hex |
| --- | --- |
| Midnight Black | `#101114` |
| Casino Green | `#127A2E` |
| Champagne Gold | `#C6A66B` |
| Casino Red | `#B1121B` |
| Warm Ivory | `#F5F2EB` |
| Graphite | `#25272B` |

## Audit before initialization

The working directory was empty. No `package.json` and no lockfile were present. Initialization was safe: nothing existing was overwritten.

| Check | Result |
| --- | --- |
| Working directory | `C:\Progetti\casinoshow-website` |
| Existing files | None |
| Node.js | v24.19.0 |
| npm | 11.17.0 |
| Git | 2.55.0.windows.3, available |
| Git status before bootstrap | Not a repository |
| `package.json` | Missing |
| Lockfile | Missing |

## Installed versions

Resolved from the official `create-next-app` starter (`app-tw` template) after `npm install`.

| Package | Version |
| --- | --- |
| next | 16.4.0 |
| react | 19.3.0 |
| react-dom | 19.3.0 |
| typescript | 5.9.3 |
| tailwindcss | 4.3.3 |
| @tailwindcss/turbopack | 4.3.3 |
| eslint | 9.39.5 |
| eslint-config-next | 16.4.0 |

Explicit starter choices: TypeScript, Tailwind CSS, ESLint, App Router, `src/` directory, import alias `@/*`, npm. React Compiler, Cache Components, and anonymized agent feedback were left off. `AGENTS.md` is included because it is part of the current official starter.

## Commands executed

```text
node -v
npm -v
git --version
git status
npx --yes create-next-app@latest --help
npx --yes create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-react-compiler --no-cache-components --no-agent-feedback --yes
npm ls next typescript tailwindcss eslint eslint-config-next react react-dom --depth=0
npm ls @tailwindcss/turbopack --depth=0
npm run lint
npx tsc --noEmit
npm run build
```

## Validation results

| Check | Command | Result |
| --- | --- | --- |
| ESLint | `npm run lint` | Pass, exit code 0, no findings |
| TypeScript | `npx tsc --noEmit` | Pass, exit code 0 |
| Production build | `npm run build` | Pass, exit code 0 |

Build details: Next.js 16.4.0 with Turbopack. Compiled successfully. TypeScript finished inside the build. Static pages generated: `/` and `/_not-found`.

No bootstrap errors required a code fix.

## Git status

- Before bootstrap: not a git repository
- After bootstrap: repository initialized by Create Next App
- Branch: `master`
- Commit: `478083d` — `Initial commit from Create Next App`
- Remote: none
- This document is untracked. No commit was created for it.

`node_modules/` and `.next/` exist locally and are gitignored.

## Files created

Starter files from Create Next App:

- `.gitignore`
- `AGENTS.md`
- `eslint.config.mjs`
- `next.config.ts`
- `package.json`
- `package-lock.json`
- `README.md`
- `tsconfig.json`
- `public/file.svg`
- `public/globe.svg`
- `public/next.svg`
- `public/vercel.svg`
- `public/window.svg`
- `src/app/favicon.ico`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/page.tsx`

Phase 01 documentation:

- `docs/FOUNDATION_STATUS.md`

Generated and gitignored: `.next/`, `node_modules/`, `next-env.d.ts`.

## Known issues

These did not block lint, TypeScript, or the production build. System settings were not changed.

1. npm prints `Unknown env config "devdir"` on every command. This comes from an existing npm environment configuration outside the project.
2. The starter resolved `eslint@9.39.5`. npm warns that this ESLint release line is no longer supported. Lint still exits 0. It was not upgraded in Phase 01.
3. Install reported 5 high severity vulnerabilities. `npm audit fix --force` was not run.
4. npm `allow-scripts` reported that `unrs-resolver@1.12.2` has a postinstall script not yet covered. The script was not approved. Install and validation still completed.
5. npm reported a newer major release (12.2.0). The installed npm 11.17.0 was left unchanged.

## Next-phase boundaries

Phase 01 stops at a validated Next.js application skeleton.

Do not treat this phase as authorization for:

- Localized routes, dictionaries, metadata, canonical URLs, hreflang, or sitemap generation
- The seven main pages or legal pages
- Palette application, layout, or visual design
- Content, forms, quote requests, gallery, or event data
- Extra dependencies, deployment, or changes outside this directory

Recommended next phase, only after explicit authorization: localized App Router foundation for the seven approved pages in Italian, German, French, and English.
