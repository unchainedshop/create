import translations from '../../../i18n';

const getMessages = (locale) => {
  return translations[locale];
};

export default getMessages;
