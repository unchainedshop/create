import { useMutation, useApolloClient, gql } from '@apollo/client';

const LogoutMutation = gql`
  mutation Logout {
    logout {
      success
    }
  }
`;

const useLogoutMutation = () => {
  const client = useApolloClient();
  const [logoutMutation] = useMutation(LogoutMutation);

  const logout = async () => {
    const result = await logoutMutation();
    client.resetStore();
    return result;
  };

  return {
    logout,
  };
};

export default useLogoutMutation;
