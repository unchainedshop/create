import Link from 'next/link';
import { useIntl } from 'react-intl';

const AssortmentBreadcrumbs = ({ paths = [], currentAssortment }) => {
  const intl = useIntl();
  return (
    <nav className="mt-2 mb-4 border-bottom pb-3">
      <Link href="/">
        <a className="mr-2 breadcrumb-link">
          {intl.formatMessage({ id: 'home' })}
        </a>
      </Link>
      <Link href="/shop">
        <a className="mr-2 breadcrumb-link">
          {intl.formatMessage({ id: 'shop' })}
        </a>
      </Link>
      {paths?.map(({ id, slug, title }) => (
        <Link href={`/${slug}`} as={`/${slug}`} key={id}>
          <a className="mr-2 breadcrumb-link">{title}</a>
        </Link>
      ))}
      <a className="breadcrumb-link">
        <b>{currentAssortment?.title}</b>
      </a>
      <style jsx>
        {`
          .breadcrumb-link {
            font-size: 0.875rem;
          }
          .breadcrumb-link::after {
            content: '〉';
            font-size: 12px;
            display: inline-block;
            width: 10px;
            height: 10px;
            margin-left: 1em;
          }
          .breadcrumb-link:last-of-type::after {
            content: '';
          }
        `}
      </style>
    </nav>
  );
};

export default AssortmentBreadcrumbs;
