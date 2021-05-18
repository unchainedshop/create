const childrenArrayToNavigationIdObject = (children, path = ['shop']) =>
  children.reduce(
    (acc, curr, index) => ({
      ...acc,
      [curr._id]: {
        ...curr,
        path: [...path, curr.texts.slug],
        slug: curr.texts.slug,
        texts: curr.texts,
        navigationTitle: curr.texts.title,
        index,
      },
    }),
    {},
  );

export default childrenArrayToNavigationIdObject;
