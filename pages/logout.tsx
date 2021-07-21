import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import useLogoutMutation from '../modules/auth/hooks/useLogout';
import Footer from '../modules/layout/components/Footer';
import Header from '../modules/layout/components/Header';
import MetaTags from '../modules/common/components/MetaTags';

const Logout = () => {
  const { logout } = useLogoutMutation();
  const intl = useIntl();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await logout();
      router.push('/');
    })();
  }, []);

  return (
    <>
      <MetaTags title={intl.formatMessage({ id: 'log_out' })} />
      <Header />
      <div className="container text-center m-5">
        🙏 {intl.formatMessage({ id: 'logged_out' })}
      </div>
      <Footer />
    </>
  );
};

export default Logout;
