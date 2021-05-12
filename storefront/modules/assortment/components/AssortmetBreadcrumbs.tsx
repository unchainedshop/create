import Link from 'next/link';

const AssortmetBreadcrumbs = ({ paths = [], currentAssortment }) => {
  return (
    <nav className="breadcrumb">
      <Link href="/">
        <a className="breadcrumb__link">Home</a>
      </Link>
      <Link href="/shop">
        <a className="breadcrumb__link">Shop</a>
      </Link>
      {paths?.map(({ id, slug, title }) => (
        <Link href={slug} as={slug} key={id}>
          <a className="breadcrumb__link">{title}</a>
        </Link>
      ))}
      <a className="breadcrumb__link">
        <b>{currentAssortment?.title}</b>
      </a>
    </nav>
  );
};

export default AssortmetBreadcrumbs;
