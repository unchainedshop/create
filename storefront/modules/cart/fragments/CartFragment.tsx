import { gql } from '@apollo/client';

import AddressFragment from '../../common/fragments/AddressFragment';

const CartFragment = gql`
  fragment CartFragment on Order {
    _id
    status
    user {
      _id
      cart {
        _id
      }
    }
    total {
      amount
      currency
    }
    deliveryTotal: total(category: DELIVERY) {
      amount
      currency
    }
    paymentTotal: total(category: PAYMENT) {
      amount
      currency
    }
    taxesTotal: total(category: TAXES) {
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
        _id
        texts {
          _id
          title
        }
      }
    }
    billingAddress {
      ...AddressFragment
    }
    delivery {
      _id
      provider {
        _id
        type
      }
      ... on OrderDeliveryShipping {
        address {
          ...AddressFragment
        }
      }
    }
  }
  ${AddressFragment}
`;

export default CartFragment;
