import { useMutation, useApolloClient, gql } from '@apollo/client';

const LoginAsGuestMutation = gql`
  mutation LoginAsGuest {
    loginAsGuest {
      id
      token
      tokenExpires
    }
  }
`;

const useLoginAsGuest = () => {
  const client = useApolloClient();
  const [loginAsGuestMutation] = useMutation(LoginAsGuestMutation);

  const loginAsGuest = async () => {
    const result = await loginAsGuestMutation();
    await client.resetStore();
    return result;
  };

  return {
    loginAsGuest,
  };
};

export default useLoginAsGuest;
