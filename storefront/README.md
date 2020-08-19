# Storefront

## Quickstart

If you only want to develop on the storefront you can run a it locally connected
to the staging engine by adding the following file as `.env`:

```env
UNCHAINED_ENDPOINT=https://your-deployed-unchained-endpoint/graphql
SKIP_INVALID_REMOTES=true
```

Then run:

```bash
npm install
npm run dev
```
