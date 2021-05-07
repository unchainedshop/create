import { useForm } from 'react-hook-form';

import useForgotPassword from '../modules/auth/hooks/useForgotPassword';
import Header from '../modules/layout/components/Header';

const PasswordForget = () => {
  const { register, handleSubmit } = useForm();
  const { forgotPassword } = useForgotPassword();

  const onSubmit = async ({ email }) => {
    const { success } = await forgotPassword({ email });
    if (success) alert('A confirmation email is sent');
  };

  return (
    <div className="container">
      <Header />
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1>Forgot Password?</h1>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <label className="form-label">Your e-mail address</label>
            <input
              className="form-control"
              name="email"
              type="email"
              ref={register({ required: true })}
            />
            <button
              className="button button--primary button--big mt-3"
              type="submit"
            >
              request new password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordForget;
