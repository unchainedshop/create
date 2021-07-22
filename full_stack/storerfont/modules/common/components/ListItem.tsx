const ListItem = ({ title = '', value = '' } = {}) => {
  return (
    <div className="text-right">
      <div className="border-top py-3 mt-0">
        <div className="d-flex flex-wrap justify-content-between">
          <div>{title}</div>
          <div>{value}</div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
