const getProductMediaUrls = (product) =>
  (product?.media || []).map((media) => media?.file?.url);

export default getProductMediaUrls;
