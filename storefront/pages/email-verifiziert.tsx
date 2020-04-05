import Link from 'next/link';

import Footer from '../modules/layout/components/Footer';

const VerifiedEmail = () => {
  return (
    <div className="container">
      <Link href="/">
        <a className="color-brand">
          <h3 className="my-2 mr-2">Currybag™</h3>
        </a>
      </Link>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1>Deine E-Mail ist erfolgreich verifiziert worden</h1>
          <p>...</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VerifiedEmail;
