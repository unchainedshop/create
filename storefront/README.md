# Currybag Storefront

Currently there is a staging website online at: https://currybag-test.ucc.dev/

## Quickstart

If you only want to develop on the storefront you can run a it locally connected
to the staging engine by adding the following file as `.env`:

```env
UNCHAINED_ENDPOINT=https://engine.currybag-test.ucc.dev/graphql
SKIP_INVALID_REMOTES=true
```

Then run:

```bash
npm install
npm run dev
```
