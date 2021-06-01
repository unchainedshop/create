import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import useResetPassword from '../modules/auth/hooks/useResetPassword';
import MetaTags from '../modules/common/components/MetaTags';
import Footer from '../modules/layout/components/Footer';
import Header from '../modules/layout/components/Header';

const PasswordReset = () => {
  const router = useRouter();
  const intl = useIntl();
  const { token } = router.query;
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});

  password.current = watch('newPassword', '');
  const { resetPassword } = useResetPassword();

  const onSubmit = async ({ newPassword }) => {
    await resetPassword({ newPassword, token });
  };

  return (
    <>
      <MetaTags title={intl.formatMessage({ id: 'reset_password' })} />
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1>reset Password</h1>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div
                className={`mb-3 col-md-6 ${
                  errors.password2 ? 'form-error' : ''
                }`}
              >
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
                {intl.formatMessage({ id: 'reset_password' })}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PasswordReset;
