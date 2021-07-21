import { gql } from '@apollo/client';

import AddressFragment from '../../common/fragments/AddressFragment';
import ProductFragment from '../../products/fragments/ProductFragment';

const CurrentUserFragment = gql`
  fragment CurrentUserFragment on User {
    _id
    isGuest
    name
    username
    emails {
      address
      verified
    }
    roles
    orders {
      _id
    }
    isInitialPassword
    lastLogin {
      timestamp
      countryCode
      locale
    }

    profile {
      phoneMobile
      address {
        ...AddressFragment
      }
    }
    cart {
      _id
      billingAddress {
        ...AddressFragment
      }

      contact {
        telNumber
        emailAddress
      }
      itemsTotal: total(category: ITEMS) {
        amount
        currency
      }
      items {
        _id
        quantity

        total {
          amount
          currency
        }
        product {
          ...ProductFragment
        }
      }
      paymentInfo: payment {
        _id
        status
        provider {
          _id
          type
          interface {
            _id
          }
        }
        ... on OrderPaymentGeneric {
          sign
        }
      }
      taxes: total(category: TAXES) {
        amount
        currency
      }
      delivery: total(category: DELIVERY) {
        amount
        currency
      }
      payment: total(category: PAYMENT) {
        amount
        currency
      }
      deliveryInfo: delivery {
        _id
        meta
        ... on OrderDeliveryShipping {
          address {
            ...AddressFragment
          }
        }
      }
      total {
        amount
        currency
      }
      supportedPaymentProviders {
        _id
        type
        interface {
          _id
        }
      }
      supportedDeliveryProviders {
        _id
        type
      }
    }
  }
  ${ProductFragment}
  ${AddressFragment}
`;

export default CurrentUserFragment;
