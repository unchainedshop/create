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
