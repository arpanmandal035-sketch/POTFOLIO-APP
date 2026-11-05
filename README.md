# Arpan Mandal — Portfolio

Premium multilingual portfolio for **Arpan Mandal — AI Developer | Web Developer | Video Editor**.
Built with React 19, Vite, TypeScript, Tailwind CSS, and a Supabase-backed owner dashboard.

The existing premium dark navy / black / cyan / purple design, typography,
animations, layout, all sections, services, and project placeholders are preserved.

## What this update adds

- A separate owner route at **`#/admin`** with real Supabase email/password sign-in.
- Strict server-side authorization through Postgres **Row Level Security**.
- A single persistent contact-settings row in a Supabase database.
- Editable fields for Instagram, Facebook, LinkedIn, GitHub, WhatsApp, phone, and email.
- **Save Changes** and **Cancel Changes**, field validation, success/error messages,
  a live link preview, and saved-state tracking.
- Automatic public propagation: the date lives in one shared contact provider used
  by the Contact section, footer, WhatsApp/phone/email actions, service CTAs,
  “Hire Me”, and “Let’s talk”.
- Public visitors see the portfolio only. The contact settings form and save/cancel
  controls are never rendered for unauthenticated or non-owner users.
- Facebook starts empty and is hidden publicly until a real URL is saved.

## Current public contact details

These remain the verified fallback and are also seeded into the database by
`supabase/schema.sql`:

| Channel | Value |
| --- | --- |
| WhatsApp | `+91 9002605307` → `https://wa.me/919002605307` |
| Phone | `+91 9002605307` → `tel:+919002605307` |
| Email | `arpanmandal035@gmail.com` → `mailto:arpanmandal035@gmail.com` |
| Instagram | `https://www.instagram.com/heartless._.arpan/` |
| LinkedIn | `https://www.linkedin.com/in/arpan-mandal-5b417a418/` |
| GitHub | `https://github.com/arpanmandal035-sketch` |
| Facebook | Empty — not invented, not displayed |

## Backend setup status — read this first

The dashboard UI, authentication flow, validation, update API calls, and database
security SQL are **implemented and tested against a mocked Supabase API**. The
live Supabase project is **not connected in this workspace** because no Supabase
URL/key or owner credentials were provided. Until the steps below are completed,
`#/admin` shows a neutral “Owner access unavailable” gate and no contact settings
form, save controls, or admin data.

No password, service-role key, or secret is present in the frontend. The only
browser-exposed Supabase values are the **public project URL and anon/publishable
key**, which are safe *only when the supplied RLS policy is active*.

### Required backend: Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run the complete
   [`supabase/schema.sql`](supabase/schema.sql) file.
   This creates `contact_settings`, `owner_users`, all RLS policies, the
   owner-check function, and seeds the initial contact row above.
3. Open **Authentication → Users → Add user**. Create your own owner login using
   a strong password. (Use an inbox you control, e.g. the public contact email.)
4. In the SQL Editor, register that auth user as the owner. The exact statement is
   at the bottom of `supabase/schema.sql`:

   ```sql
   insert into public.owner_users (user_id)
   select id from auth.users
   where lower(email) = lower('arpanmandal035@gmail.com')
   on conflict (user_id) do nothing;
   ```

   Change the email if your owner auth account uses a different address.
5. Recommended: in **Authentication → Providers → Email**, disable public
   **sign-ups** so no one else can create an account. The dashboard does not offer
   sign-up, but disabling it is an additional server-side protection.
6. In **Project Settings → API**, copy:
   - Project URL
   - the **anon / publishable** key
   Do **not** copy the `service_role` or secret key into this project.

7. Add the values to `.env.local` locally (see `.env.example`):

   ```env
   VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_OR_PUBLISHABLE_KEY
   ```

   Add the same two variables to your hosting provider (Vercel/Netlify →
   Environment Variables), then redeploy.

8. Run `npm run build` locally and confirm `#/admin` now shows the owner sign-in.
9. Sign in with the owner account created in step 3.

The site cannot create accounts, cannot grant owner membership, and does not use
a hidden URL as security. The database rejects unauthorized writes even if someone
discovers `#/admin` or tampers with the client.

