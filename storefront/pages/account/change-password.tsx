import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import useChangePassword from '../../modules/auth/hooks/useChangePassword';
import LoadingItem from '../../modules/common/components/LoadingItem';
import MetaTags from '../../modules/common/components/MetaTags';
import Footer from '../../modules/layout/components/Footer';
import Header from '../../modules/layout/components/Header';

const ChangePassword = () => {
  const { register, handleSubmit, errors, watch } = useForm();
  const intl = useIntl();
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
      <div className="container mt-5">
        {loading ? (
          <LoadingItem />
        ) : (
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <h1>{intl.formatMessage({ id: 'change_password' })}</h1>
              <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className={`mb-3 ${errors.password2 ? 'form-error' : ''}`}>
                  <label className="form-label">
                    {intl.formatMessage({ id: 'current_password' })}
                  </label>
                  <input
                    className="form-control"
                    name="oldPassword"
                    type="password"
                    ref={register({ required: true })}
                  />
                </div>
                <div className={`mb-3 ${errors.password2 ? 'form-error' : ''}`}>
                  <label className="form-label">
                    {intl.formatMessage({ id: 'new_password' })}
                  </label>
                  <input
                    className="form-control"
                    name="newPassword"
                    type="password"
                    ref={register({ required: true })}
                  />
                </div>
                <div className={`mb-3 ${errors.password2 ? 'form-error' : ''}`}>
                  <label className="form-label">
                    {intl.formatMessage({ id: 'repeat_password' })}
                  </label>
                  <input
                    className="form-control"
                    name="password2"
                    type="password"
                    ref={register({
                      validate: (value) =>
                        value === password.current ||
                        intl.formatMessage({ id: 'password_not_match' }),
                    })}
                  />
                  {errors.password2 && <p>{errors.password2.message}</p>}
                </div>
                <button
                  className="button button--primary button--big mt-3"
                  type="submit"
                >
                  {intl.formatMessage({ id: 'reset_password' })}
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
