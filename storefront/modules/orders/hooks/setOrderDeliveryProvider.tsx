import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const SetOrderDeliveryProviderMutation = gql`
  mutation SetOrderDeliverProvider($orderId: ID!, $deliveryProviderId: ID!) {
    setOrderDeliveryProvider(
      orderId: $orderId
      deliveryProviderId: $deliveryProviderId
    ) {
      _id
      status
      delivery {
        status
      }
    }
  }
`;

const useSetOrderDeliveryProviderMutation = () => {
  const [setOrderDeliveryProviderMutation] = useMutation(
    SetOrderDeliveryProviderMutation,
  );

  const setOrderDeliveryProvider = async ({ orderId, deliveryProviderId }) => {
    await setOrderDeliveryProviderMutation({
      variables: { orderId, deliveryProviderId },
    });
  };

  return {
    setOrderDeliveryProvider,
  };
};

export default useSetOrderDeliveryProviderMutation;
