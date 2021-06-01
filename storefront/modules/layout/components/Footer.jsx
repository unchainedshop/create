import Link from 'next/link';
import { useIntl } from 'react-intl';

import LanguageSwitch from '../../common/components/LanguageSwitch';

const Footer = () => {
  const intl = useIntl();
  return (
    <footer className="footer container my-5 border-top pt-5">
      <div className="d-flex justify-content-center">
        <Link href="/conditions">
          <a className="link m-4">
            {' '}
            {intl.formatMessage({ id: 'conditions' })}
          </a>
        </Link>
        <Link href="/privacy">
          <a className="link m-4">{intl.formatMessage({ id: 'privacy' })}</a>
        </Link>
        <Link href="/imprint">
          <a className="link m-4">{intl.formatMessage({ id: 'imprint' })}</a>
        </Link>
        <Link href="/about">
          <a className="link m-4">{intl.formatMessage({ id: 'about' })}</a>
        </Link>
      </div>
      <div className="d-flex justify-content-around mt-3">
        <LanguageSwitch />
      </div>
    </footer>
  );
};

export default Footer;
