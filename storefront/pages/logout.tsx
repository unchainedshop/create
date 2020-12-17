import { useEffect } from 'react';
import { useRouter } from 'next/router';

import useLogoutMutation from '../modules/auth/hooks/useLogoutMutation';

const Logout = () => {
  const { logout } = useLogoutMutation();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await logout();
      router.push('/');
    })();
  }, []);

  return <div className="text-center m-5">🙏 Du wirst abgemeldet</div>;
};

export default Logout;
