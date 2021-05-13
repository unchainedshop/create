import { useEffect } from 'react';
import { useRouter } from 'next/router';

import useLogoutMutation from '../modules/auth/hooks/useLogout';

const Logout = () => {
  const { logout } = useLogoutMutation();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await logout();
      router.push('/');
    })();
  }, []);

  return <div className="text-center m-5">🙏 You will be logged out</div>;
};

export default Logout;
