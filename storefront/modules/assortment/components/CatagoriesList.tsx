import Link from 'next/link';

type CatagoryItem = {
  navigationTitle: string;
  children: [{ texts: any; _id: string }];
};

const CatagoriesList = ({
  assortment,
  currentPath = '',
}: {
  assortment: CatagoryItem[];
  currentPath: string;
}) => {
  const [tree]: CatagoryItem[] =
    Object.entries(assortment).map(([, assort]) => assort) || [];
  return (
    <div className="assortment-filter">
      <div className="catagory-box mb-2">
        <div className="mb-3 bold ">{tree?.navigationTitle}</div>

        {tree?.children &&
          Object.entries(tree?.children).map(([, { texts, _id }]) => (
            <div key={_id} className="catagory-item">
              <Link href={`${currentPath}/${texts.slug}`}>
                <a className="catagory-item-label">{texts?.title}</a>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CatagoriesList;
