import { useForm } from 'react-hook-form';

import COUNTRIES from '../../common/data/countries-list';
import useUpdateUserProfile from '../hooks/useUpdateUserProfile';

const UpdateProfileForm = ({ user, onSuccess }) => {
  const { register, handleSubmit, errors } = useForm();
  const { profile = {} } = user;
  const { updateUserProfile } = useUpdateUserProfile();
  const onSubmit = async (form) => {
    const {
      firstName,
      lastName,
      addressLine,
      addressLine2,
      postalCode,
      city,
      company,
      displayName,
      telNumber,
      regionCode,
      countryCode,
    } = form;

    const userProfile = {
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
    };

    await updateUserProfile({ profile: userProfile, userId: user._id });
    onSuccess(true);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <div
            className={`mb-3 col-md-6 ${
              errors.displayName ? 'form-error' : ''
            }`}
          >
            <label className="form-label">Display name</label>
            <input
              className="form-control"
              defaultValue={profile?.displayName}
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
              defaultValue={profile?.address?.firstName}
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
              defaultValue={profile?.address?.lastName}
              ref={register({ required: true })}
            />
          </div>
          <div
            className={`mb-3 col-md-6 ${errors.company ? 'form-error' : ''}`}
          >
            <label className="form-label">Company (optional)</label>
            <input
              className="form-control"
              name="company"
              defaultValue={profile?.address?.company}
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
              className={`form-control ${errors.addressLine && 'form-error'}`}
              name="addressLine"
              defaultValue={profile?.address?.addressLine}
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
              defaultValue={profile?.address?.postalCode}
              ref={register({ required: true })}
            />
          </div>
          <div className={`mb-3 col-md-6 ${errors.city ? 'form-error' : ''}`}>
            <label className="form-label">City</label>
            <input
              className={`form-control ${errors.city && 'form-error'}`}
              name="city"
              defaultValue={profile?.address?.city}
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
              defaultValue={profile?.address?.regionCode}
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
              defaultValue={profile?.address?.countryCode}
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
            className={`mb-3 col-md-6 ${errors.telNumber ? 'form-error' : ''}`}
          >
            <label className="form-label">Telephone</label>
            <input
              className={`form-control ${errors.telNumber && 'form-error'}`}
              name="telNumber"
              defaultValue={profile?.phoneMobile}
              ref={register({ required: true })}
            />
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

export default UpdateProfileForm;
