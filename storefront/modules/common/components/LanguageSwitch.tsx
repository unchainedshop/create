import React from 'react';
import { useIntl } from 'react-intl';

import changeLanguage from '../utils/changeLanguage';

const LanguageSwitch = () => {
  const intl = useIntl();
  const currentLang = intl.locale.split('-')[0];

  return (
    <div className="select-wrap language-select">
      <label htmlFor="language-switcher" className="d-none">
        Choose a language
      </label>
      <select
        value={currentLang}
        onChange={(e) => changeLanguage(e.target.value)}
        id="language-switcher"
      >
        <option value="de">DE</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
};

export default LanguageSwitch;
