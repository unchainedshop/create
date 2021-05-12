const extractText = ({ texts }) => {
  return {
    id: texts._id,
    slug: texts.slug,
    title: texts.title,
  };
};

const getAssortmentPath = (paths = []) => {
  const pathArr = [];
  paths.forEach((p) => {
    const { link } = p;
    pathArr.push(extractText(link.parent));
  });
  return pathArr;
};

export default getAssortmentPath;
