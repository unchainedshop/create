import ManageCart from '../modules/cart/components/ManageCart';
import useUserQuery from '../modules/auth/hooks/useUserQuery';

const Payment = () => {
  const { user } = useUserQuery();

  const addressFields = [
    { name: 'firstName', translation: 'Vorname' },
    { name: 'lastName', translation: 'Nachname' },
    { name: 'company', translation: 'Firma' },
    { name: 'addressLine', translation: 'Adresse' },
    { name: 'postalCode', translation: 'PLZ' },
    { name: 'city', translation: 'Ort' },
  ];

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1>Bezahlen</h1>
          <h2>Bestellübersicht</h2>
          <ManageCart />
          <h2>Lieferadresse</h2>
          <table>
            <tbody>
              {addressFields.map(({ name, translation }) => (
                <tr key={name}>
                  <td>
                    <b>{translation}</b>
                  </td>
                  <td>{name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>Rechnungsadresse</h2>
          <p>Gleich wie Lieferadresse</p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
