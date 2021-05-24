const getAssortmentMediaUrl = (product) => {
  const media = product?.media || [];

  const firstMedia = media[0];

  return firstMedia?.file?.url;
};

export default getAssortmentMediaUrl;
