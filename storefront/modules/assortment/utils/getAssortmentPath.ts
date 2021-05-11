const getAssortmentPath = (paths = []) => {
  const pathArr = [];
  paths.forEach((p, index) => {
    const { link } = p;
    pathArr.push(link.parent.texts.title);
    if (index === paths.length - 1) pathArr.push(link.child.texts.title);
  });
  return pathArr;
};

export default getAssortmentPath;
