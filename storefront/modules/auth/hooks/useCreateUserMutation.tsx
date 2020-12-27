import { useMutation, useApolloClient, gql } from '@apollo/client';

import CurrentUserFragment from '../fragments/CurrentUserFragment';
import { UserQuery } from './useUserQuery';

const CreateUserMutation = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, plainPassword: $password) {
      id
      token
      user {
        ...CurrentUserFragment
      }
    }
  }
  ${CurrentUserFragment}
`;

const useCreateUserMutation = () => {
  const client = useApolloClient();
  const [createUserMutation, { error }] = useMutation(CreateUserMutation, {
    update(cache, result) {
      const newUser = result?.data?.createUser?.user;

      if (newUser) {
        cache.writeQuery({
          query: UserQuery,
          data: { me: newUser },
        });
      }
    },
  });

  const createUser = async ({ email, password }) => {
    const result = await createUserMutation({ variables: { email, password } });
    await client.resetStore();
    return result;
  };

  return {
    createUser,
    error,
  };
};

export default useCreateUserMutation;
