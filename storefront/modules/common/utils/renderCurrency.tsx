require('@formatjs/intl-numberformat/locale-data/en'); // locale-data for en

// TODO: Please use useIntl, take the correct locale here, also take the currency of the price
const renderCurrency = (currency = 'EUR', amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: currency === 'BTC' ? 4 : 0,
  }).format(amount);
};
export default renderCurrency;
