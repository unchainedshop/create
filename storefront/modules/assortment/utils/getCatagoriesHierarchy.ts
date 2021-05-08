const getCatagoriesHierarchy = (rootAssortments = []) => {
  const routes = [];
  let firstLevelIndex = 0;
  let secondLevelIndex = 0;
  rootAssortments.forEach(({ texts, _id, linkedAssortments = [] }, index) => {
    firstLevelIndex = index;
    routes.push({
      texts,
      children: [],
    });
    linkedAssortments.forEach(({ child }, index) => {
      secondLevelIndex = index;

      routes[firstLevelIndex].children.push({
        texts: child.texts,
        children: [],
      });
      child.linkedAssortments.forEach(({ child }) => {
        if (
          routes[firstLevelIndex].children[secondLevelIndex].texts._id !==
          child.texts._id
        )
          routes[firstLevelIndex].children[secondLevelIndex].children.push({
            texts: child.texts,
            children: [],
          });
      });
    });
  });
  return routes;
};

export default getCatagoriesHierarchy;
