function Auth() {
  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="row">
      <div className="col-6 offset-3">
        <div className="card">
          <div className="card-body">
            <form onSubmit={submitHandler}>
              <h1 className="text-center">Login Form</h1>

              {/* email */}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder=""
                />
                <label htmlFor="email">Email:</label>
              </div>

              {/* password */}
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  placeholder=""
                />
                <label htmlFor="password">Password:</label>
              </div>

              {/* button */}
              <div className="row">
                <div className="col-6">
                  <div className="d-grid">
                    <button className="btn btn-primary" type="submit">
                      Login
                    </button>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-grid">
                    <button className="btn btn-secondary" type="button">
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
