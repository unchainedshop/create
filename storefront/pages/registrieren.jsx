import Head from 'next/head';

const SignUp = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <h1>Registriere Dich</h1>
        <form className="form">
          <div className="form-row">
            <div className="mb-3 col-md-6">
              <label className="form-label">Deine E-Mail Adresse</label>
              <input className="form-control" name="email" />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">Dein vollständiger Name</label>
              <input className="form-control" name="username" />
            </div>
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label mb-0" for="exampleCheck1">
              Ich habe die <a href="/agb">AGBs</a> gelesen
            </label>
          </div>
          <button className="button button--primary" type="submit">
            Registrieren
          </button>
        </form>
      </div>
    </div>
  </div>
);

export default SignUp;
