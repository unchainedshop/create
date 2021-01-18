import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useCreateUserMutation from '../hooks/useCreateUserMutation';

const SignUpForm = () => {
  const { register, handleSubmit, errors, setError } = useForm();
  const { createUser, error } = useCreateUserMutation();
  const onSubmit = async ({
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
    password,
    password2,
  }) => {
    if (password !== password2) {
      setError('password', 'notMatch', 'Passwörter sind nicht gleich');
      setError('password2', 'notMatch', 'Passwörter sind nicht gleich');
      return false;
    }

    const userProfile = {
      username,
      email: emailAddress,
      password,
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
    if (error?.message?.includes('Email already exists.')) {
      setError(
        'emailAddress',
        'alreadyExists',
        '👬 Es existiert bereits ein Benutzer mit dieser E-Mail Adresse.',
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
            <label className="form-label">Surname</label>
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
            <label className="form-label">PLZ</label>
            <input
              className={`form-control ${errors.postalCode && 'form-error'}`}
              name="postalCode"
              ref={register({ required: true })}
            />
          </div>
          <div className={`mb-3 col-md-6 ${errors.city ? 'form-error' : ''}`}>
            <label className="form-label">place</label>
            <input
              className={`form-control ${errors.city && 'form-error'}`}
              name="city"
              ref={register({ required: true })}
            />
          </div>
          <div
            className={`mb-3 col-md-6 ${errors.regionCode ? 'form-error' : ''}`}
          >
            <label className="form-label">Region</label>
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
            <input
              className={`form-control ${errors.countryCode && 'form-error'}`}
              name="countryCode"
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
              className={`form-control ${errors.emailAddress && 'form-error'}`}
              name="emailAddress"
              ref={register({ required: true })}
              // defaultValue={isDev && 'hans@exmaple.com'}
            />
          </div>
          <div
            className={`mb-3 col-md-6 ${errors.telNumber ? 'form-error' : ''}`}
          >
            <label className="form-label">Telephone</label>
            <input
              className={`form-control ${errors.telNumber && 'form-error'}`}
              name="telNumber"
              ref={register({ required: true })}
              // defaultValue={isDev && '0791234567'}
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
              ref={register({ required: true })}
            />
          </div>
        </div>
        <div>
          <input type="submit" value="register" />
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
