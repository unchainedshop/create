import Link from 'next/link';

import CheckoutFooter from '../modules/layout/components/CheckoutFooter';

const ThankYou = () => {
  return (
    <div className="container">
      <Link href="/">
        <a className="color-brand">
          <h3 className="my-2 mr-2">Currybag™</h3>
        </a>
      </Link>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1>Über uns</h1>
          <p>...</p>
        </div>
      </div>
      <CheckoutFooter />
    </div>
  );
};

export default ThankYou;
