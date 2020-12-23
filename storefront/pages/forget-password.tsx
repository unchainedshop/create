import Header from '../modules/layout/components/Header';

const PasswordForget = () => {
  return (
    <div className="container">
      <Header />
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1>Forgot Password?</h1>
          <form className="form">
            <label className="form-label">Your e-mail address</label>
            <input className="form-control" name="email" type="email" />
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
