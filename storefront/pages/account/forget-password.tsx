import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import useForgotPassword from '../../modules/auth/hooks/useForgotPassword';
import LoadingItem from '../../modules/common/components/LoadingItem';
import MetaTags from '../../modules/common/components/MetaTags';
import Footer from '../../modules/layout/components/Footer';
import Header from '../../modules/layout/components/Header';

const PasswordForget = () => {
  const { register, handleSubmit } = useForm();
  const { forgotPassword, loading } = useForgotPassword();

  const onSubmit = async ({ email }) => {
    const { success } = await forgotPassword({ email });
    if (success) toast.success('A confirmation email is sent');
  };

  return (
    <>
      <MetaTags title="Forget password?" />
      <Header />
      <div className="container">
        {loading ? (
          <LoadingItem />
        ) : (
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
                  Request new Password
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

export default PasswordForget;
