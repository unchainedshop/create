import { useMutation, gql } from '@apollo/client';

const ResendVerificationEmailMutation = gql`
  mutation sendVerificationEmail($email: String!) {
    sendVerificationEmail(email: $email) {
      success
    }
  }
`;

const useResendVerificationEmail = () => {
  const [resendVerificationEmailMutation, { error }] = useMutation(
    ResendVerificationEmailMutation,
  );

  const resendVerificationEmail = async (email) => {
    return resendVerificationEmailMutation({
      variables: { email },
      refetchQueries: ['user'],
    });
  };

  return {
    resendVerificationEmail,
    error,
  };
};

export default useResendVerificationEmail;
