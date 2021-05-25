import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import useCreateUser from '../modules/auth/hooks/useCreateUser';
import useUpdateCart from '../modules/checkout/hooks/useUpdateCart';
import Header from '../modules/layout/components/Header';
import LoginForm from '../modules/auth/components/LoginForm';
import Footer from '../modules/layout/components/Footer';
import MetaTags from '../modules/common/components/MetaTags';

const ErrorDisplay = ({ error }) => {
  if (!error) return '';

  if (error.message.includes('Email already exists.')) {
    return (
      <div className="form-error my-3">
        👬 A user with this email address already exists.
      </div>
    );
  }

  return <div className="form-error my-3">👷‍♀️ An unknown error occurred.</div>;
};

const SignUp = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, errors, setError } = useForm();
  const { updateCart } = useUpdateCart();
  const { createUser, error } = useCreateUser();
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
    if (account) {
      if (password !== password2) {
        setError('password', 'notMatch', 'Passwörter sind nicht gleich');
        setError('password2', 'notMatch', 'Passwörter sind nicht gleich');
        return false;
      }
      await createUser({
        email: emailAddress,
        password,
        profile: {
          displayName: lastName,
          phoneMobile: telNumber,
          address: {
            firstName,
            lastName,
            company,
            addressLine,
            postalCode,
            city,
          },
        },
      });
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

    router.push('/review');
    return true;
  };

  const onLogin = () => router.push('/review');

  return (
    <>
      <MetaTags title="Register" />
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h2> Register </h2>
            <p> Do you already have an account? Then register here: </p>
            <LoginForm onLogin={onLogin} />
          </div>
          <div className="col-lg-6">
            <h2> Order without an account </h2>
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
                  I want to create an account
                </label>
              </div>
              <div className="form-row">
                <div
                  className={`mb-3 col-md-6 ${
                    errors.firstName ? 'form-error' : ''
                  }`}
                >
                  <label className="form-label">First name</label>
                  <input
                    className="form-control"
                    name="firstName"
                    ref={register({ required: true })}
                  />
                </div>
                <div
                  className={`mb-3 col-md-6 ${
                    errors.lastName ? 'form-error' : ''
                  }`}
                >
                  <label className="form-label">Last name</label>
                  <input
                    className={`form-control ${
                      errors.lastName && 'form-error'
                    }`}
                    name="lastName"
                    ref={register({ required: true })}
                  />
                </div>
                <div
                  className={`mb-3 col-md-6 ${
                    errors.company ? 'form-error' : ''
                  }`}
                >
                  <label className="form-label">Company (optional)</label>
                  <input
                    className="form-control"
                    name="company"
                    ref={register}
                  />
                </div>
                <div
                  className={`mb-3 col-md-6 ${
                    errors.addressLine ? 'form-error' : ''
                  }`}
                >
                  <label className="form-label">Address</label>
                  <input
                    className={`form-control ${
                      errors.addressLine && 'form-error'
                    }`}
                    name="addressLine"
                    ref={register({ required: true })}
                  />
                </div>
                <div
                  className={`mb-3 col-md-6 ${
                    errors.postalCode ? 'form-error' : ''
                  }`}
                >
                  <label className="form-label">Postal code</label>
                  <input
                    className={`form-control ${
                      errors.postalCode && 'form-error'
                    }`}
                    name="postalCode"
                    ref={register({ required: true })}
                  />
                </div>
                <div
                  className={`mb-3 col-md-6 ${errors.city ? 'form-error' : ''}`}
                >
                  <label className="form-label">City</label>
                  <input
                    className={`form-control ${errors.city && 'form-error'}`}
                    name="city"
                    ref={register({ required: true })}
                  />
                </div>
                <div
                  className={`mb-3 col-md-6 ${
                    errors.emailAddress ? 'form-error' : ''
                  }`}
                >
                  <label className="form-label">E-mail</label>
                  <input
                    className={`form-control ${
                      errors.emailAddress && 'form-error'
                    }`}
                    name="emailAddress"
                    ref={register({ required: true })}
                  />
                </div>
                <div
                  className={`mb-3 col-md-6 ${
                    errors.telNumber ? 'form-error' : ''
                  }`}
                >
                  <label className="form-label">Telephone</label>
                  <input
                    className={`form-control ${
                      errors.telNumber && 'form-error'
                    }`}
                    name="telNumber"
                    ref={register({ required: true })}
                  />
                </div>
                {createAccount ? (
                  <>
                    <div
                      className={`mb-3 col-md-6 ${
                        errors.password ? 'form-error' : ''
                      }`}
                    >
                      <label className="form-label">Password</label>
                      <input
                        className="form-control"
                        name="password"
                        type="password"
                        ref={register({ required: true })}
                      />
                    </div>
                    <div
                      className={`mb-3 col-md-6 ${
                        errors.password2 ? 'form-error' : ''
                      }`}
                    >
                      <label className="form-label">Repeat Password</label>
                      <input
                        className="form-control"
                        name="password2"
                        type="password"
                        ref={register({ required: true })}
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
                  type="checkbox"
                  className="form-check-input"
                  id="agb"
                  name="agb"
                  ref={register({ required: true })}
                />
                <label
                  className={`form-check-label mb-0 ${
                    errors.agb && 'form-error'
                  }`}
                  htmlFor="conditions"
                >
                  I have read the <a href="/conditions">Terms and Conditions</a>
                </label>
              </div>

              <ErrorDisplay error={error} />

              <button
                className="button button--primary button--big"
                type="submit"
                disabled={hasErrors}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
