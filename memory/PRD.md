# The Urban Bungalow — PRD

## Original Problem Statement
> https://urbanbungalow.lovable.app — improve this website, also check the staff login feature: cafe owners only should have access to the database of reserved people names. Add anything missing, can change theme.

## Architecture
- **Backend:** FastAPI + Motor (MongoDB). JWT auth (PyJWT + bcrypt). Admin seeded on startup from env.
- **Frontend:** React (CRA) + Tailwind + shadcn/ui + sonner toasts + react-router-dom.
- **Theme:** Deep moody luxe — forest green (#0B120E / #151F19), brass (#C8A97E), cream text. Cormorant Garamond + Outfit fonts.

## User Personas
1. **Guest** — browses landing, reserves a table.
2. **Cafe Owner / Staff** — logs in at `/staff`, manages reservations at `/admin`.

## Core Requirements (static)
- Marketing landing: hero, four spaces showcase, menu preview, reservation form, location/contact.
- Public reservation endpoint.
- Owner-only auth-protected admin dashboard with reservation list + status update.

## Implemented (2026-02 — v1)
- ✅ Marketing landing (Home.jsx) with hero, intro, bento spaces, inside section, menu preview, reservation form, visit, footer
- ✅ Menu preview with 4 categories (Slow Mornings, Wellness Bowls, From the Bar, Sweet Endings)
- ✅ Reservation form POSTs `/api/reservations` with success toast
- ✅ JWT auth (`/api/auth/login`, `/api/auth/me`, `/api/auth/logout`) — bcrypt, 12h tokens
- ✅ Admin seeded: `owner@urbanbungalow.com` / `Owner@2026`
- ✅ Staff login page (`/staff`) with luxe centered card
- ✅ Admin dashboard (`/admin`) — stats, search, status filter, status dropdown update
- ✅ Route protection: `/admin` redirects to `/staff` if unauthenticated
- ✅ Cross-site cookie + localStorage Bearer fallback for cross-domain
- ✅ All 21 e2e tests pass (100%)

## Backlog
### P0
- (none — MVP complete)

### P1
- Daily calendar view of reservations
- CSV export of reservations
- Pilates class schedule + booking
- Email/SMS confirmation when status changes to `confirmed`

### P2
- Multiple staff roles (host, manager)
- Banquet inquiry form
- Testimonials & gallery sections
- WhatsApp Business API integration for auto-confirmations
- Audit log of status changes
