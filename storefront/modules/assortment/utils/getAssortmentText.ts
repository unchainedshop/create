const getAssortmentText = (
  assortment: [
    {
      texts: { title: string; subtitle: string; description: string };
    },
  ] = [{ texts: { title: '', subtitle: '', description: '' } }],
) => {
  return {
    ...assortment[0].texts,
  };
};

export default getAssortmentText;
