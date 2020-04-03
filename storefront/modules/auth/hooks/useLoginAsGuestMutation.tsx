import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const LoginAsGuestMutation = gql`
  mutation LoginAsGuest {
    loginAsGuest {
      id
      token
    }
  }
`;

const useLoginAsGuestMutation = () => {
  const [loginAsGuestMutation] = useMutation(LoginAsGuestMutation);

  const loginAsGuest = async () => {
    const result = await loginAsGuestMutation();
    const token = result?.data?.loginAsGuest?.token;

    if (window && window.localStorage && token)
      window.localStorage.setItem('token', token);
  };

  return {
    loginAsGuest,
  };
};

export default useLoginAsGuestMutation;
