import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { UserQuery } from './useUserQuery';

const LogoutMutation = gql`
  mutation Logout($token: String!) {
    logout(token: $token) {
      success
    }
  }
`;

const useLogoutMutation = () => {
  const [logoutMutation] = useMutation(LogoutMutation, {
    update(cache) {
      cache.writeQuery({
        query: UserQuery,
        data: { me: null },
      });
    },
  });

  const logout = async () => {
    if (window && window.localStorage) {
      const token = window.localStorage.getItem('token');
      window.localStorage.removeItem('token');

      await logoutMutation({
        variables: { token },
      });
    }
  };

  return {
    logout,
  };
};

export default useLogoutMutation;
