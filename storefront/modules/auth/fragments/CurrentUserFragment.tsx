import gql from 'graphql-tag';

import ProductFragment from '../../products/fragments/ProductFragment';
import AddressFragment from './AddressFragment';

const CurrentUserFragment = gql`
  fragment CurrentUserFragment on User {
    _id
    isGuest
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
      total {
        amount
        currency
      }
    }
  }
  ${ProductFragment}
  ${AddressFragment}
`;

export default CurrentUserFragment;
