import { useMutation, useApolloClient, gql } from '@apollo/client';

import CurrentUserFragment from '../fragments/CurrentUserFragment';
import { UserQuery } from './useUser';

export const ResetPassword = gql`
  mutation ResetPassword($newPassword: String!, $token: String!) {
    resetPassword(newPlainPassword: $newPassword, token: $token) {
      id
      token
      tokenExpires
      user {
        ...CurrentUserFragment
      }
    }
  }
  ${CurrentUserFragment}
`;

const useResetPassword = () => {
  const client = useApolloClient();
  const [resetPasswordMutation] = useMutation(ResetPassword, {
    update(cache, result) {
      const newUser = result?.data?.resetPassword?.user;

      if (newUser) {
        cache.writeQuery({
          query: UserQuery,
          data: { me: newUser },
        });
      }
    },
  });

  const resetPassword = async ({ newPassword, token }) => {
    await resetPasswordMutation({ variables: { newPassword, token } });
    await client.resetStore();
    return true;
  };

  return {
    resetPassword,
  };
};

export default useResetPassword;
