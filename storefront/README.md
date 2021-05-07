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

## Theming

App Theming works like this:

- The theme is read from the environment variable `UNCHAINED_CREATE_THEME` or
  provided as a path to `UNCHAINED_CREATE_THEME_FILE`. By default theme.json is
  loaded via `UNCHAINED_CREATE_THEME_FILE=theme.json`
- The theme is defined as a json (see theme.json for a complete example)
- From environment it is then provided to the whole next app on runtime by using
  next/config's publicRuntimeConfig feature. The page /api/theme generates CSS
  variable's out of the rootProperties object, the other properties are used
  throughout the app to translate certain content, configure logos and icons.
