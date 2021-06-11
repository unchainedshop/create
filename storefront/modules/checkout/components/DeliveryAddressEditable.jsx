import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import useUpdateCart from '../hooks/useUpdateCart';
import useUpdateOrderDeliveryShipping from '../hooks/useUpdateDeliveryShipping';
import EditableField from '../../common/components/EditableField';

const DeliveryAddressEditable = ({ user }) => {
  const [isEditing, setEditing] = useState(false);
  const intl = useIntl();
  const { updateCart } = useUpdateCart();
  const { register, handleSubmit } = useForm();
  const { updateOrderDeliveryAddress } = useUpdateOrderDeliveryShipping();

  const onSubmit = async ({
    firstName,
    lastName,
    company,
    addressLine,
    postalCode,
    countryCode,
    city,
    emailAddress,
    telNumber,
    message,
  }) => {
    if (isEditing) {
      if (user?.cart?.deliveryInfo?.address) {
        updateOrderDeliveryAddress({
          orderDeliveryId: user?.cart?.deliveryInfo?._id,
          address: {
            firstName,
            lastName,
            company,
            addressLine,
            postalCode,
            countryCode,
            city,
          },
        });
        updateCart({
          orderId: user?.cart?._id,
          contact: { emailAddress, telNumber },
          meta: { message },
        });
      } else {
        updateCart({
          orderId: user?.cart?._id,
          contact: { emailAddress, telNumber },
          billingAddress: {
            firstName,
            lastName,
            company,
            addressLine,
            postalCode,
            countryCode,
            city,
          },
          meta: { message },
        });
      }

      setEditing(false);
    } else {
      setEditing(true);
    }
  };

  const addressFields = [
    {
      name: 'firstName',
      translation: intl.formatMessage({ id: 'first_name' }),
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      translation: intl.formatMessage({ id: 'last_name' }),
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      translation: `${intl.formatMessage({
        id: 'company',
      })} ${intl.formatMessage({ id: 'optional' })}`,
      type: 'text',
      required: false,
    },
    {
      name: 'addressLine',
      translation: intl.formatMessage({ id: 'address' }),
      type: 'text',
      required: true,
    },
    {
      name: 'postalCode',
      translation: intl.formatMessage({ id: 'postal_code' }),
      type: 'text',
      required: true,
    },
    {
      name: 'city',
      translation: intl.formatMessage({ id: 'city' }),
      type: 'text',
      required: true,
    },
    {
      name: 'countryCode',
      translation: intl.formatMessage({ id: 'country' }),
      type: 'country',
      required: true,
    },

    {
      name: 'emailAddress',
      translation: intl.formatMessage({ id: 'email' }),
      type: 'email',
      required: true,
    },
    {
      name: 'telNumber',
      translation: intl.formatMessage({ id: 'telephone' }),
      type: 'text',
      required: true,
    },
  ];

  return (
    <form className="form border-top" onSubmit={handleSubmit(onSubmit)}>
      <div>
        {addressFields.map(({ name, translation, type, required }) => (
          <div
            className="d-flex flex-wrap justify-content-start align-items-center my-2"
            key={name}
          >
            <div className="col-md-4 my-1 pl-0">
              <b>{translation}</b>
            </div>
            <div className="col-md-8 my-1 pl-0">
              <EditableField
                name={name}
                value={
                  user?.cart?.deliveryInfo?.address?.[name] ||
                  user?.cart?.billingAddress?.[name] ||
                  user?.cart?.contact?.[name]
                }
                register={register}
                isEditing={isEditing}
                type={type}
                required={required}
              />
            </div>
          </div>
        ))}
      </div>
      <button className="button button--secondary mt-3" type="submit">
        {isEditing
          ? intl.formatMessage({ id: 'save' })
          : intl.formatMessage({ id: 'change' })}
      </button>
    </form>
  );
};

export default DeliveryAddressEditable;
