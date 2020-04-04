import Head from 'next/head';
import { useForm } from 'react-hook-form';

const isDev = process.env.NODE_ENV === 'development';

const SignUp = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  const createAccount = watch('account');

  console.log(createAccount, errors);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1>Anmelden</h1>
          <p>Du hast schon einen Account? Dann melde dich hier an:</p>
          <form className="form">
            <div className="form-row">
              <div className="mb-3 col-md-6">
                <label className="form-label">Deine E-Mail Adresse</label>
                <input className="form-control" name="email" disabled />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">Dein vollständiger Name</label>
                <input className="form-control" name="username" disabled />
              </div>
            </div>
            <button className="button button--primary" type="submit" disabled>
              Anmelden (TODO)
            </button>
          </form>
          <h1>Ohne Account bestellen</h1>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="account"
                name="account"
                ref={register}
              />
              <label className="form-check-label mb-0" htmlFor="account">
                Ich möchte einen Account erstellen
              </label>
            </div>
            <div className="form-row">
              <div className="mb-3 col-md-6">
                <label className="form-label">Vorname</label>
                <input
                  className="form-control"
                  name="firstName"
                  defaultValue={isDev && 'Hans'}
                  ref={register}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">Nachname</label>
                <input
                  className="form-control"
                  name="lastName"
                  defaultValue={isDev && 'Muster'}
                  ref={register}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">Firma (optional)</label>
                <input className="form-control" name="company" ref={register} />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">Adresse</label>
                <input
                  className="form-control"
                  name="address"
                  ref={register({ required: true })}
                  defaultValue={isDev && 'Teststrasse 1'}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">PLZ</label>
                <input
                  className="form-control"
                  name="zip"
                  ref={register({ required: true })}
                  defaultValue={isDev && '8001'}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">Ort</label>
                <input
                  className="form-control"
                  name="city"
                  ref={register({ required: true })}
                  defaultValue={isDev && 'Zürich'}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  name="email"
                  ref={register({ required: true })}
                  defaultValue={isDev && 'hans@exmaple.com'}
                />
              </div>
              {createAccount ? (
                <>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Passwort</label>
                    <input
                      className="form-control"
                      name="password"
                      type="password"
                      ref={register({ required: true })}
                      defaultValue={isDev && 'asdf'}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Passwort wiederholen</label>
                    <input
                      className="form-control"
                      name="password2"
                      type="password"
                      ref={register({ required: true })}
                      defaultValue={isDev && 'asdf'}
                    />
                  </div>
                </>
              ) : (
                ''
              )}
            </div>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="agb"
                name="agb"
                ref={register({ required: true })}
              />
              <label className="form-check-label mb-0" htmlFor="agb">
                Ich habe die <a href="/agb">AGBs</a> gelesen
              </label>
            </div>

            <button className="button button--primary" type="submit">
              Registrieren
            </button>
          </form>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