## Owner dashboard

### Access

Open:

```text
https://YOUR-DOMAIN/#/admin
```

The hash route works on static hosts without server rewrite rules. A `/admin`
path is also recognized, but on static hosting you must configure a rewrite to
`/index.html` if you prefer path-style access. The route is not the security
boundary.

### Sign in

Use the email and password of the Supabase Auth user you created and registered
in `owner_users`. Passwords are handled only by Supabase Auth over HTTPS and are
never stored in this project.

### Change your Instagram URL

1. Sign in at `#/admin`.
2. Find **Instagram profile URL**.
3. Enter a full HTTPS profile URL, e.g.
   `https://www.instagram.com/yourhandle/`.
4. Check the **Live preview** link, then click **Save Changes**.
5. A success message confirms the database write. Instagram links across the
   Contact section and footer now use the new URL.

### Save and publish

Saving writes to Supabase immediately. The public site reads the saved row when
it loads, so visitors get the latest values after a refresh. **No source edit,
AI prompt, or redeploy is required for routine contact changes.** The owner’s
current session also updates immediately while the dashboard is open.

Publishing your changes therefore means clicking **Save Changes**. The row is
persisted in Supabase; the deployed static site remains the same build but reads
the current database row at runtime.

### Validation and safety

- WhatsApp and phone: 8–15 digits including country code.
- Email: valid email format.
- Socials: HTTPS URLs on the matching platform (Instagram, Facebook, LinkedIn,
  GitHub); unrelated or insecure URLs are rejected.
- Facebook is optional and starts blank.
- Cancel restores the last saved values and discards unsaved edits.
- Save is attempted only when client validation passes.
- A failed database update (including an RLS rejection) shows a clear failure;
  the UI never reports “Changes saved” in that case.
- Preview links reflect unsaved edits so you can verify them first.

### Project form recipient and changed email

The FormSubmit endpoint is derived from the currently saved email. If you change
the email, the project form will target the new inbox. FormSubmit requires a
one-time activation for each new recipient address: submit a test enquiry and
click **Activate Form** in that inbox. Until activated, the site reports that the
message was **not delivered**; it never shows a fake success.

## Security model

- **Authentication:** Supabase Auth email/password, with sessions persisted by the
  official client and refresh tokens managed by Supabase.
- **Authorization:** `contact_settings` UPDATE is allowed only when
  `public.is_portfolio_owner()` confirms the authenticated user exists in
  `owner_users`.
- **Database:** anonymous/public users have SELECT for the single published row;
  only authenticated owner members have UPDATE. No anon insert/delete.
- **Owner membership:** the browser can only read its own membership row. It cannot
  grant ownership.
- **Secrets:** no service-role key, password, or private API key is in the frontend.
  Never add a Supabase `service_role` key to a `VITE_*` variable.
- **Public UI:** the settings form, save/cancel buttons, and preview are rendered only
  after a valid session **and** a confirmed owner membership row. Unauthenticated
  and non-owner accounts see a sign-in or access-denied screen.
- **RLS test caveat:** the live database policies were authored in
  `supabase/schema.sql` but could not be executed against a real Supabase project
  in this environment. Verify them after setup as described below.

## Testing performed

**Public site (production build, no backend connected): 12/12 passed**

- WhatsApp `wa.me`, `tel:`, `mailto:`, GitHub, Instagram, and LinkedIn links
- No admin contact-settings form or save/cancel controls on the public portfolio
- Admin route shows no form or fields without a configured backend
- Mobile setup gate has no horizontal overflow
- No runtime page/console errors

**Owner dashboard wiring with a mocked Supabase API: 26/26 passed**

- Unauthenticated visitor sees only sign-in; settings and save controls absent
- Wrong password rejected; no settings exposed
- Authenticated **non-owner** denied access; fields absent
- Owner can sign in and sees all editable fields; Facebook starts empty
- Live preview updates before save
- Cancel restores saved values
- Invalid WhatsApp number blocks save and shows validation
- Owner save succeeds and persists to the mocked row
- Public Instagram icon updates after save in the same session
- Public WhatsApp link remains correct
- Session persists after refresh
- Saved Instagram persists after refresh
- Logout returns to sign-in and hides fields
- Mobile dashboard reachable, no overflow
- Server/RLS rejection is shown as “Save failed”, never as success

