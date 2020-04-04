import { useState } from 'react';
import { useForm } from 'react-hook-form';

import ManageCart from '../modules/cart/components/ManageCart';
import useUserQuery from '../modules/auth/hooks/useUserQuery';
import useUpdateCartMutation from '../modules/checkout/hooks/useUpdateCartMutation';

const EditableField = ({ register, name, value, isEditing }) => {
  return isEditing ? (
    <input type="text" name={name} defaultValue={value} ref={register} />
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
        },
      });

      console.log('finished');
      setEditing(false);
    } else {
      setEditing(true);
    }
  };

  const addressFields = [
    { name: 'firstName', translation: 'Vorname' },
    { name: 'lastName', translation: 'Nachname' },
    { name: 'company', translation: 'Firma' },
    { name: 'addressLine', translation: 'Adresse' },
    { name: 'postalCode', translation: 'PLZ' },
    { name: 'city', translation: 'Ort' },
  ];

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <table>
        <tbody>
          {addressFields.map(({ name, translation }) => (
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
          <p>Gleich wie Lieferadresse</p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
