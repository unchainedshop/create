import { DeliveryProviderType } from 'meteor/unchained:core-delivery';

export default {
  deliveryProviders: [
    {
      id: 'send-mail',
      adapterKey: 'shop.unchained.send-mail',
      type: DeliveryProviderType.DELIVERY,
    },
  ],
};
