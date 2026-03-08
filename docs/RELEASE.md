# Publishing @ideasui/theme to GitHub Packages

This package is configured to publish to the generic GitHub Package Registry (`npm.pkg.github.com`). Follow these steps to publish.

## 1. Prerequisites (GitHub Token)

You need a Personal Access Token (PAT) with `write:packages` scope.

1.  Go to [GitHub Settings > Developer settings > Personal access tokens (Classic)](https://github.com/settings/tokens).
2.  Generate a new token (classic).
3.  Select scopes:
    - `write:packages` (Required to publish)
    - `read:packages` (Required to install)
    - `repo` (Optional, but often needed if the repo is private)
4.  Copy the token.

## 2. Authentication (~/.npmrc)

Create or update your `~/.npmrc` file to authenticate with GitHub Packages. Replace `YOUR_GITHUB_TOKEN` with your PAT.

```bash
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
@ideasui:registry=https://npm.pkg.github.com
```

> **Note**: If `ideasui` is an organization, ensure your token has SSO authorization if required.

## 3. Verify Package Scope

**Crucial Check**: GitHub Packages requires the package scope to match the repository owner.

- If your GitHub username is `hariharan804`, your package **MUST** be named `@hariharan804/theme`.
- If you are publishing to an organization named `ideasui`, then `@ideasui/theme` is correct.

If there is a mismatch, the publish will fail with a `403` or `404` error.

**To fix scope mismatch:**

1.  Open `package.json`.
2.  Change `"name": "@ideasui/theme"` to `"name": "@hariharan804/theme"` (or your org name).
3.  Update the `@ideasui:registry` line in your `.npmrc` to match the new scope (e.g., `@hariharan804:registry=...`).

## 4. Publish Command

Run the following command from the package directory:

```bash
npm publish
# OR
pnpm publish
```

If you are publishing a scoped package privately for the first time, you might need:

```bash
npm publish --access restricted
```

## Troubleshooting

- **401 Unauthorized**: Your token is invalid or missing `write:packages` scope.
- **403 Forbidden**: You are trying to publish a package with a scope that you do not own (e.g., publishing `@ideasui/theme` when you are `hariharan804` and do not belong to an `ideasui` org).
- **404 Not Found**: Often implies a scope mismatch or the repository does not exist.
