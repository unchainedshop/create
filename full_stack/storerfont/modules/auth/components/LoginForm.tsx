import Link from 'next/link';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import useLoginWithPassword from '../hooks/useLoginWithPassword';

const LoginForm = ({ onLogin }) => {
  const { register, handleSubmit, errors, setError } = useForm();
  const intl = useIntl();
  const { loginWithPassword, error } = useLoginWithPassword();
  const hasErrors = Object.keys(errors).length > 0;
  useEffect(() => {
    if (error)
      setError('email', {
        type: 'manual',
        message: `👷‍♀️ ${intl.formatMessage({ id: 'invalid_email_password' })}`,
        shouldFocus: true,
      });
  }, [error]);

  const onSubmit = async ({ email, password }) => {
    await loginWithPassword({ email, password });
    onLogin();
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <div
          className={`d-flex justify-between flex-column w-100 ${
            errors.email ? 'form-error' : ''
          }`}
        >
          {JSON.stringify(errors.message)}
          <label className="form-label">
            {intl.formatMessage({ id: 'email' })}
          </label>
          <input
            className="form-control"
            name="email"
            type="email"
            ref={register({ required: true })}
          />
        </div>
        <div
          className={`d-flex flex-column mt-3  justify-between w-100 ${
            errors.password ? 'form-error' : ''
          }`}
        >
          <label className="form-label">
            {intl.formatMessage({ id: 'password' })}
          </label>
          <input
            className="form-control"
            type="password"
            name="password"
            ref={register({ required: true })}
          />
          <Link href="/account/forget-password">
            <a className="mt-2 text-right">
              <small id="passwordForgot" className="form-text text-muted">
                {intl.formatMessage({ id: 'forgot_password' })}
              </small>
            </a>
          </Link>
        </div>
      </div>
      {hasErrors
        ? Object.values(errors).map((err) => (
            <div key={err.message} className="form-error">
              {err.message}
            </div>
          ))
        : ''}
      <button
        className="button button--primary mt-3 align-center button--big w-100"
        type="submit"
        disabled={hasErrors}
      >
        {intl.formatMessage({ id: 'log_in' })}
      </button>
    </form>
  );
};

export default LoginForm;
