import { useIntl } from 'react-intl';

import LanguageSwitch from '../../common/components/LanguageSwitch';
import LocalizedLink from '../../common/components/LocalizedLink';

const Footer = () => {
  const intl = useIntl();
  return (
    <footer className="footer d-flex flex-wrap justify-content-between container my-5 border-top pt-5">
      <div className="d-flex flex-wrap">
        <LocalizedLink href="/terms-conditions">
          <a className="mr-4 mb-3">
            {intl.formatMessage({ id: 'conditions' })}
          </a>
        </LocalizedLink>
        <LocalizedLink href="/privacy-policy">
          <a className="mr-4 mb-3">{intl.formatMessage({ id: 'privacy' })}</a>
        </LocalizedLink>
        <LocalizedLink href="/imprint">
          <a className="mr-4 mb-3">{intl.formatMessage({ id: 'imprint' })}</a>
        </LocalizedLink>
        <LocalizedLink href="/about">
          <a className="mr-4 mb-3">{intl.formatMessage({ id: 'about' })}</a>
        </LocalizedLink>
      </div>
      <div className="d-flex justify-content-around mb-3">
        <LanguageSwitch />
      </div>
    </footer>
  );
};

export default Footer;
