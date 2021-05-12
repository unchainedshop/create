const getAssortmentText = (
  assortment: {
    texts: { title: string; subtitle: string; description: string };
  } = { texts: { title: '', subtitle: '', description: '' } },
) => {
  return {
    ...assortment.texts,
  };
};

export default getAssortmentText;
