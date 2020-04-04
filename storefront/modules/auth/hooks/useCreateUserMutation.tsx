import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

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
  const [createUserMutation, { error }] = useMutation(CreateUserMutation, {
    // refetchQueries: ['UserQuery'],
    update(cache, result) {
      // const { todos } = cache.readQuery({ query: GET_TODOS });
      const newUser = result?.data?.createUser?.user;

      if (newUser) {
        cache.writeQuery({
          query: UserQuery,
          data: { me: newUser },
        });
      }
      console.log(cache, result);
    },
  });

  const createUser = async ({ email, password }) => {
    const result = await createUserMutation({ variables: { email, password } });
    const token = result?.data?.createUser?.token;

    if (window && window.localStorage && token)
      window.localStorage.setItem('token', token);
  };

  return {
    createUser,
    error,
  };
};

export default useCreateUserMutation;
