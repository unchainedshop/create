import getProductMediaUrl from '../../products/utils/getProductMediaUrl';
import renderPrice from '../../common/utils/renderPrice';
import useRemoveCartItemMutation from "../hooks/useRemoveCartItemMutation";
import useUserQuery from '../../auth/hooks/useUserQuery';

const ManageCart = () => {
  const { user } = useUserQuery();
  const { removeCartItem } = useRemoveCartItemMutation();
  const handleRemoveClick = (itemId) => () => removeCartItem({ itemId });

  return (
    <div>
      {(user?.cart?.items || []).map((item) => (
        <div
          className="d-flex justify-content-between flex-wrap border-top py-2"
          key={item._id}
        >
          <div className="cart-img mr-2">
            <img src={getProductMediaUrl(item.product)} />
          </div>
          <div className="w-50 mr-2">
            <div>
              {item.quantity} x{item.product.texts.title}
            </div>
          </div>
          <div className="align-self-start">{renderPrice(item.total)}</div>
          <button
            className="no-button align-self-start ml-2"
            type="button"
            onClick={handleRemoveClick(item._id)}
          >
            🗑️
          </button>
        </div>
      ))}
      <div className="text-right">
        <div className="border-top py-3 mt-0">
          <div className="d-flex flex-wrap justify-content-between">
            <div>Enthaltene MwSt. 7.7%</div>
            <div>{renderPrice(user?.cart?.taxes)}</div>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="border-top py-3 mt-0">
          <div className="d-flex flex-wrap justify-content-between">
            <div>Liefergebühren</div>
            <div>{renderPrice(user?.cart?.delivery)}</div>
          </div>
        </div>
      </div>
      <div className="text-right">
        <h3 className="border-top border-bottom py-3 mt-0">
          <div className="d-flex flex-wrap justify-content-between">
            <div>Gesamtbetrag</div>
            <div>{renderPrice(user?.cart?.total)}</div>
          </div>
        </h3>
      </div>
    </div>
  );
};

export default ManageCart;
