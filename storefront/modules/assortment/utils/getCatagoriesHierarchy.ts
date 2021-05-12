const getCatagoriesHierarchy = (rootAssortments = []) => {
  const routes = [];
  rootAssortments.forEach(({ texts, linkedAssortments = [] }) => {
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
      child.linkedAssortments.forEach(({ child: thridChild }) => {
        if (
          routes[routes.length - 1].children[
            routes[routes.length - 1].children.length - 1
          ].texts._id === thridChild.texts._id
        )
          return;
        routes[routes.length - 1].children[
          routes[routes.length - 1].children.length - 1
        ].children.push({
          texts: thridChild.texts,
          children: [],
        });
      });
    });
  });

  return routes;
};

export default getCatagoriesHierarchy;
