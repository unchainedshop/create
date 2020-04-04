import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import useCreateUserMutation from '../modules/auth/hooks/useCreateUserMutation';
import useUpdateCartMutation from '../modules/checkout/hooks/useUpdateCartMutation';
import Header from '../modules/layout/components/Header';
import Footer from '../modules/layout/components/Footer';
import LoginForm from '../modules/auth/components/LoginForm';

const isDev = process.env.NODE_ENV === 'development';

const ErrorDisplay = ({ error }) => {
  if (!error) return '';

  if (error.message.includes('Email already exists.')) {
    return (
      <div className="form-error my-3">
        Es existiert bereits ein Benutzer mit dieser Email Adresse
      </div>
    );
  }

  return (
    <div className="form-error my-3">
      Es ist ein unbekannter Fehler aufgetreten
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
        'Es existiert bereits ein Benutzer mit dieser Email Adresse',
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
      } else {
        await createUser({ email: emailAddress, password });
      }
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
      <h1>Anmelden</h1>
      <p>Du hast schon einen Account? Dann melde dich hier an:</p>
      <LoginForm onLogin={onLogin} />

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
          <div
            className={`mb-3 col-md-6 ${
              errors['firstName'] ? 'form-error' : ''
            }`}
          >
            <label className="form-label">Vorname</label>
            <input
              className="form-control"
              name="firstName"
              defaultValue={isDev && 'Hans'}
              ref={register({ required: true })}
            />
          </div>
          <div
            className={`mb-3 col-md-6 ${
              errors['lastName'] ? 'form-error' : ''
            }`}
          >
            <label className="form-label">Nachname</label>
            <input
              className={`form-control ${errors['lastName'] && 'form-error'}`}
              name="lastName"
              defaultValue={isDev && 'Muster'}
              ref={register({ required: true })}
            />
          </div>
          <div
            className={`mb-3 col-md-6 ${errors['company'] ? 'form-error' : ''}`}
          >
            <label className="form-label">Firma (optional)</label>
            <input className="form-control" name="company" ref={register} />
          </div>
          <div
            className={`mb-3 col-md-6 ${
              errors['addressLine'] ? 'form-error' : ''
            }`}
          >
            <label className="form-label">Adresse</label>
            <input
              className={`form-control ${
                errors['addressLine'] && 'form-error'
              }`}
              name="addressLine"
              ref={register({ required: true })}
              defaultValue={isDev && 'Teststrasse 1'}
            />
          </div>
          <div
            className={`mb-3 col-md-6 ${
              errors['postalCode'] ? 'form-error' : ''
            }`}
          >
            <label className="form-label">PLZ</label>
            <input
              className={`form-control ${errors['postalCode'] && 'form-error'}`}
              name="postalCode"
              ref={register({ required: true })}
              defaultValue={isDev && '8001'}
            />
          </div>
          <div
            className={`mb-3 col-md-6 ${errors['city'] ? 'form-error' : ''}`}
          >
            <label className="form-label">Ort</label>
            <input
              className={`form-control ${errors['city'] && 'form-error'}`}
              name="city"
              ref={register({ required: true })}
              defaultValue={isDev && 'Zürich'}
            />
          </div>
          <div
            className={`mb-3 col-md-6 ${
              errors['emailAddress'] ? 'form-error' : ''
            }`}
          >
            <label className="form-label">Email</label>
            <input
              className={`form-control ${
                errors['emailAddress'] && 'form-error'
              }`}
              name="emailAddress"
              ref={register({ required: true })}
              defaultValue={isDev && 'hans@exmaple.com'}
            />
          </div>
          <div
            className={`mb-3 col-md-6 ${
              errors['telNumber'] ? 'form-error' : ''
            }`}
          >
            <label className="form-label">Telefon</label>
            <input
              className={`form-control ${errors['telNumber'] && 'form-error'}`}
              name="telNumber"
              ref={register({ required: true })}
              defaultValue={isDev && '0791234567'}
            />
          </div>
          {createAccount ? (
            <>
              <div
                className={`mb-3 col-md-6 ${
                  errors['password'] ? 'form-error' : ''
                }`}
              >
                <label className="form-label">Passwort</label>
                <input
                  className="form-control"
                  name="password"
                  type="password"
                  ref={register({ required: true })}
                  defaultValue={isDev && 'asdf'}
                />
              </div>
              <div
                className={`mb-3 col-md-6 ${
                  errors['password2'] ? 'form-error' : ''
                }`}
              >
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
        <div className={`form-check mb-3 ${errors['agb'] ? 'form-error' : ''}`}>
          <input
            type="checkbox"
            className="form-check-input"
            id="agb"
            name="agb"
            ref={register({ required: true })}
          />
          <label
            className={`form-check-label mb-0 ${errors['agb'] && 'form-error'}`}
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
      <Footer />
    </div>
  );
};

export default SignUp;
