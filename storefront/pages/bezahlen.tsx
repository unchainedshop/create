import { useState } from 'react';
import { useForm } from 'react-hook-form';

import ManageCart from '../modules/cart/components/ManageCart';
import useUserQuery from '../modules/auth/hooks/useUserQuery';
import useUpdateCartMutation from '../modules/checkout/hooks/useUpdateCartMutation';

const EditableField = ({
  register,
  name,
  value,
  isEditing,
  type = 'text',
  required = false,
}) => {
  return isEditing ? (
    <input
      type={type}
      name={name}
      defaultValue={value}
      ref={register({ required })}
    />
  ) : (
    <div>{value}</div>
  );
};

const DeliverySection = () => {
  const { user } = useUserQuery();
  const [isEditing, setEditing] = useState(false);
  const { updateCart } = useUpdateCartMutation();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async ({
    firstName,
    lastName,
    company,
    addressLine,
    postalCode,
    city,
    emailAddress,
    telNumber,
  }) => {
    if (isEditing) {
      await updateCart({
        contact: { emailAddress, telNumber },
        billingAddress: {
          firstName,
          lastName,
          company,
          addressLine,
          postalCode,
          city,
        },
      });

      setEditing(false);
    } else {
      setEditing(true);
    }
  };

  const addressFields = [
    { name: 'firstName', translation: 'Vorname', type: 'text', required: true },
    { name: 'lastName', translation: 'Nachname', type: 'text', required: true },
    { name: 'company', translation: 'Firma', type: 'text', required: false },
    {
      name: 'addressLine',
      translation: 'Adresse',
      type: 'text',
      required: true,
    },
    { name: 'postalCode', translation: 'PLZ', type: 'text', required: true },
    { name: 'city', translation: 'Ort', type: 'text', required: true },
    {
      name: 'emailAddress',
      translation: 'Email',
      type: 'email',
      required: true,
    },
    { name: 'telNumber', translation: 'Telefon', type: 'text', required: true },
  ];

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <table>
        <tbody>
          {addressFields.map(({ name, translation, type, required }) => (
            <tr key={name}>
              <td>
                <b>{translation}</b>
              </td>
              <td>
                <EditableField
                  name={name}
                  value={
                    user?.cart?.billingAddress?.[name] ||
                    user?.cart?.contact?.[name]
                  }
                  register={register}
                  isEditing={isEditing}
                  type={type}
                  required={required}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="button button--primary" type="submit">
        {isEditing ? 'Speichern' : 'Ändern'}
      </button>
    </form>
  );
};

const BillingSection = () => {
  const { user } = useUserQuery();
  const [isEditing, setEditing] = useState(false);
  const { updateCart } = useUpdateCartMutation();
  const { register, handleSubmit, watch } = useForm();

  const sameAsDelivery = watch('same');

  const onSubmit = async ({
    firstName,
    lastName,
    company,
    addressLine,
    postalCode,
    city,
  }) => {
    if (isEditing) {
      // await updateCart({
      //   contact: { emailAddress, telNumber },
      //   billingAddress: {
      //     firstName,
      //     lastName,
      //     company,
      //     addressLine,
      //     postalCode,
      //     city,
      //   },
      // });

      console.log({
        firstName,
        lastName,
        company,
        addressLine,
        postalCode,
        city,
      });

      setEditing(false);
    } else {
      setEditing(true);
    }
  };

  const addressFields = [
    { name: 'firstName', translation: 'Vorname', type: 'text', required: true },
    { name: 'lastName', translation: 'Nachname', type: 'text', required: true },
    { name: 'company', translation: 'Firma', type: 'text', required: false },
    {
      name: 'addressLine',
      translation: 'Adresse',
      type: 'text',
      required: true,
    },
    { name: 'postalCode', translation: 'PLZ', type: 'text', required: true },
    { name: 'city', translation: 'Ort', type: 'text', required: true },
  ];

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="checkbox"
        className="form-check-input"
        id="same"
        name="same"
        ref={register}
        defaultChecked
      />
      <label className={`form-check-label mb-0`} htmlFor="same">
        Gleich wie Lieferadresse
      </label>

      {!sameAsDelivery ? (
        <>
          <table>
            <tbody>
              {addressFields.map(({ name, translation, type, required }) => (
                <tr key={name}>
                  <td>
                    <b>{translation}</b>
                  </td>
                  <td>
                    <EditableField
                      name={name}
                      value={user?.cart?.billingAddress?.[name]}
                      register={register}
                      isEditing={isEditing}
                      type={type}
                      required={required}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="button button--primary" type="submit">
            {isEditing ? 'Speichern' : 'Ändern'}
          </button>
        </>
      ) : (
        ''
      )}
    </form>
  );
};

const Payment = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1>Bezahlen</h1>
          <h2>Bestellübersicht</h2>
          <ManageCart />

          <h2>Lieferadresse</h2>
          <DeliverySection />

          <h2>Rechnungsadresse</h2>
          <BillingSection />
        </div>
      </div>
    </div>
  );
};

export default Payment;
