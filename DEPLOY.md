# Automated Deployment with GitHub Actions

This guide covers setting up a CI/CD pipeline to automatically build and publish the `main` branch to **GitHub Pages** using GitHub Actions.

---

## Prerequisites

- The repository is hosted on GitHub.
- You have write access to the repository settings.

---

## Step 1: Configure Vite for GitHub Pages

If your site will be served from a subdirectory (e.g., `https://<username>.github.io/<repo-name>/`), you must set the `base` option in [vite.config.ts](vite.config.ts):

```ts
export default defineConfig({
  base: '/<repo-name>/',
  // ...rest of config
});
```

If you are using a **custom domain** or the repo is named `<username>.github.io`, leave `base` as `/` (the default) or omit it entirely.

---

## Step 2: Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub.
2. Navigate to **Settings** → **Pages**.
3. Under **Build and deployment**, set the **Source** to **GitHub Actions**.

---

## Step 3: Create the Workflow File

Create the file `.github/workflows/deploy.yml` in your repository with the following content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Upload build artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    name: Deploy
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Commit and push this file to `main`:

```bash
git add .github/workflows/deploy.yml
git commit -m "add GitHub Actions deployment workflow"
git push
```

---

## How It Works

1. Any push to `main` triggers the workflow.
2. The **Build** job checks out the code, installs dependencies with `npm ci`, and runs `npm run build`, which outputs static files to `dist/`.
3. The `dist/` folder is uploaded as a Pages artifact.
4. The **Deploy** job picks up that artifact and publishes it to GitHub Pages.

---

## Viewing Deployments

- Workflow runs are visible under the **Actions** tab in your repository.
- The live URL will appear in **Settings** → **Pages** after the first successful deploy.
- Each deploy also posts a URL in the workflow summary under the **Deploy** job.

---

## Custom Domain (Optional)

If you want to use a custom domain (e.g., `yourdomain.com`):

1. In **Settings** → **Pages**, enter your domain under **Custom domain** and save.
2. Add a `CNAME` file to your `public/` folder containing just your domain:
   ```
   yourdomain.com
   ```
3. Update your DNS records with your domain registrar to point to GitHub Pages (see [GitHub's DNS docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)).
4. Set `base: '/'` in `vite.config.ts` (no subdirectory needed with a custom domain).
