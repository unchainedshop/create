/* eslint-disable react/no-danger */
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import useCreateUser from '../modules/auth/hooks/useCreateUser';
import useUpdateCart from '../modules/checkout/hooks/useUpdateCart';
import Header from '../modules/layout/components/Header';
import LoginForm from '../modules/auth/components/LoginForm';
import Footer from '../modules/layout/components/Footer';
import MetaTags from '../modules/common/components/MetaTags';
import COUNTRIES from '../modules/common/data/countries-list';

const ErrorDisplay = ({ error }) => {
  const intl = useIntl();
  if (!error) return '';
  if (error.message?.includes('Email already exists')) {
    return (
      <div className="form-error my-3">
        👬 {intl.formatMessage({ id: 'email_exists' })}.
      </div>
    );
  }

  return <div className="form-error my-3">👷‍♀️ An unknown error occurred.</div>;
};

const SignUp = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, errors, setError } = useForm();
  const intl = useIntl();
  const { updateCart } = useUpdateCart();
  const { createUser, error: formError } = useCreateUser();
  const hasErrors = Object.keys(errors).length;

  useEffect(() => {
    if (formError?.message?.includes('Email already exists.')) {
      setError('emailAddress', {
        type: 'manual',
        message: '👬 User with the same email already exists. Please login',
        shouldFocus: true,
      });
    }
  }, [formError]);

  const createAccount = watch('account');

  const onSubmit = async ({
    firstName,
    lastName,
    company,
    addressLine,
    postalCode,
    city,
    countryCode,
    emailAddress,
    telNumber,
    account,
    password,
    password2,
  }) => {
    if (account) {
      if (password !== password2) {
        setError('password', {
          type: 'manual',
          message: `👬 ${intl.formatMessage({ id: 'password_not_match' })}`,
          shouldFocus: true,
        });
        setError('password2', {
          type: 'manual',
          message: `👬 ${intl.formatMessage({ id: 'password_not_match' })}`,
          shouldFocus: true,
        });
        return false;
      }
      try {
        await createUser({
          email: emailAddress,
          password,
          profile: {
            phoneMobile: telNumber,
            address: {
              firstName,
              lastName,
              company,
              addressLine,
              postalCode,
              city,
              countryCode,
            },
          },
        });
      } catch (e) {
        return false;
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
        countryCode,
      },
    });

    router.push('/review');
    return true;
  };

  const onLogin = () => router.push('/review');

  return (
    <>
      <MetaTags
        title={`${intl.formatMessage({
          id: 'log_in',
        })} or ${intl.formatMessage({ id: 'register' })}`}
      />
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h2>{intl.formatMessage({ id: 'welcome_back' })}</h2>
            <p className="mt-0 mb-3">
              {intl.formatMessage({ id: 'welcome_back_message' })}
            </p>
            <LoginForm onLogin={onLogin} />
          </div>
          <div className="col-lg-6">
            <h2> {intl.formatMessage({ id: 'new_here' })} </h2>
            <p className="mt-0 mb-3">
              {intl.formatMessage({ id: 'new_here_message' })}
            </p>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-row">
                <div
                  className={`mb-3 col-md-6 ${
                    errors.firstName ? 'form-error' : ''
                  }`}
                >
                  <label className="form-label">
                    {intl.formatMessage({ id: 'first_name' })}
                  </label>
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
                  <label className="form-label">
                    {intl.formatMessage({ id: 'last_name' })}
                  </label>
                  <input
                    className={`form-control ${
                      errors.lastName && 'form-error'
                    }`}
                    name="lastName"
                    ref={register({ required: true })}
                  />
                </div>
                <div
                  className={`mb-3 col-md-12 ${
                    errors.company ? 'form-error' : ''
                  }`}
                >
                  <label className="form-label">
                    {intl.formatMessage({ id: 'company' })}{' '}
                    {intl.formatMessage({ id: 'optional' })}
                  </label>
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
                  <label className="form-label">
                    {intl.formatMessage({ id: 'address' })}
                  </label>
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
                  <label className="form-label">
                    {intl.formatMessage({ id: 'postal_code' })}
                  </label>
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
                  <label className="form-label">
                    {intl.formatMessage({ id: 'city' })}
                  </label>
                  <input
                    className={`form-control ${errors.city && 'form-error'}`}
                    name="city"
                    ref={register({ required: true })}
                  />
                </div>
                <div
                  className={`mb-3 col-md-6 ${
                    errors.countryCode ? 'form-error' : ''
                  }`}
                >
                  <label className="form-label">
                    {intl.formatMessage({ id: 'country' })}
                  </label>
                  <select
                    name="countryCode"
                    ref={register({ required: true })}
                    className={`form-control ${
                      errors.countryCode && 'form-error'
                    }`}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {' '}
                        {c.name}{' '}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  className={`mb-3 col-md-6 ${
                    errors.emailAddress ? 'form-error' : ''
                  }`}
                >
                  <label className="form-label">
                    {intl.formatMessage({ id: 'email' })}
                  </label>
                  <input
                    className={`form-control ${
                      errors.emailAddress && 'form-error'
                    }`}
                    name="emailAddress"
                    ref={register({ required: true })}
                    type="email"
                  />
                </div>
                <div
                  className={`mb-3 col-md-6 ${
                    errors.telNumber ? 'form-error' : ''
                  }`}
                >
                  <label className="form-label">
                    {intl.formatMessage({ id: 'telephone' })}
                  </label>
                  <input
                    className={`form-control ${
                      errors.telNumber && 'form-error'
                    }`}
                    name="telNumber"
                    ref={register({ required: false })}
                  />
                </div>
                <div className="mb-3 col-md-12">
                  <p className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="account"
                      name="account"
                      ref={register}
                    />
                    <label className="form-check-label mb-0" htmlFor="account">
                      {intl.formatMessage({ id: 'create_an_account' })}
                    </label>
                  </p>
                </div>
                {createAccount ? (
                  <>
                    <div
                      className={`mb-3 col-md-6 ${
                        errors.password ? 'form-error' : ''
                      }`}
                    >
                      <label className="form-label">
                        {intl.formatMessage({ id: 'password' })}
                      </label>
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
                      <label className="form-label">
                        {intl.formatMessage({ id: 'repeat_password' })}
                      </label>
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
                <div className="col-12">
                  <p
                    className={`form-check mt-0 mb-4 ${
                      errors.conditions ? 'form-error' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="conditions"
                      name="conditions"
                      ref={register({ required: true })}
                    />
                    <label
                      className={`form-check-label mb-0 ${
                        errors.conditions && 'form-error'
                      }`}
                      htmlFor="conditions"
                      dangerouslySetInnerHTML={{
                        __html: intl.formatMessage({
                          id: 'i_have_read_term',
                        }),
                      }}
                    />
                  </p>
                </div>
              </div>

              <ErrorDisplay error={formError} />

              <button
                className="button button--primary button--big w-100"
                type="submit"
                disabled={hasErrors}
              >
                {intl.formatMessage({ id: 'to_order_review' })}
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
