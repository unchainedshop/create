import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const SetOrderPaymentProviderMutation = gql`
  mutation SetOrderPaymentProvider($orderId: ID!, $paymentProviderId: ID!) {
    setOrderPaymentProvider(
      orderId: $orderId
      paymentProviderId: $paymentProviderId
    ) {
      _id
      status
      created
      updated
      ordered
      orderNumber
      payment {
        provider {
          type
          _id
        }
      }
    }
  }
`;

const useSetOrderPaymentProviderMutation = () => {
  const [setOrderPaymentProviderMutation] = useMutation(
    SetOrderPaymentProviderMutation,
  );

  const setOrderPaymentProvider = async ({ orderId, paymentProviderId }) => {
    await setOrderPaymentProviderMutation({
      variables: { orderId, paymentProviderId },
    });
  };

  return {
    setOrderPaymentProvider,
  };
};

export default useSetOrderPaymentProviderMutation;
