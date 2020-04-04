import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

import ManageCart from '../modules/cart/components/ManageCart';
import Header from '../modules/layout/components/Header';
import Footer from '../modules/layout/components/Footer';
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
      className="form-control"
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
      <button className="button button--primary mt-3" type="submit">
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
    <form className="form mb-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="same"
          name="same"
          ref={register}
          defaultChecked
        />
        <label className={`form-check-label mb-5`} htmlFor="same">
          Gleich wie Lieferadresse
        </label>
      </div>
      {!sameAsDelivery ? (
        <>
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
          <button className="button button--primary mt-3 mb-5" type="submit">
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
    <>
      <header className="header sticky-top">
        <div className="container d-flex justify-content-between align-items-center flex-wrap">
          <Link href="/">
            <a className="color-brand">
              <h3 className="my-2 mr-2">Currybag™</h3>
            </a>
          </Link>
        </div>
      </header>
      ;
      <div className="container">
        <h1 className="mt-0">Bezahlen</h1>
        <h2>Bestellübersicht</h2>
        <ManageCart />

        <h2>Lieferadresse</h2>
        <DeliverySection />

        <h2>Rechnungsadresse</h2>
        <BillingSection />
      </div>
    </>
  );
};

export default Payment;
