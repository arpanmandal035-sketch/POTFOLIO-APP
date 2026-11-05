# Deploy Arpan Mandal Portfolio with GitHub Pages

This project is ready for GitHub Pages. The deploy workflow is already in
[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).

> I cannot sign in to your GitHub account, create a repository there, or push
> on your behalf from the Arena workspace. Do not share your GitHub password or
> a personal access token with anyone. Run the steps below **on your own
> computer**, in your own GitHub account.

## Option A — recommended: a user site

Your GitHub username is **`arpanmandal035-sketch`**, so the cleanest Pages URL is:

```text
https://arpanmandal035-sketch.github.io/
```

Create a **public** repository with exactly this name:

```text
arpanmandal035-sketch.github.io
```

GitHub Pages then serves the site at the domain root — no path configuration
needed. The site's assets also use relative paths, so a normal project repository
(for example `portfolio`) works at
`https://arpanmandal035-sketch.github.io/portfolio/` as well.

## Step 1 — get the project onto your computer

Download/export the current Arena project to a local folder. You need the
project files, not just `dist/index.html`.

Open a terminal in that folder. If the folder does not already have Git:

```bash
git init
git add .
git commit -m "Initial portfolio deployment"
```

If it is already a Git repository, commit your changes instead.

## Step 2 — create the GitHub repository

1. Sign in to GitHub as `arpanmandal035-sketch`.
2. Click **New repository**.
3. Name it **`arpanmandal035-sketch.github.io`** (recommended) or `portfolio`.
4. Choose **Public** — GitHub Pages for private repositories depends on your plan.
5. Do **not** add a README, `.gitignore`, or license; the project already has them.
6. Click **Create repository**.

## Step 3 — connect and push

Replace the URL only if you used a different repository name:

```bash
git remote add origin https://github.com/arpanmandal035-sketch/arpanmandal035-sketch.github.io.git
git branch -M main
git push -u origin main
```

If `origin` already exists:

```bash
git remote set-url origin https://github.com/arpanmandal035-sketch/arpanmandal035-sketch.github.io.git
git push -u origin main
```

GitHub will ask you to authenticate. Use GitHub's browser sign-in (Git
Credential Manager) or a **fine-grained personal access token** with repository
contents write access. Never paste a token into any website code in this repo.

## Step 4 — enable GitHub Pages

1. Open the repository → **Settings** → **Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Open the **Actions** tab and wait for **Deploy to GitHub Pages** to finish.
4. Your URL appears in the deployment environment and under **Settings → Pages**.

Every push to `main` or `master` now rebuilds and redeploys automatically. You
can also run the workflow manually with **Actions → Deploy to GitHub Pages → Run
workflow**.

## Step 5 — optional: connect the Supabase owner dashboard

The public portfolio deploys without Supabase. To activate the owner dashboard,
complete `supabase/schema.sql` first.

Then add the two **public** values in GitHub:

**Settings → Secrets and variables → Actions → New repository secret**

| Name | Value |
| --- | --- |
| `VITE_SUPABASE_URL` | `https://YOUR_PROJECT_REF.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase **anon / publishable** key |

Never add a Supabase `service_role` key — not as a GitHub secret for the frontend
build, not in any file.

After adding the secrets, push again or run the workflow manually. The admin URL
will be:

```text
https://arpanmandal035-sketch.github.io/#/admin
```

In Supabase **Authentication → URL Configuration**:

- **Site URL:** `https://arpanmandal035-sketch.github.io/`
- **Redirect URLs:** add `https://arpanmandal035-sketch.github.io/**`

The hash route (`#/admin`) never reaches GitHub's servers, so no special Pages
rewrite is needed.

## Troubleshooting

### “Pages is not available” / no GitHub Actions option

Use a **public** repository. Pages for private repositories is plan-dependent. On
the free plan, make the repository public.

### The page is blank after deployment

1. Confirm the workflow run is green in **Actions**.
2. Confirm **Settings → Pages → Source** is **GitHub Actions**.
3. Hard-refresh the deployed URL.
4. Check the browser console for a 404 on `images/arpan-portrait.jpg`. The build
   uses relative asset paths, so the deployed URL must end with `/` for a project
   site (`/portfolio/`). GitHub normally redirects to that.

### Owner dashboard says “Owner access unavailable”

That is expected until both GitHub secrets are set **and** the Supabase SQL setup
plus owner registration from `README.md` is complete. This is an honest gate, not
a failure of GitHub Pages.

### Changes to contact settings

Once Supabase is connected, use `/#/admin` to save contact changes. Those are
stored in Supabase and do not require a new GitHub deployment.

Without Supabase, contact values come from `src/config/contact.ts`; changing them
requires a new commit/push (or `node scripts/configure-contact.mjs`, then commit).

## What I verified locally

- `npx tsc --noEmit` passes.
- `npm run build` passes.
- The production site works at a root path and under a simulated
  `/portfolio/` GitHub Pages path.
- The owner route `#/admin` is gated and no admin fields are public.
- The bundle contains no credentials, mock values, or `service_role` key.
