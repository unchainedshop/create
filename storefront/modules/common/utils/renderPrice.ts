const renderPrice = (
  args: { amount?: number; currency?: string } = {},
): string => {
  const { amount = 0, currency = 'CHF' } = args || {};
  return `${currency} ${(amount / 100).toFixed(2)}`;
};

export default renderPrice;
