const calc_totals = (items) => {
  let sale = 0;
  let original = 0;
  items.forEach((item) => {
    sale += item.sale.price_sale * item.sale.amount;
    original += item.sale.price_original * item.sale.amount;
  });

  return {
    sale,
    original,
  };
};

export { calc_totals };
