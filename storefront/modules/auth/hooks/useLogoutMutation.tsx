import gql from 'graphql-tag';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { UserQuery } from './useUserQuery';

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
