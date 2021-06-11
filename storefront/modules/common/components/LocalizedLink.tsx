import Link from 'next/link';
import { useIntl } from 'react-intl';

const LocalizedLink = ({ href, children }) => {
  const { locale, formatMessage } = useIntl();
  const normalizedHref = href.split('/');
  let root;
  if (normalizedHref.length === 2) {
    [, root] = normalizedHref;
  }
  return (
    <Link href={`/${formatMessage({ id: `${root}_slug` })}`} locale={locale}>
      {children}
    </Link>
  );
};

export default LocalizedLink;
