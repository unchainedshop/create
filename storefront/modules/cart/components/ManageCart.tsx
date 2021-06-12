import { useIntl } from 'react-intl';

import renderPrice from '../../common/utils/renderPrice';
import CartItem from './CartItem';

const ManageCart = ({ user }) => {
  const intl = useIntl();
  return (
    <div>
      {(user?.cart?.items || []).map((item) => (
        <CartItem key={item._id} {...item} />
      ))}
      <div className="text-right">
        <div className="border-top py-3 mt-0">
          <div className="d-flex flex-wrap justify-content-between">
            <div>{intl.formatMessage({ id: 'vat_included' })} 7.7%</div>
            <div>{renderPrice(user?.cart?.taxes)}</div>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="border-top py-3 mt-0">
          <div className="d-flex flex-wrap justify-content-between">
            <div>{intl.formatMessage({ id: 'delivery_charges' })}</div>
            <div>{renderPrice(user?.cart?.delivery)}</div>
          </div>
        </div>
      </div>
      <div className="text-right">
        <h4 className="border-top border-bottom py-3 mt-0">
          <div className="d-flex flex-wrap justify-content-between">
            <div>{intl.formatMessage({ id: 'total_amount' })}</div>
            <div>{renderPrice(user?.cart?.total)}</div>
          </div>
        </h4>
      </div>
    </div>
  );
};

export default ManageCart;
