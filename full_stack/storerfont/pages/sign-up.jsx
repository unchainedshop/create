import { useIntl } from 'react-intl';

import SignUpForm from '../modules/auth/components/SignUpForm';
import MetaTags from '../modules/common/components/MetaTags';
import Footer from '../modules/layout/components/Footer';
import Header from '../modules/layout/components/Header';

const SignUp = () => {
  const intl = useIntl();
  return (
    <>
      <MetaTags title={intl.formatMessage({ id: 'sign_up' })} />
      <Header />
      <SignUpForm />
      <Footer />
    </>
  );
};

export default SignUp;
