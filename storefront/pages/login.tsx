import { useRouter } from 'next/router';

import Header from '../modules/layout/components/Header';
import LoginForm from '../modules/auth/components/LoginForm';
import Footer from '../modules/layout/components/Footer';
import MetaTags from '../modules/common/components/MetaTags';

const LogIn = () => {
  const router = useRouter();
  const onLogin = () => router.push('/account');

  return (
    <>
      <MetaTags title="Log in" />
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6 m-auto">
            <h1 className="text-center">Registration</h1>
            <LoginForm onLogin={onLogin} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LogIn;
