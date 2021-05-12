const getCatagoriesHierarchy = (
  rootAssortment: { texts: any; linkedAssortments: any[] } = {
    texts: {},
    linkedAssortments: [],
  },
) => {
  const routes = [];
  const { texts, linkedAssortments = [] } = rootAssortment;
  routes.push({
    texts,
    children: [],
  });
  linkedAssortments.forEach(({ child }) => {
    if (routes[routes.length - 1].texts._id === child.texts._id) return;
    routes[routes.length - 1].children.push({
      texts: child.texts,
      children: [],
    });
  });

  return routes;
};

export default getCatagoriesHierarchy;
