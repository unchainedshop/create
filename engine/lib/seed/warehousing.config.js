import { WarehousingProviderType } from 'meteor/unchained:core-warehousing';

export default {
  warehousingProviders: [
    {
      _id: 'random',
      adapterKey: 'shop.unchained.warehousing.random',
      type: WarehousingProviderType.PHYSICAL,
    },
  ],
};
