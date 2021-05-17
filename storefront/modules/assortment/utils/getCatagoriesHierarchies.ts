const getCatagoriesHierarchies = (
  rootAssortments: [{ texts: any; linkedAssortments: any[] }] = [
    {
      texts: {},
      linkedAssortments: [],
    },
  ],
) => {
  const routes = [];

  routes.push({
    path: ['/shop'],
    texts: {
      slug: '/shop',
      title: 'Shop',
    },
    children: [],
  });

  rootAssortments.forEach(({ texts, linkedAssortments }) => {
    routes[0].children.push({
      path: [...routes[0].path, texts.slug],
      texts,
      children: [],
    });

    linkedAssortments.forEach(({ child }) => {
      routes[0].children[routes[0].children.length - 1].children.push({
        path: [
          ...routes[0].children[routes[0].children.length - 1].path,
          child.texts.slug,
        ],
        texts: child.texts,
        children: [],
      });
      child.linkedAssortments.forEach(({ child: secondChild }) => {
        if (
          routes[0].children[routes[0].children.length - 1].children[
            routes[0].children[routes[0].children.length - 1].children.length -
              1
          ].texts._id === secondChild.texts._id
        )
          return;
        routes[0].children[routes[0].children.length - 1].children[
          routes[0].children[routes[0].children.length - 1].children.length - 1
        ].children.push({
          path: [
            ...routes[0].children[routes[0].children.length - 1].children[
              routes[0].children[routes[0].children.length - 1].children
                .length - 1
            ].path,
            secondChild.texts.slug,
          ],
          texts: secondChild.texts,
          children: [],
        });

        secondChild.linkedAssortments.forEach(({ child: thirdChild }) => {
          routes[0].children[routes[0].children.length - 1].children[
            routes[0].children[routes[0].children.length - 1].children.length -
              1
          ].children[
            routes[0].children[routes[0].children.length - 1].children[
              routes[0].children[routes[0].children.length - 1].children
                .length - 1
            ].children.length - 1
          ].children.push({
            path: [
              ...routes[0].children[routes[0].children.length - 1].children[
                routes[0].children[routes[0].children.length - 1].children
                  .length - 1
              ].children[
                routes[0].children[routes[0].children.length - 1].children[
                  routes[0].children[routes[0].children.length - 1].children
                    .length - 1
                ].children.length - 1
              ].path,
              thirdChild.texts.slug,
            ],
            texts: thirdChild.texts,
            children: [],
          });
        });
      });
    });
  });

  return routes;
};

export default getCatagoriesHierarchies;
