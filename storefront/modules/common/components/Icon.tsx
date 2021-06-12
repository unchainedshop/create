const Icon = ({ icon, className = '' }) => (
  <span className={`icon ${className}`}>
    <img src={`/static/img/icon-streamline/${icon}.svg`} alt={icon} />
  </span>
);

export default Icon;
