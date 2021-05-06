import { useState } from 'react';
import { useForm } from 'react-hook-form';

import useUpdateCartMutation from '../hooks/useUpdateCartMutation';
import useUpdateOrderDeliveryShipping from '../hooks/useUpdateDeliveryShipping';
import EditableField from '../../common/components/EditableField';

const DeliveryAddressEditable = ({ user, sameForBilling = false }) => {
  const [isEditing, setEditing] = useState(false);
  const { updateCart } = useUpdateCartMutation();
  const { register, handleSubmit, errors } = useForm();
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
          contact: { emailAddress, telNumber },
          meta: { message },
        });
      } else {
        updateCart({
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
      translation: 'First name',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      translation: 'Last name',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      translation: 'Company (optional)',
      type: 'text',
      required: false,
    },
    {
      name: 'addressLine',
      translation: 'Address',
      type: 'text',
      required: true,
    },
    {
      name: 'postalCode',
      translation: 'Postal code',
      type: 'text',
      required: true,
    },
    { name: 'city', translation: 'City', type: 'text', required: true },
    {
      name: 'countryCode',
      translation: 'Country',
      type: 'country',
      required: true,
    },

    {
      name: 'emailAddress',
      translation: 'Email',
      type: 'email',
      required: true,
    },
    {
      name: 'telNumber',
      translation: 'Telephone',
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
        <div className="d-flex flex-wrap justify-content-start align-items-center my-2">
          <div className="col-md-12 my-1 pl-0">
            <label className="form-label">Message (optional)</label>
            {isEditing ? (
              <textarea
                className="form-control"
                defaultValue={user?.cart?.meta?.message}
                name="message"
                ref={register}
                placeholder="Special instructions etc."
              />
            ) : (
              <div>{user?.cart?.meta?.message}</div>
            )}
          </div>
        </div>
      </div>
      <button className="button button--secondary mt-3" type="submit">
        {isEditing ? 'Save' : 'Change'}
      </button>
    </form>
  );
};

export default DeliveryAddressEditable;
