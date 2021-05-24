const getMediaUrl = ({ media } = { media: [] }) => {
  const firstMedia = media?.[0] || {};
  return firstMedia?.file?.url;
};

export default getMediaUrl;
