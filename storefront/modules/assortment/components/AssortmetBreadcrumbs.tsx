import Link from 'next/link';

const AssortmetBreadcrumbs = ({ paths = [], currentAssortment }) => {
  return (
    <nav className="breadcrumb">
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/shop">
        <a>Shop</a>
      </Link>
      {paths?.map(({ id, slug, title }) => (
        <Link href={slug} as={slug} key={id}>
          <a>{title}</a>
        </Link>
      ))}
      <a>
        <b>{currentAssortment?.title}</b>
      </a>
    </nav>
  );
};

export default AssortmetBreadcrumbs;
