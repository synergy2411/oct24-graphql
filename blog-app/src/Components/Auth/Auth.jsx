import { useRef } from "react";
import { gql, useMutation } from "@apollo/client";

const SIGN_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(data: { email: $email, password: $password }) {
      token
    }
  }
`;

function Auth() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [signInMutation] = useMutation(SIGN_IN);

  const submitHandler = (event) => {
    event.preventDefault();
    signInMutation({
      variables: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
    })
      .then(({ data }) => {
        localStorage.setItem("token", data.signIn.token);
      })
      .catch(console.error);
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
                  ref={emailRef}
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
                  ref={passwordRef}
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
