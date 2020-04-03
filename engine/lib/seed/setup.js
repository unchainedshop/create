import { Users } from 'meteor/unchained:core-users';
import { Countries } from 'meteor/unchained:core-countries';
import { Currencies } from 'meteor/unchained:core-currencies';
import { Languages } from 'meteor/unchained:core-languages';
import { PaymentProviders } from 'meteor/unchained:core-payment';
import { DeliveryProviders } from 'meteor/unchained:core-delivery';

import { Factory } from 'meteor/dburles:factory';
import i18nConfiguration from './i18n.config';
import paymentConfiguration from './payment.config';
import deliveryConfiguration from './delivery.config';

const logger = console;

export default () => {
  try {
    const existingUser = Users.findOne({ username: 'admin' });
    if (existingUser) {
      if (process.env.NODE_ENV !== 'production') {
        // In dev mode: Remove master data every restart to reconfigure the shop.
        Countries.remove({});
        Currencies.remove({});
        Languages.remove({});
        PaymentProviders.remove({});
        DeliveryProviders.remove({});
      } else {
        return;
      }
    }
    const admin = existingUser
      || Factory.create('user', {
        username: 'admin',
        roles: ['admin'],
        emails: [{ address: 'admin@localhost', verified: true }],
        guest: false,
      });

    const {
      baseCountryCode,
      baseLanguageCode,
      languages,
      currencies,
      countries,
    } = i18nConfiguration;

    languages.forEach(({ isoCode, ...rest }) => {
      Factory.create('language', {
        isoCode,
        isActive: true,
        isBase: isoCode === baseLanguageCode,
        authorId: admin._id,
        ...rest,
      });
    });

    const currencyCodeToObjectMap = currencies.reduce(
      (acc, { isoCode, ...rest }) => {
        const currencyObject = Factory.create('currency', {
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
      Factory.create('country', {
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
        configuration: [],
        created: new Date(),
        ...paymentProvider,
      });
    });

    const { deliveryProviders } = deliveryConfiguration;
    deliveryProviders.forEach((deliveryProvider) => {
      DeliveryProviders.insert({
        configuration: [],
        created: new Date(),
        ...deliveryProvider,
      });
    });

    logger.log(`
      initialized database with user: admin@localhost / password`);
  } catch (e) {
    logger.log('database was already initialized');
  }
};
