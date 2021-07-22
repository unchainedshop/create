import { useMutation, gql } from '@apollo/client';

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
        _id
        provider {
          _id
          type
          interface {
            _id
          }
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
