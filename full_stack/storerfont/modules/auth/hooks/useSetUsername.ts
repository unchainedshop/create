import { useMutation, gql } from '@apollo/client';

const SetUsernameMutation = gql`
  mutation SetUsername($username: String!, $userId: ID!) {
    setUsername(username: $username, userId: $userId) {
      _id
      username
    }
  }
`;

const useSetUsername = () => {
  const [setUsernameMutation, { error }] = useMutation(SetUsernameMutation);

  const setUsername = async ({ username, userId }) => {
    return setUsernameMutation({
      variables: { username, userId },
      refetchQueries: ['user'],
    });
  };

  return {
    setUsername,
    error,
  };
};

export default useSetUsername;
