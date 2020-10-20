import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import useCreateUserMutation from '../modules/auth/hooks/useCreateUserMutation';
import useUpdateCartMutation from '../modules/checkout/hooks/useUpdateCartMutation';
import Header from '../modules/layout/components/Header';
import LoginForm from '../modules/auth/components/LoginForm';
import Footer from '../modules/layout/components/Footer';

const ErrorDisplay = ({ error }) => {
  if (!error) return '';

  if (error.message.includes('Email already exists.')) {
    return (
      <div className="form-error my-3">
        👬 Es existiert bereits ein Benutzer mit dieser E-Mail Adresse.
      </div>
    );
  }

  return (
    <div className="form-error my-3">
      👷‍♀️ Es ist ein unbekannter Fehler aufgetreten.
    </div>
  );
};

const SignUp = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, errors, setError } = useForm();
  const { updateCart } = useUpdateCartMutation();
  const { createUser, error } = useCreateUserMutation();
  const hasErrors = Object.keys(errors).length;

  useEffect(() => {
    if (error?.message?.includes('Email already exists.')) {
      setError(
        'emailAddress',
        'alreadyExists',
        '👬 Es existiert bereits ein Benutzer mit dieser E-Mail Adresse.',
      );
    }
  }, [error]);

  const createAccount = watch('account');

  const onSubmit = async ({
    firstName,
    lastName,
    company,
    addressLine,
    postalCode,
    city,
    emailAddress,
    telNumber,
    account,
    password,
    password2,
  }) => {
    console.log({ account, password, password2 });

    if (account) {
      if (password !== password2) {
        setError('password', 'notMatch', 'Passwörter sind nicht gleich');
        setError('password2', 'notMatch', 'Passwörter sind nicht gleich');
        return false;
      }

      await createUser({ email: emailAddress, password });
    }

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

    router.push('/bezahlen');
  };

  const onLogin = () => router.push('/bezahlen');

  return (
    <div className="container">
      <Header />
      <div className="row">
        <div className="col-lg-6">
          <h2>Anmelden</h2>
          <p>Du hast schon einen Account? Dann melde dich hier an:</p>
          <LoginForm onLogin={onLogin} />
        </div>
        <div className="col-lg-6">
          <h2>Ohne Account bestellen</h2>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-check mb-3">
              <input
                ref={register}
                type="checkbox"
                className="form-check-input"
                id="account"
                name="account"
              />
              <label className="form-check-label mb-0" htmlFor="account">
                Ich möchte einen Account erstellen
              </label>
            </div>
            <div className="form-row">
              <div
                className={`mb-3 col-md-6 ${
                  errors.firstName ? 'form-error' : ''
                }`}
              >
                <label className="form-label">Vorname</label>
                <input
                  ref={register({ required: true })}
                  className="form-control"
                  // DefaultValue={isDev && 'Hans'}
                  name="firstName"
                />
              </div>
              <div
                className={`mb-3 col-md-6 ${
                  errors.lastName ? 'form-error' : ''
                }`}
              >
                <label className="form-label">Nachname</label>
                <input
                  ref={register({ required: true })}
                  className={`form-control ${errors.lastName && 'form-error'}`}
                  // DefaultValue={isDev && 'Muster'}
                  name="lastName"
                />
              </div>
              <div
                className={`mb-3 col-md-6 ${
                  errors.company ? 'form-error' : ''
                }`}
              >
                <label className="form-label">Firma (optional)</label>
                <input ref={register} className="form-control" name="company" />
              </div>
              <div
                className={`mb-3 col-md-6 ${
                  errors.addressLine ? 'form-error' : ''
                }`}
              >
                <label className="form-label">Adresse</label>
                <input
                  ref={register({ required: true })}
                  className={`form-control ${
                    errors.addressLine && 'form-error'
                  }`}
                  name="addressLine"
                  // DefaultValue={isDev && 'Teststrasse 1'}
                />
              </div>
              <div
                className={`mb-3 col-md-6 ${
                  errors.postalCode ? 'form-error' : ''
                }`}
              >
                <label className="form-label">PLZ</label>
                <input
                  ref={register({ required: true })}
                  className={`form-control ${
                    errors.postalCode && 'form-error'
                  }`}
                  name="postalCode"
                  // DefaultValue={isDev && '8001'}
                />
              </div>
              <div
                className={`mb-3 col-md-6 ${errors.city ? 'form-error' : ''}`}
              >
                <label className="form-label">Ort</label>
                <input
                  ref={register({ required: true })}
                  className={`form-control ${errors.city && 'form-error'}`}
                  name="city"
                  // DefaultValue={isDev && 'Zürich'}
                />
              </div>
              <div
                className={`mb-3 col-md-6 ${
                  errors.emailAddress ? 'form-error' : ''
                }`}
              >
                <label className="form-label">E-mail</label>
                <input
                  ref={register({ required: true })}
                  className={`form-control ${
                    errors.emailAddress && 'form-error'
                  }`}
                  name="emailAddress"
                  // DefaultValue={isDev && 'hans@exmaple.com'}
                />
              </div>
              <div
                className={`mb-3 col-md-6 ${
                  errors.telNumber ? 'form-error' : ''
                }`}
              >
                <label className="form-label">Telefon</label>
                <input
                  ref={register({ required: true })}
                  className={`form-control ${errors.telNumber && 'form-error'}`}
                  name="telNumber"
                  // DefaultValue={isDev && '0791234567'}
                />
              </div>
              {createAccount ? (
                <>
                  <div
                    className={`mb-3 col-md-6 ${
                      errors.password ? 'form-error' : ''
                    }`}
                  >
                    <label className="form-label">Passwort</label>
                    <input
                      ref={register({ required: true })}
                      className="form-control"
                      name="password"
                      type="password"
                      // DefaultValue={isDev && 'asdf'}
                    />
                  </div>
                  <div
                    className={`mb-3 col-md-6 ${
                      errors.password2 ? 'form-error' : ''
                    }`}
                  >
                    <label className="form-label">Passwort wiederholen</label>
                    <input
                      ref={register({ required: true })}
                      className="form-control"
                      name="password2"
                      type="password"
                      // DefaultValue={isDev && 'asdf'}
                    />
                  </div>
                </>
              ) : (
                ''
              )}
            </div>
            <div
              className={`form-check mb-3 ${errors.agb ? 'form-error' : ''}`}
            >
              <input
                ref={register({ required: true })}
                type="checkbox"
                className="form-check-input"
                id="agb"
                name="agb"
              />
              <label
                className={`form-check-label mb-0 ${
                  errors.agb && 'form-error'
                }`}
                htmlFor="agb"
              >
                Ich habe die <a href="/agb">AGBs</a> gelesen
              </label>
            </div>

            <ErrorDisplay error={error} />

            <button
              className="button button--primary button--big"
              type="submit"
              disabled={hasErrors}
            >
              Registrieren
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
