import { gql } from '@apollo/client';

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
    meta
    delivery {
      _id
      provider {
        _id
        type
        simulatedPrice {
          amount
          currency
        }
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
        amount
        currency
      }
    }

    payment {
      _id
      status
      paid
      fee {
        amount
        currency
      }
      provider {
        _id
        type
        interface {
          _id
        }
      }
    }
  }
`;

export default OrderFragment;
