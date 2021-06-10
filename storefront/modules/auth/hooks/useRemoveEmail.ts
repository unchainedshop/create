import { useMutation, gql } from '@apollo/client';

const RemoveEmailMutation = gql`
  mutation removeEmail($email: String!) {
    removeEmail(email: $email) {
      _id
    }
  }
`;

const useRemoveEmail = () => {
  const [removeEmailMutation, { error }] = useMutation(RemoveEmailMutation);

  const removeEmail = async (email) => {
    return removeEmailMutation({
      variables: { email },
      refetchQueries: ['user'],
    });
  };

  return {
    removeEmail,
    error,
  };
};

export default useRemoveEmail;
