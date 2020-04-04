import Head from 'next/head';
import Header from '../modules/layout/components/Header';

const SignIn = () => (
  <div className="container">
    <Header />
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <h1>Anmeldung</h1>
        <form className="form">
          <div className="form-row">
            <div className="mb-3 col-md-6">
              <label className="form-label">Deine E-Mail Adresse</label>
              <input className="form-control" name="email" />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">Dein Passwort</label>
              <input className="form-control" name="password" />
            </div>
          </div>
          <button className="button button--primary" type="submit">
            Anmelden
          </button>
        </form>
      </div>
    </div>
  </div>
);

export default SignIn;
