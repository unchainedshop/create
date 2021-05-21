import Link from 'next/link';

type categoryItem = {
  navigationTitle: string;
  children: [{ texts: any; _id: string }];
};

const categoriesList = ({
  assortment,
  currentPath = '',
}: {
  assortment: categoryItem[];
  currentPath: string;
}) => {
  const [tree]: categoryItem[] =
    Object.entries(assortment).map(([, assort]) => assort) || [];
  return (
    <div className="assortment-filter">
      <div className="category-box mb-2">
        <div className="mb-3 bold ">{tree?.navigationTitle}</div>

        {tree?.children &&
          Object.entries(tree?.children).map(([, { texts, _id }]) => (
            <div key={_id} className="category-item">
              <Link href={`${currentPath}/${texts.slug}`}>
                <a className="category-item-label">{texts?.title}</a>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default categoriesList;
