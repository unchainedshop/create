import memoize from 'fast-memoize';
import getConfig from 'next/config';

const generateCSS = async (theme) => {
  const propDefinitions = Object.entries(theme.rootProperties)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n');

  const injectStyles = (
    await Promise.all(
      (theme?.injectStyles || []).map(async (url) => {
        try {
          const result = await fetch(url);
          return result?.text();
        } catch (e) {
          return url;
        }
      }),
    )
  ).join('\n');

  return `/* Generated through Unchained Create Theming */
:root {
${propDefinitions}
}
${injectStyles}
`;
};

const memoizedGenerateCSS = memoize(generateCSS);

export default async function handler(req, res) {
  const {
    publicRuntimeConfig: { theme },
  } = getConfig();
  const css = await memoizedGenerateCSS(theme);
  res.setHeader('content-type', 'text/css; charset=utf-8');
  res.end(css);
}
