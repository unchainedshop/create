import { useIntl } from 'react-intl';

import MetaTags from '../modules/common/components/MetaTags';
import Footer from '../modules/layout/components/Footer';
import Header from '../modules/layout/components/Header';

const VerifiedEmail = () => {
  const intl = useIntl();
  return (
    <>
      <MetaTags title={intl.formatMessage({ id: 'email_verified_success' })} />
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1>{intl.formatMessage({ id: 'email_verified_success' })}</h1>
            <p>...</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VerifiedEmail;
