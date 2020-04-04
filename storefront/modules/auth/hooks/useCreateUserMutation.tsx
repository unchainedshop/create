import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const CreateUserMutation = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, plainPassword: $password) {
      id
      token
    }
  }
`;

const useCreateUserMutation = () => {
  const [createUserMutation] = useMutation(CreateUserMutation, {
    refetchQueries: ['UserQuery'],
  });

  const createUser = async ({ email, password }) => {
    const result = await createUserMutation({ variables: { email, password } });
    const token = result?.data?.createUser?.token;

    if (window && window.localStorage && token)
      window.localStorage.setItem('token', token);
  };

  return {
    createUser,
  };
};

export default useCreateUserMutation;
