const Icon = ({ icon, className = '' }) => {
  return (
    <span className={`icon ${className}`}>
      <img src={`/static/img/icon-streamline/${icon}.svg`} />
    </span>
  );
};

export default Icon;
