import Link from 'next/link';
import { useIntl } from 'react-intl';

import LanguageSwitch from '../../common/components/LanguageSwitch';
import ROUTES_CONFIG from '../../common/utils/getRouteConfig';

const Footer = () => {
  const intl = useIntl();
  return (
    <footer className="footer container my-5 border-top pt-5">
      <div className="d-flex justify-content-center">
        <Link
          href={`/${intl.formatMessage({ id: ROUTES_CONFIG.conditions.slug })}`}
        >
          <a className="link m-4">{intl.formatMessage({ id: 'conditions' })}</a>
        </Link>
        <Link
          href={`/${intl.formatMessage({ id: ROUTES_CONFIG.privacy.slug })}`}
        >
          <a className="link m-4">{intl.formatMessage({ id: 'privacy' })}</a>
        </Link>
        <Link
          href={`/${intl.formatMessage({ id: ROUTES_CONFIG.imprint.slug })}`}
        >
          <a className="link m-4">{intl.formatMessage({ id: 'imprint' })}</a>
        </Link>
        <Link href={`/${intl.formatMessage({ id: ROUTES_CONFIG.about.slug })}`}>
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
