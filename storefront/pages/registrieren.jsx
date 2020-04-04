import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import useUpdateCartMutation from '../modules/checkout/hooks/useUpdateCartMutation';
import Header from '../modules/layout/components/Header';
import Footer from '../modules/layout/components/Footer';

const isDev = process.env.NODE_ENV === 'development';

const SignUp = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, errors } = useForm();
  const { updateCart } = useUpdateCartMutation();

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
  }) => {
    const result = await updateCart({
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

  return (
    <div className="container">
      <Header />
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
        <button
          className="button button--primary button--big"
          type="submit"
          disabled
        >
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
            disabled
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
        <div
          className={`form-check mb-3 ${errors['agb'] && 'form-error'} : ''
                    }`}
        >
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

        <button className="button button--primary button--big" type="submit">
          Registrieren
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default SignUp;
