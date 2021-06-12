import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import LoadingItem from '../../common/components/LoadingItem';

import COUNTRIES from '../../common/data/countries-list';
import useCreateUser from '../hooks/useCreateUser';

const SignUpForm = ({ onSuccessGoTo = '/account' }) => {
  const router = useRouter();
  const intl = useIntl();
  const { register, handleSubmit, errors, setError, watch } = useForm();
  const { createUser, error, loading } = useCreateUser();
  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = async (form) => {
    const {
      firstName,
      lastName,
      company,
      addressLine,
      addressLine2,
      postalCode,
      city,
      emailAddress,
      telNumber,
      regionCode,
      countryCode,
      password: userPassword,
    } = form;

    const userProfile = {
      email: emailAddress,
      password: userPassword,
      profile: {
        phoneMobile: telNumber,
        address: {
          firstName,
          lastName,
          company,
          addressLine,
          addressLine2,
          postalCode,
          city,
          regionCode,
          countryCode,
        },
      },
    };
    try {
      await createUser(userProfile);
      router.push(onSuccessGoTo);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };
  useEffect(() => {
    if (error?.message?.includes('Email already exists')) {
      setError('emailAddress', {
        type: 'manual',
        message: `👬 ${intl.formatMessage({
          id: 'email_exists_please_login',
        })}`,
        shouldFocus: true,
      });
    }
  }, [error]);

  return (
    <div className="container">
      <h1 className="text-center">{intl.formatMessage({ id: 'sign_up' })}</h1>

      <form className="form mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <div
            className={`mb-3 col-md-6 ${errors.firstName ? 'form-error' : ''}`}
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
            className={`mb-3 col-md-6 ${errors.lastName ? 'form-error' : ''}`}
          >
            <label className="form-label">
              {intl.formatMessage({ id: 'last_name' })}
            </label>
            <input
              className={`form-control ${errors.lastName && 'form-error'}`}
              name="lastName"
              ref={register({ required: true })}
            />
          </div>
          <div
            className={`mb-3 col-md-6 ${errors.company ? 'form-error' : ''}`}
          >
            <label className="form-label">
              {intl.formatMessage({ id: 'company' })} {'  '}{' '}
              {intl.formatMessage({ id: 'optional' })}
            </label>
            <input className="form-control" name="company" ref={register} />
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
              className={`form-control ${errors.addressLine && 'form-error'}`}
              name="addressLine"
              ref={register({ required: true })}
            />
          </div>
          <div
            className={`mb-3 col-md-6 ${errors.postalCode ? 'form-error' : ''}`}
          >
            <label className="form-label">
              {intl.formatMessage({ id: 'postal_code' })}
            </label>
            <input
              className={`form-control ${errors.postalCode && 'form-error'}`}
              name="postalCode"
              ref={register({ required: true })}
            />
          </div>
          <div className={`mb-3 col-md-6 ${errors.city ? 'form-error' : ''}`}>
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
            className={`mb-3 col-md-6 ${errors.regionCode ? 'form-error' : ''}`}
          >
            <label className="form-label">
              {intl.formatMessage({ id: 'region' })}{' '}
              {intl.formatMessage({ id: 'optional' })}
            </label>
            <input
              className={`form-control ${errors.regionCode && 'form-error'}`}
              name="regionCode"
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
              defaultValue="CH"
              ref={register({ required: true })}
              className={`form-control ${errors.countryCode && 'form-error'}`}
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
              className={`form-control ${errors.emailAddress && 'form-error'}`}
              name="emailAddress"
              ref={register({ required: true })}
            />
            {errors.emailAddress && (
              <span> {errors.emailAddress?.message} </span>
            )}
          </div>
          <div
            className={`mb-3 col-md-6 ${errors.telNumber ? 'form-error' : ''}`}
          >
            <label className="form-label">
              {intl.formatMessage({ id: 'telephone' })}
            </label>
            <input
              className={`form-control ${errors.telNumber && 'form-error'}`}
              name="telNumber"
              ref={register({ required: true })}
            />
          </div>

          <div
            className={`mb-3 col-md-6 ${errors.password ? 'form-error' : ''}`}
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
            className={`mb-3 col-md-6 ${errors.password2 ? 'form-error' : ''}`}
          >
            <label className="form-label">
              {intl.formatMessage({ id: 'repeat_password' })}
            </label>
            <input
              className="form-control"
              name="password2"
              type="password"
              ref={register({
                validate: (value) =>
                  value === password.current || 'The passwords do not match',
              })}
            />
            {errors.password2 && <p>{errors.password2.message}</p>}
          </div>
          {loading && <LoadingItem />}
          <input
            type="submit"
            className="button button--primary button--big my-1 w-100"
            value={intl.formatMessage({ id: 'register_user' })}
          />
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
