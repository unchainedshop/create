import { DeliveryProviderType } from 'meteor/unchained:core-delivery';

export default {
  deliveryProviders: [
    {
      id: 'send-mail',
      adapterKey: 'shop.unchained.delivery.send-message',
      type: DeliveryProviderType.DELIVERY,
    },
  ],
};
