const renderPrice = (
  { amount, currency }: { amount: number; currency: string } = {
    amount: 0,
    currency: 'CHF',
  },
) => `${currency} ${(amount / 100).toFixed(2)}`;

export default renderPrice;
