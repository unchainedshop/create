import useUserQuery from '../modules/auth/hooks/useUserQuery';
import Header from '../modules/layout/components/Header';

const Account = () => {
  const { user } = useUserQuery();
  return (
    <div className="container">
      <Header />
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1>Customer account</h1>
          <code> {JSON.stringify(user)} </code>
        </div>
      </div>
    </div>
  );
};

export default Account;
