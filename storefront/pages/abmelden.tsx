import useLogoutMutation from '../modules/auth/hooks/useLogoutMutation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Logout = () => {
  const { logout } = useLogoutMutation();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await logout();
      // router.push('/');
      // HACK
      window.location.href = '/';
    })();
  }, []);

  return <div className="text-center m-5">Du wirst abgemeldet</div>;
};

export default Logout;
