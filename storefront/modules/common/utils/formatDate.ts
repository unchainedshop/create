const formatDate = (
  timestamp: number = new Date().getUTCMilliseconds(),
): string => {
  const date = new Date(timestamp);
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};

export default formatDate;
