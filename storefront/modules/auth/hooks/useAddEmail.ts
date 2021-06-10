import { useMutation, gql } from '@apollo/client';

const AddEmailMutation = gql`
  mutation addEmail($email: String!) {
    addEmail(email: $email) {
      _id
    }
  }
`;

const useaddEmail = () => {
  const [addEmailMutation, { error }] = useMutation(AddEmailMutation);

  const addEmail = async (email) => {
    return addEmailMutation({
      variables: { email },
      refetchQueries: ['user'],
    });
  };

  return {
    addEmail,
    error,
  };
};

export default useaddEmail;
