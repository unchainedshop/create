import { Users } from 'meteor/unchained:core-users';
import { Countries } from 'meteor/unchained:core-countries';
import { Currencies } from 'meteor/unchained:core-currencies';
import { Languages } from 'meteor/unchained:core-languages';
import { PaymentProviders } from 'meteor/unchained:core-payment';
import { DeliveryProviders } from 'meteor/unchained:core-delivery';
import { WarehousingProviders } from 'meteor/unchained:core-warehousing';
import { hashPassword } from 'meteor/unchained:api';

import i18nConfiguration from './i18n.config';
import paymentConfiguration from './payment.config';
import deliveryConfiguration from './delivery.config';
import warehousingConfiguration from './warehousing.config';

const logger = console;

export default async () => {
  if (Users.find({ username: 'admin' }).count() > 0) {
    return;
  }
  const admin = await Users.createUser({
    username: 'admin',
    roles: ['admin'],
    emails: [{ address: 'admin@unchained.local', verified: true }],
    profile: { address: {} },
    guest: false,
  });
  await admin.setPassword(hashPassword('password'));

  const {
    baseCountryCode,
    baseLanguageCode,
    languages,
    currencies,
    countries,
  } = i18nConfiguration;

  languages.forEach(({ isoCode, ...rest }) => {
    Languages.createLanguage({
      isoCode,
      isActive: true,
      isBase: isoCode === baseLanguageCode,
      authorId: admin._id,
      ...rest,
    });
  });

  const currencyCodeToObjectMap = currencies.reduce(
    (acc, { isoCode, ...rest }) => {
      const currencyObject = Currencies.createCurrency({
        isoCode,
        isActive: true,
        authorId: admin._id,
        ...rest,
      });
      return {
        ...acc,
        [isoCode]: currencyObject,
      };
    },
    {},
  );

  countries.forEach(({ isoCode, defaultCurrencyCode, ...rest }) => {
    Countries.createCountry({
      isoCode,
      isBase: isoCode === baseCountryCode,
      isActive: true,
      authorId: admin._id,
      defaultCurrencyId: currencyCodeToObjectMap[defaultCurrencyCode]._id,
      ...rest,
    });
  });

  const { paymentProviders } = paymentConfiguration;
  paymentProviders.forEach((paymentProvider) => {
    PaymentProviders.insert({
      authorId: admin._id,
      configuration: [],
      created: new Date(),
      ...paymentProvider,
    });
  });

  const { deliveryProviders } = deliveryConfiguration;
  deliveryProviders.forEach((deliveryProvider) => {
    DeliveryProviders.insert({
      authorId: admin._id,
      configuration: [],
      created: new Date(),
      ...deliveryProvider,
    });
  });

  const { warehousingProviders } = warehousingConfiguration;
  warehousingProviders.forEach((warehousingProvider) => {
    WarehousingProviders.insert({
      authorId: admin._id,
      configuration: [],
      created: new Date(),
      ...warehousingProvider,
    });
  });

  logger.log(`
      initialized database with user: admin@unchained.local / password`);
};
