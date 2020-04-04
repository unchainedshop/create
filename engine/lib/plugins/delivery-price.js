import {
  DeliveryPricingDirector,
  DeliveryPricingAdapter,
} from 'meteor/unchained:core-pricing';

class DeliveryZurichCityPrice extends DeliveryPricingAdapter {
  static key = 'shop.unchained.pricing.delivery-zurich';

  static version = '1.0';

  static label = 'Velogebühren';

  static orderIndex = 11;

  static isActivatedFor() {
    return true; // check if delivery address is in switzerland?
  }

  async calculate() {
    this.log('DeliveryZurichCityPrice -> Add Fee');
    this.result.addFee({
      amount: 800,
      isTaxable: true,
      isNetPrice: false,
      meta: { adapter: this.constructor.key },
    });
    return super.calculate();
  }
}

DeliveryPricingDirector.registerAdapter(DeliveryZurichCityPrice);
