import { gql } from '@apollo/client';

import AddressFragment from '../../common/fragments/AddressFragment';
import ProductFragment from '../../products/fragments/ProductFragment';

const CurrentUserFragment = gql`
  fragment CurrentUserFragment on User {
    _id
    username
    isGuest
    name
    emails {
      address
      verified
    }
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
      displayName
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
        }
        ... on OrderPaymentGeneric {
          sign
        }
      }
      taxes: total(catagory: TAXES) {
        amount
        currency
      }
      delivery: total(catagory: DELIVERY) {
        amount
        currency
      }
      payment: total(catagory: PAYMENT) {
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
