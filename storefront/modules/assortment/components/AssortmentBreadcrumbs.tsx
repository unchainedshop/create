import { useIntl } from 'react-intl';
import LocalizedLink from '../../common/components/LocalizedLink';

const AssortmentBreadcrumbs = ({ paths = [], currentAssortment }) => {
  const intl = useIntl();

  return (
    <nav className="mt-2 mb-4 border-bottom pb-3">
      <LocalizedLink href="/">
        <a className="mr-2 breadcrumb-link">
          {intl.formatMessage({ id: 'home' })}
        </a>
      </LocalizedLink>
      <LocalizedLink href="/shop">
        <a className="mr-2 breadcrumb-link">
          {intl.formatMessage({ id: 'shop' })}
        </a>
      </LocalizedLink>
      {paths?.map(({ id, slug, title }) => (
        <LocalizedLink href={`/${slug}`} key={id}>
          <a className="mr-2 breadcrumb-link">{title}</a>
        </LocalizedLink>
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
