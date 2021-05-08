import getCatagoriesHierarchy from '../utils/getCatagoriesHierarchy';

const CatagoriesList = ({ assortments }) => {
  const routes = getCatagoriesHierarchy(assortments);
  return (
    <ul>
      {routes.map((r) => {
        return (
          <li key={r._id}>
            {r.texts.title}
            <ul>
              {r.children.map((c) => (
                <li key={c.texts._id}>
                  {c.texts.title}
                  <ul>
                    {c.children.map((a) => (
                      <li key={a.texts._id}> {a.texts.title}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default CatagoriesList;
