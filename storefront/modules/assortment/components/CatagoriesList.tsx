import Link from 'next/link';

import getCatagoriesHierarchy from '../utils/getCatagoriesHierarchy';

const CatagoriesList = ({ assortment, currentPath = '' }) => {
  const routes = getCatagoriesHierarchy(assortment);

  return (
    <div className="assortment-filter">
      {routes.map((top) => {
        return (
          <div key={top.texts._id} className="catagory-box mb-2">
            <div className="mb-3 bold ">{top.texts.title}</div>

            {top.children.map((child) => (
              <div key={child.texts._id} className="catagory-item">
                <Link href={`${currentPath}/${child.texts.slug}`}>
                  <a className="catagory-item-label">{child.texts.title}</a>
                </Link>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default CatagoriesList;
