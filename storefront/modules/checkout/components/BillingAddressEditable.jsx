import useUpdateCartMutation from '../hooks/useUpdateCartMutation';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import EditableField from '../../common/components/EditableField';

const BillingAddressEditable = ({ user }) => {
  const [isEditing, setEditing] = useState(false);
  const { updateCart } = useUpdateCartMutation();
  const { register, handleSubmit } = useForm();

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
      translation: 'First Name',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      translation: 'Last Name',
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
            {isEditing ? 'Save' : 'Change'}
          </button>
        </form>
      )}
    </>
  );
};

export default BillingAddressEditable;
