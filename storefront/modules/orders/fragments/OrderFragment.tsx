import gql from 'graphql-tag';

const OrderFragment = gql`
  fragment OrderFragment on Order {
    status
    created
    orderNumber
    total {
      amount
      currency
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
