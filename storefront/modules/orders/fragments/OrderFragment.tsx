import gql from 'graphql-tag';

const OrderFragment = gql`
  fragment OrderFragment on Order {
    _id
    status
    created
    updated
    ordered
    country {
      flagEmoji
      name
    }
    delivery {
      provider {
        _id
        type
      }
      status
      fee {
        amount
        currency
      }
    }
    orderNumber
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
      simulatedPrice {
        price {
          amount
          currency
        }
      }
    }

    payment {
      status
      paid
      fee {
        amount
        currency
      }
    }
  }
`;

export default OrderFragment;
