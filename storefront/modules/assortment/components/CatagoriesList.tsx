import Link from 'next/link';

import getCatagoriesHierarchy from '../utils/getCatagoriesHierarchy';

const CatagoriesList = ({ assortments, currentPath = '' }) => {
  const routes = getCatagoriesHierarchy(assortments);

  return (
    <div className="assortment-filter">
      {routes.map((r) => {
        return (
          <div className="catagory-box mb-2">
            <div className="mb-3 bold ">{r.texts.title}</div>

            {r.children.map((c) => (
              <>
                <div className="mb-3 bold">{c.texts.title}</div>
                {c.children.map((a) => (
                  <div key={a.texts._id} className="catagory-item">
                    <Link href={`${currentPath}/${a.texts.slug}`}>
                      <a className="catagory-item-label">{a.texts.title}</a>
                    </Link>
                  </div>
                ))}
              </>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default CatagoriesList;
