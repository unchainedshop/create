import { useRouter } from 'next/router';

import Header from '../modules/layout/components/Header';
import LoginForm from '../modules/auth/components/LoginForm';

const SignIn = () => {
  const router = useRouter();
  const onLogin = () => router.push('/kundenkonto');

  return (
    <div className="container">
      <Header />
      <div className="row">
        <div className="col-md-6 m-auto">
          <h1 className="text-center">Anmeldung</h1>
          <LoginForm onLogin={onLogin} />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
