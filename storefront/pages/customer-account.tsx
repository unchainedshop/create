import useUserQuery from '../modules/auth/hooks/useUserQuery';
import COUNTRIES from '../modules/common/data/countries-list';
import Footer from '../modules/layout/components/Footer';
import Header from '../modules/layout/components/Header';

const Account = () => {
  const { user } = useUserQuery();
  console.log(user);
  return (
    <div className="container">
      <Header />
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1>Customer account</h1>
          <div>
            <ol>
              <dt> Username </dt> <dd> {user?.username} </dd>
              <dt> is Guest </dt> <dd> {user?.isGuest} </dd>
              <dt> name </dt> <dd> {user?.name} </dd>
              <dt> Email </dt>{' '}
              <dd>
                {' '}
                {user?.emails?.[0]?.address} <b> Verified</b>{' '}
                {user?.emails?.[0]?.verified}{' '}
              </dd>
              <dt>Number of orders </dt> <dd> {user?.order?.length || 0}</dd>
              <dt>Display name</dt> <dd> {user?.profile?.displayName} </dd>
              <dt>First name</dt> <dd> {user?.profile?.address?.firstName} </dd>
              <dt>Last name</dt> <dd> {user?.profile?.address?.lastName} </dd>
              <dt>Company</dt> <dd> {user?.profile?.address?.Company} </dd>
              <dt>Main address</dt>{' '}
              <dd> {user?.profile?.address?.addressLine} </dd>
              <dt>Secondary address</dt>{' '}
              <dd> {user?.profile?.address?.addressLine2} </dd>
              <dt>Phone</dt> <dd> {user?.profile?.phoneMobile} </dd>
              <dt>Postal Code</dt>{' '}
              <dd> {user?.profile?.address?.postalCode} </dd>
              <dt>City</dt> <dd> {user?.profile?.address?.city} </dd>
              <dt>Region</dt> <dd> {user?.profile?.address?.regionCode} </dd>
              <dt>Country</dt>{' '}
              <dd>
                {' '}
                {
                  COUNTRIES.filter(
                    (c) => c.code === user?.profile?.address?.countryCode,
                  )[0]?.name
                }{' '}
              </dd>
            </ol>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
