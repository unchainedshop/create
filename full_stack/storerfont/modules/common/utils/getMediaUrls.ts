const getMediaUrls = ({ media } = { media: [] }) =>
  (media || []).map((m) => m?.file?.url);

export default getMediaUrls;
