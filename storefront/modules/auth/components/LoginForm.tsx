import Link from 'next/link';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import useLoginWithPasswordMutation from '../hooks/useLoginWithPasswordMutation';

const LoginForm = ({ onLogin }) => {
  const { register, handleSubmit, errors, setError } = useForm();
  const { loginWithPassword, error } = useLoginWithPasswordMutation();
  const hasErrors = Object.keys(errors).length > 0;

  useEffect(() => {
    if (error?.message?.includes('User not found')) {
      setError(
        'email',
        'doesNotExists',
        '🤷‍♀️ Kein Benutzer mit dieser E-mail vorhanden.',
      );
    } else if (error?.message?.includes('Incorrect password')) {
      setError('password', 'incorrect', 'Falsches Passwort.');
    } else if (error) {
      setError(
        'email',
        'unknownError',
        '👷‍♀️ Es ist ein unbekannter Fehler aufgetreten.',
      );
    }
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
            errors['email'] ? 'form-error' : ''
          }`}
        >
          <label className="form-label">Deine E-Mail Adresse</label>
          <input
            className="form-control"
            name="email"
            type="email"
            ref={register({ required: true })}
          />
        </div>
        <div
          className={`d-flex flex-column mt-2  justify-between w-100 ${
            errors['password'] ? 'form-error' : ''
          }`}
        >
          <label className="form-label">Dein Passwort</label>
          <input
            className="form-control"
            type="password"
            name="password"
            ref={register({ required: true })}
          />
          <Link href="passwort-vergessen">
            <a className="mt-2 text-right">
              <small id="passwordForgot" className="form-text text-muted">
                Passwort vergessen?
              </small>
            </a>
          </Link>
        </div>
      </div>
      {hasErrors
        ? Object.values(errors).map((error) => (
            <div key={error.message} className="form-error">
              {error.message}
            </div>
          ))
        : ''}
      <button
        className="button button--primary mt-2 align-center button--big"
        type="submit"
        disabled={hasErrors}
      >
        Anmelden
      </button>
    </form>
  );
};

export default LoginForm;
