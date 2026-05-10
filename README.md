# Opal’s Olivia Rodrigo Countdown

A polished, mobile-first mini app for Opal’s countdown to Olivia Rodrigo in Montréal on October 22, 2026 at 7:30 PM Montréal time.

The app uses Vite, React, TypeScript, and plain CSS. It has no backend, login, database, API key, or paid service.

## Run Locally

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Vite will print a local URL, usually `http://localhost:5173`.

## Build

Create a production build:

```bash
npm run build
```

The deployable files will be written to `dist/`.

## Deploy To GitHub Pages

1. Push this project to a GitHub repository.
2. In GitHub, open the repository’s **Settings** tab.
3. Go to **Pages**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Push to the `main` branch.
6. The included workflow at `.github/workflows/deploy.yml` will install dependencies, build the app, and publish `dist/` to GitHub Pages.

## Final Public URL

After the first successful deployment, GitHub shows the public link in:

**Repository → Settings → Pages**

It will usually look like:

```text
https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPOSITORY-NAME/
```

## Add To Opal’s iPhone Home Screen

1. Open the final GitHub Pages URL in Safari on the iPhone.
2. Tap the **Share** button.
3. Scroll and tap **Add to Home Screen**.
4. Keep the name or rename it to `Opal Countdown`.
5. Tap **Add**.

Opal can then open it from the iPhone Home Screen like a tiny web app.
