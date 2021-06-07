import Link from 'next/link';
import { useIntl } from 'react-intl';

import LanguageSwitch from '../../common/components/LanguageSwitch';

const Footer = () => {
  const intl = useIntl();
  return (
    <footer className="footer d-flex flex-wrap justify-content-between container my-5 border-top pt-5">
      <div className="d-flex flex-wrap">
        <Link href="/terms-conditions">
          <a className="mr-4 mb-3">
            {intl.formatMessage({ id: 'conditions' })}
          </a>
        </Link>
        <Link href="/privacy-policy">
          <a className="mr-4 mb-3">{intl.formatMessage({ id: 'privacy' })}</a>
        </Link>
        <Link href="/imprint">
          <a className="mr-4 mb-3">{intl.formatMessage({ id: 'imprint' })}</a>
        </Link>
        <Link href="/about">
          <a className="mr-4 mb-3">{intl.formatMessage({ id: 'about' })}</a>
        </Link>
      </div>
      <div className="d-flex justify-content-around mb-3">
        <LanguageSwitch />
      </div>
    </footer>
  );
};

export default Footer;
