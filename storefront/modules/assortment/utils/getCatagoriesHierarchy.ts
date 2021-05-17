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
    child.linkedAssortments.forEach(({ child: secondChild }) => {
      if (
        routes[routes.length - 1].children[
          routes[routes.length - 1].children.length - 1
        ].texts._id === secondChild.texts._id
      )
        return;
      routes[routes.length - 1].children[
        routes[routes.length - 1].children.length - 1
      ].children.push({
        texts: secondChild.texts,
        children: [],
      });
    });
  });

  return routes;
};

export default getCatagoriesHierarchy;
