const changeLanguage = (lang) => {
  const alternateLink: any = document.querySelector(
    `head > link[hreflang=${lang}]`,
  );

  const href = alternateLink?.href || `/${lang}`;
  document.location.href = href;
};

export default changeLanguage;
