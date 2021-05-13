import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import COUNTRIES from '../../common/data/countries-list';
import useCreateUser from '../hooks/useCreateUser';

const SignUpForm = () => {
  const { register, handleSubmit, errors, setError, watch } = useForm();
  const { createUser, error } = useCreateUser();
  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = async (form) => {
    const {
      username,
      firstName,
      lastName,
      company,
      addressLine,
      addressLine2,
      postalCode,
      city,
      emailAddress,
      displayName,
      telNumber,
      regionCode,
      countryCode,
      password: userPassword,
    } = form;

    const userProfile = {
      username,
      email: emailAddress,
      password: userPassword,
      profile: {
        displayName,
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

    await createUser(userProfile);
  };
  useEffect(() => {
    if (error?.message?.includes('Email already exists')) {
      setError(
        'emailAddress',
        'alreadyExists',
        '👬 User with the same email exists.',
      );
    }
  }, [error]);

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <div
            className={`mb-3 col-md-6 ${errors.username ? 'form-error' : ''}`}
          >
            <label className="form-label">Username</label>
            <input
              className="form-control"
              name="username"
              ref={register({ required: true })}
            />
          </div>
          <div
            className={`mb-3 col-md-6 ${
              errors.displayName ? 'form-error' : ''
            }`}
          >
            <label className="form-label">Display name</label>
            <input
              className="form-control"
              name="displayName"
              ref={register({ required: true })}
            />
          </div>
          <div
            className={`mb-3 col-md-6 ${errors.firstName ? 'form-error' : ''}`}
          >
            <label className="form-label">First name</label>
            <input
              className="form-control"
              name="firstName"
              ref={register({ required: true })}
            />
          </div>
          <div
            className={`mb-3 col-md-6 ${errors.lastName ? 'form-error' : ''}`}
          >
            <label className="form-label">Last name</label>
            <input
              className={`form-control ${errors.lastName && 'form-error'}`}
              name="lastName"
              ref={register({ required: true })}
            />
          </div>
          <div
            className={`mb-3 col-md-6 ${errors.company ? 'form-error' : ''}`}
          >
            <label className="form-label">Company (optional)</label>
            <input className="form-control" name="company" ref={register} />
          </div>
          <div
            className={`mb-3 col-md-6 ${
              errors.addressLine ? 'form-error' : ''
            }`}
          >
            <label className="form-label">Address</label>
            <input
              className={`form-control ${errors.addressLine && 'form-error'}`}
              name="addressLine"
              ref={register({ required: true })}
            />
          </div>
          <div
            className={`mb-3 col-md-6 ${errors.postalCode ? 'form-error' : ''}`}
          >
            <label className="form-label">Postal Code</label>
            <input
              className={`form-control ${errors.postalCode && 'form-error'}`}
              name="postalCode"
              ref={register({ required: true })}
            />
          </div>
          <div className={`mb-3 col-md-6 ${errors.city ? 'form-error' : ''}`}>
            <label className="form-label">City</label>
            <input
              className={`form-control ${errors.city && 'form-error'}`}
              name="city"
              ref={register({ required: true })}
            />
          </div>
          <div
            className={`mb-3 col-md-6 ${errors.regionCode ? 'form-error' : ''}`}
          >
            <label className="form-label">Region (optional)</label>
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
            <label className="form-label">Country</label>
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
            <label className="form-label">E-mail</label>
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
            <label className="form-label">Telephone</label>
            <input
              className={`form-control ${errors.telNumber && 'form-error'}`}
              name="telNumber"
              ref={register({ required: true })}
            />
          </div>

          <div
            className={`mb-3 col-md-6 ${errors.password ? 'form-error' : ''}`}
          >
            <label className="form-label">password</label>
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
            <label className="form-label">Repeat password</label>
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
        </div>
        <div>
          <input
            type="submit"
            className="button button--primary my-1"
            value="Register"
          />
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
