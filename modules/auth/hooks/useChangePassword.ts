import { gql, useMutation } from '@apollo/client';

const ChangePasswordMutation = gql`
  mutation changePassword(
    $oldPlainPassword: String
    $newPlainPassword: String
  ) {
    changePassword(
      oldPlainPassword: $oldPlainPassword
      newPlainPassword: $newPlainPassword
    ) {
      success
    }
  }
`;

const useChangePassword = () => {
  const [changePasswordMutation, { loading, error }] = useMutation(
    ChangePasswordMutation,
  );

  const changePassword = async ({ oldPassword, newPassword }) => {
    const { data } = await changePasswordMutation({
      variables: {
        oldPlainPassword: oldPassword,
        newPlainPassword: newPassword,
      },
    });
    return data?.changePassword;
  };

  return {
    changePassword,
    error,
    loading,
  };
};

export default useChangePassword;
