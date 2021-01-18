import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const ForgotPasswordMutation = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email) {
      success
    }
  }
`;

const useForgotPassword = () => {
  const [forgotPasswordMutation, { loading, error }] = useMutation(
    ForgotPasswordMutation,
  );

  const forgotPassword = async ({ email }) => {
    const { data } = await forgotPasswordMutation({ variables: { email } });

    return data?.forgotPassword;
  };

  return { forgotPassword, error, loading };
};

export default useForgotPassword;
