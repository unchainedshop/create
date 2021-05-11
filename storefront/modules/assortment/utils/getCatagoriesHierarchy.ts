const getCatagoriesHierarchy = (rootAssortments = []) => {
  const routes = [];
  let firstLevelIndex = 0;
  let secondLevelIndex = 0;
  rootAssortments.forEach(({ texts, linkedAssortments = [] }, index) => {
    firstLevelIndex = index;
    routes.push({
      texts,
      children: [],
    });
    linkedAssortments.forEach(({ child }, secondIndex) => {
      secondLevelIndex = secondIndex;
      if (routes[firstLevelIndex].texts._id === child.texts._id) return;
      routes[firstLevelIndex].children.push({
        texts: child.texts,
        children: [],
      });
      child.linkedAssortments.forEach(({ child: thridChild }) => {
        if (
          routes[firstLevelIndex].children[secondLevelIndex].texts._id ===
          thridChild.texts._id
        )
          return;
        routes[firstLevelIndex].children[secondLevelIndex].children.push({
          texts: thridChild.texts,
          children: [],
        });
      });
    });
  });

  return routes;
};

export default getCatagoriesHierarchy;
