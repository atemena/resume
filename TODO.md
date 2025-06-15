# Project Roadmap

This document lists tasks for turning the starter into a production-ready MVP. Add notes or check items as they are completed.

## PWA Conversion
- [ ] Collect app icons (512x512, 192x192, favicon sizes) and place them in `public/`.
- [ ] Create `public/manifest.json` with app metadata.
- [ ] Install and configure `next-pwa` in `next.config.ts` to generate a service worker.
- [ ] Provide an offline fallback page for routing when the user is offline.
- [ ] Validate PWA setup with Lighthouse.

## Testing & CI
- [ ] Set up GitHub Actions to run `npm run lint` and `npm run build` on pull requests.
- [x] Add a unit testing framework (e.g., Vitest or Jest) and write initial tests.
- [ ] Configure an end-to-end test runner such as Playwright.
- [x] Write tests for profile API routes and actions.

## Development Tooling
- [ ] Set up Prettier for consistent code formatting.
- [ ] Document environment variable usage in `README.md`.
- [ ] Add script aliases in `package.json` for common tasks.

## Future Infrastructure
- [ ] Automate Supabase migrations and seed scripts.
- [ ] Add monitoring and logging (e.g., Vercel analytics or another provider).

## MVP Social Profile
- [x] **Human:** Design database schema for user profiles and tiles. See `docs/DATABASE_DESIGN.md`.
- [x] **Agent:** Create Supabase migrations to add `profiles` and `tiles` tables with proper indexes..
- [x] **Agent:** Build `/profile` page that shows the user's profile after login.
- [x] **Agent:** Implement a profile builder form allowing users to add or remove text tiles and save to Supabase.
- [x] **Agent:** Add API routes or server actions for saving profile data.
- [x] **Agent:** Hook profile builder to API routes for CRUD operations.
- [ ] **Agent:** Write integration tests covering profile viewing and creation flows.
- [ ] **Human:** Provide design assets and styling guidelines for the profile tiles.

