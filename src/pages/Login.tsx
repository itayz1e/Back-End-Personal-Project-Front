import "../style/Login.scss";

const Login = () => {
  return (
    <>
      <a href="/login">Sign in</a>
      <br />
      <a href="/register">Register</a>
      <br />
      <a href="/">Main</a>
      <div className="align">
        <div className="grid align__item">
          <div className="login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M21 15.5c0 1.1-.9 2-2 2h-4l-3 3-3-3H5c-1.1 0-2-.9-2-2V6c0-2.2 1.8-4 4-4h12c2.2 0 4 1.8 4 4v9.5z"
                fill="#e0e0e0"
                stroke="#000"
              ></path>
              <text
                x="50%"
                y="50%"
                dominant-baseline="middle"
                text-anchor="middle"
                font-size="10"
                font-family="Arial, sans-serif"
                fill="#000"
              >
                AI
              </text>
            </svg>
            <h2>Sign in</h2>

            <form className="form">
              <div className="form__field">
                <input
                  type="username"
                  id="username"
                  placeholder="Username"
                  required
                />
              </div>

              <div className="form__field">
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••••••"
                  required
                />
              </div>

              <div className="form__field">
                <input type="submit" value="Sign in" />
              </div>
            </form>

            <p>
              Not registered yet? <a href="/register">Register</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
