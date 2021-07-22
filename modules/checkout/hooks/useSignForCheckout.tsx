import { useMutation, gql } from '@apollo/client';

const SignPaymentProviderMutation = gql`
  mutation signPaymentProviderForCheckout(
    $orderPaymentId: ID!
    $transactionContext: JSON
  ) {
    signPaymentProviderForCheckout(
      orderPaymentId: $orderPaymentId
      transactionContext: $transactionContext
    )
  }
`;

const useSignPaymentProviderMutation = () => {
  const [signPaymentProvider] = useMutation(SignPaymentProviderMutation);

  const signForCheckout = async ({ transactionContext, orderPaymentId }) => {
    const result = await signPaymentProvider({
      variables: { orderPaymentId, transactionContext },
    });
    return result.data?.signPaymentProviderForCheckout;
  };

  return {
    signForCheckout,
  };
};

export default useSignPaymentProviderMutation;
