import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import useUpdateCart from '../hooks/useUpdateCart';
import EditableField from '../../common/components/EditableField';

const BillingAddressEditable = ({ user }) => {
  const [isEditing, setEditing] = useState(false);
  const intl = useIntl();
  const { updateCart } = useUpdateCart();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    setEditing(!user?.cart?.billingAddress);
  }, [user]);

  const onSubmit = async ({
    firstName,
    lastName,
    company,
    addressLine,
    postalCode,
    countryCode,
    city,
  }) => {
    if (isEditing) {
      await updateCart({
        orderId: user?.cart?._id,
        billingAddress: {
          firstName,
          lastName,
          company,
          addressLine,
          postalCode,
          city,
          countryCode,
        },
      });

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
      })} ${intl.formatMessage({ id: 'optional' })} `,
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
  ];

  return (
    <>
      {' '}
      {!user?.cart?.deliveryInfo?.address ? (
        ''
      ) : (
        <form
          className="form border-top mb-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            {addressFields.map(({ name, translation, type, required }) => (
              <div
                className="row d-flex justify-content-start align-items-center my-2"
                key={name}
              >
                <div className="col-md-4 my-1">
                  <b>{translation}</b>
                </div>
                <div className="col-md-8 my-1">
                  <EditableField
                    name={name}
                    value={user?.cart?.billingAddress?.[name]}
                    register={register}
                    isEditing={isEditing}
                    type={type}
                    required={required}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="button button--secondary mt-3 mb-5" type="submit">
            {isEditing
              ? intl.formatMessage({ id: 'save' })
              : intl.formatMessage({ id: 'change' })}
          </button>
        </form>
      )}
    </>
  );
};

export default BillingAddressEditable;
