import Link from 'next/link';
import useUserQuery from '../modules/auth/hooks/useUserQuery';

import Footer from '../modules/layout/components/Footer';

const AboutUs = () => {
  const { user } = useUserQuery();
  return (
    <div className="container">
      <Link href="/">
        <a className="color-brand">
          <h3 className="my-2 mr-2">
            Hi {user?.profile?.displayName || user?.username}
          </h3>
        </a>
      </Link>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1>about us</h1>
          <p>...</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
