import gql from 'graphql-tag';

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
      firstName
      lastName
      company
      addressLine
      addressLine2
      postalCode
      countryCode
      regionCode
      city
    }
    delivery {
      _id
      provider {
        _id
        type
      }
      ... on OrderDeliveryShipping {
        address {
          firstName
          lastName
          company
          addressLine
          addressLine2
          postalCode
          countryCode
          regionCode
          city
        }
      }
    }
  }
`;

export default CartFragment;
