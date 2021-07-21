import renderCurrency from './renderCurrency';

const renderPrice = (
  args: { amount?: number; currency?: string; addBTCFraction?: boolean } = {},
): string => {
  const { amount = 0, currency = 'EUR', addBTCFraction = true } = args || {};
  if (currency === 'BTC') {
    if (addBTCFraction) {
      return `BTC ${amount / 100}`;
    }
    return `BTC ${amount}`;
  }
  return `${renderCurrency(currency, amount / 100)}`;
};

export default renderPrice;
