import Link from 'next/link';

type categoryItem = {
  navigationTitle: string;
  children: [{ texts: any; _id: string }];
};

const CategoriesList = ({
  assortment,
  currentPath = '',
}: {
  assortment: categoryItem[];
  currentPath: string;
}) => {
  const [tree]: categoryItem[] =
    Object.entries(assortment).map(([, assort]) => assort) || [];
  return (
    <div className="mb-5">
      <div className="mb-3 bold">{tree?.navigationTitle}</div>

      {tree?.children &&
        Object.entries(tree?.children).map(([, { texts, _id }]) => (
          <div key={_id} className="mb-2 ml-2">
            <Link href={`${currentPath}/${texts.slug}`}>
              <a className="mr-2">{texts?.title}</a>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default CategoriesList;
