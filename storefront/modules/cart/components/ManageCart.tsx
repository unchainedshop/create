import renderPrice from '../../common/utils/renderPrice';
import useUser from '../../auth/hooks/useUser';
import CartItem from './CartItem';

const ManageCart = () => {
  const { user } = useUser();

  return (
    <div>
      {(user?.cart?.items || []).map((item) => (
        <CartItem key={item._id} {...item} />
      ))}
      <div className="text-right">
        <div className="border-top py-3 mt-0">
          <div className="d-flex flex-wrap justify-content-between">
            <div>VAT included 7.7%</div>
            <div>{renderPrice(user?.cart?.taxes)}</div>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="border-top py-3 mt-0">
          <div className="d-flex flex-wrap justify-content-between">
            <div>Delivery charges</div>
            <div>{renderPrice(user?.cart?.delivery)}</div>
          </div>
        </div>
      </div>
      <div className="text-right">
        <h4 className="border-top border-bottom py-3 mt-0">
          <div className="d-flex flex-wrap justify-content-between">
            <div>Total amount</div>
            <div>{renderPrice(user?.cart?.total)}</div>
          </div>
        </h4>
      </div>
    </div>
  );
};

export default ManageCart;
