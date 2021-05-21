import Link from 'next/link';

const AssortmentBreadcrumbs = ({ paths = [], currentAssortment }) => {
  return (
    <nav className="mt-2 mb-4">
      <Link href="/">
        <a className="mr-2 breadcrumb-link">Home</a>
      </Link>
      <Link href="/shop">
        <a className="mr-2 breadcrumb-link">Shop</a>
      </Link>
      {paths?.map(({ id, slug, title }) => (
        <Link href={`/${slug}`} as={`/${slug}`} key={id}>
          <a className="mr-2 breadcrumb-link">{title}</a>
        </Link>
      ))}
      <a>
        <b>{currentAssortment?.title}</b>
      </a>
      <style jsx>{`
        .breadcrumb-link::after {
          content: "〉";
          font-size: 12px;
          display: inline-block;
          width: 10px;
          height: 10px;
          margin-left: 1em;
         }
      `}
      </style>
    </nav>
  );
};

export default AssortmentBreadcrumbs;