**Not tested against a live backend:** login/logout and database persistence against
a real Supabase project were not performed because no live project credentials
exist in this workspace. The mocked tests verify the client wiring and failure
handling, but you must repeat the checks with your Supabase project after setup.

### Post-setup live checks

1. Visit `#/admin` signed out — confirm only the sign-in gate appears.
2. Sign in with the owner account — confirm the dashboard loads the seeded values.
3. Create/use a second non-owner Supabase Auth account, sign in, and confirm
   **Access denied** and no fields. Delete that test account afterwards.
4. Change Instagram to a real URL, Save, refresh, and confirm persistence.
5. Open the public Contact section and footer and confirm every icon uses the new
   values. Check WhatsApp, phone, and email links.
6. Click **Cancel Changes** after editing; confirm saved values return.
7. Confirm the browser bundle contains no `service_role` key or owner password.
8. Send a real project-form enquiry and complete FormSubmit activation if prompted.

## Fallback configuration before the database is connected

Until Supabase is configured, the public site uses the verified values in
[`src/config/contact.ts`](src/config/contact.ts). This fallback is intentional, so
existing contact links never become broken. Once the database loads successfully,
the saved database row is the source of truth; the fallback is used only if the
database is unavailable or a verification detail is missing.

The older local setup console remains available for emergency/offline updates:

```bash
node scripts/configure-contact.mjs          # owner-local, validated
node scripts/configure-contact.mjs --check  # read-only destination status
```

It is a private local tool, not the online dashboard, and is not deployed as a
route.

## Run locally

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Project content

Projects remain editable placeholders in [`src/data/site.ts`](src/data/site.ts)
because no real project titles, previews, or links were supplied. Replace them
when your work is ready. No client names, testimonials, or project links were
invented.

The About section reserves a clearly labelled space for verified learning and
internship experience. No qualification or employment claim is invented. The
portrait stand-in can be replaced at `public/images/arpan-portrait.jpg`.

## Deployment

The build outputs a static site in `dist/`.

- **Vercel:** framework preset Vite; build `npm run build`; output `dist`; add the
  two Supabase environment variables.
- **Netlify:** build `npm run build`; publish `dist`; add the same variables.
- **GitHub Pages:** ready to deploy. A tested GitHub Actions workflow lives at
  [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).
  Follow the step-by-step guide in
  [`GITHUB_DEPLOY.md`](GITHUB_DEPLOY.md).

### GitHub Pages summary

1. Create a public repository at
   `https://github.com/new`. The recommended repository name is
   `arpanmandal035-sketch.github.io` (your exact GitHub username plus
   `.github.io`), which serves the site at
   `https://arpanmandal035-sketch.github.io/`. A project repository such as
   `portfolio` also works; the built asset paths are relative.
2. Push the project to the repository's `main` branch.
3. In **Settings → Pages → Build and deployment → Source**, choose
   **GitHub Actions**.
4. The workflow installs, builds, and deploys on every push to `main`/`master`.
5. For the owner dashboard, add `VITE_SUPABASE_URL` and
   `VITE_SUPABASE_ANON_KEY` under
   **Settings → Secrets and variables → Actions**. Use only the public
   anon/publishable key.
6. The admin URL after deployment is
   `https://YOUR-SITE/#/admin`. The hash route needs no server rewrite.

The project was verified locally under a simulated Pages subpath
(`/portfolio/`): portrait, favicon, all contact links, and the gated admin
route loaded without runtime or resource errors.

I cannot create the GitHub repository, sign in to your account, or push code on
your behalf from this workspace. Do not share your GitHub password or personal
access token. Run the commands in [`GITHUB_DEPLOY.md`](GITHUB_DEPLOY.md) on your
own machine.

After assigning the production domain, update the Open Graph/Twitter image URLs in
`index.html` to absolute URLs and add the canonical URL.
