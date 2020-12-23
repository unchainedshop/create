import Header from '../modules/layout/components/Header';

const PasswordReset = () => {
  return (
    <div className="container">
      <Header />
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1>reset Password</h1>
          <form className="form">
            <label className="form-label">Enter a new password</label>
            <input className="form-control" name="email" type="password" />
            <button
              className="button button--primary button--big mt-3"
              type="submit"
            >
              reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
