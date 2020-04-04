import { useRouter } from 'next/router';

import Header from '../modules/layout/components/Header';

const PasswordForget = () => {
  const router = useRouter();
  const onLogin = () => router.push('/kundenkonto');

  return (
    <div className="container">
      <Header />
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1>Passwort vergessen</h1>
          <form className="form">
            <label className="form-label">Deine E-Mail Adresse</label>
            <input className="form-control" name="email" type="email" />
            <button
              className="button button--primary button--big mt-3"
              type="submit"
            >
              Passwort zurücksetzen
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordForget;
