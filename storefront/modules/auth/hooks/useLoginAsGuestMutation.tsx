import gql from 'graphql-tag';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

const LoginAsGuestMutation = gql`
  mutation LoginAsGuest {
    loginAsGuest {
      id
      token
      tokenExpires
    }
  }
`;

const useLoginAsGuestMutation = () => {
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

export default useLoginAsGuestMutation;
