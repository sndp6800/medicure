# Medicure

A healthcare-interface prototype built with Next.js, TypeScript, Tailwind CSS and a Capacitor Android shell. The source contains doctor-list/booking screens, medicine browsing/cart screens and a profile view.

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:3000. `npm run build` creates the static export configured in `next.config.mjs`; Capacitor reads the generated `out/` directory. Build output is intentionally excluded from Git.

## Source map

| Path | Purpose |
| --- | --- |
| `app/doctor/` | Doctor and booking interface |
| `app/medicine/` | Medicine and cart interface |
| `app/profile/` | Profile interface |
| `components/ui/` | Shared UI components |
| `android/` | Capacitor Android project source |
| `capacitor.config.ts` | Native shell configuration |

`app/db.js` is an optional server-side MongoDB utility and now requires `MONGODB_URI`. Do not import it into a browser component. A static export cannot provide server-side database operations by itself.

## Status and boundaries

This repository is a prototype, not a verified clinical or transactional service. Booking, payment and medicine-order screens do not establish live integrations. Dependencies and application behavior need a dedicated upgrade/security review before deployment.

The repository cleanup verified the connection utility's missing-configuration behavior and syntax, removed tracked generated assets, and replaced the default README. A full web build, Android build and end-to-end flow test were not performed in that cleanup.
