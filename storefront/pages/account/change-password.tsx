import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import useChangePassword from '../../modules/auth/hooks/useChangePassword';
import LoadingItem from '../../modules/common/components/LoadingItem';
import MetaTags from '../../modules/common/components/MetaTags';
import Footer from '../../modules/layout/components/Footer';
import Header from '../../modules/layout/components/Header';

const ChangePassword = () => {
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch('newPassword', '');
  const { changePassword, loading } = useChangePassword();

  const onSubmit = async ({ newPassword, oldPassword }) => {
    await changePassword({ newPassword, oldPassword });
  };

  return (
    <>
      <MetaTags title="Update Password" />
      <Header />
      <div className="container">
        {loading ? (
          <LoadingItem />
        ) : (
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h1>Change Password</h1>
              <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div
                  className={`mb-3 col-md-6 ${
                    errors.password2 ? 'form-error' : ''
                  }`}
                >
                  <label className="form-label">Enter current password</label>
                  <input
                    className="form-control"
                    name="oldPassword"
                    type="password"
                    ref={register({ required: true })}
                  />
                </div>
                <div
                  className={`mb-3 col-md-6 ${
                    errors.password2 ? 'form-error' : ''
                  }`}
                >
                  <label className="form-label">Enter a new Password</label>
                  <input
                    className="form-control"
                    name="newPassword"
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
                    ref={register({
                      validate: (value) =>
                        value === password.current ||
                        'The passwords do not match',
                    })}
                  />
                  {errors.password2 && <p>{errors.password2.message}</p>}
                </div>
                <button
                  className="button button--primary button--big mt-3"
                  type="submit"
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ChangePassword;
