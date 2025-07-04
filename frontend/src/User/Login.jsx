import React, { useEffect, useState } from "react";
import "../UserStyles/Form.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, removeErrors, removeSuccess } from "../features/user/userSlice";
import { toast } from "react-toastify";
const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { error, loading, success, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const location = useLocation()

  const redirect = new URLSearchParams(location.search).get('redirect')|| '/'

  console.log(redirect)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSubmit = (e) => {
    e.preventDefault();
    console.log(loginEmail, loginPassword);
    dispatch(login({ email: loginEmail, password: loginPassword }));
  };
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (isAuthenticated) {
      console.log(`redirecting to ${redirect}`)
      navigate(redirect,{replace:true});
    }
  }, [isAuthenticated]);


  useEffect(() => {
    if (success) {
      toast.success("Login Successful", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      // navigate("/");
    }
  }, [dispatch, success]);

  return (
    <div className="form-container container">
      <div className="form-content">
        <form action="" className="form" onSubmit={loginSubmit}>
          <div className="input-group">
            <input
            tabIndex={1}
              type="email"
              placeholder="Email"
              
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
            tabIndex={2}
              type="password"
              placeholder="Password"
              
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <button className="authBtn">Sign In</button>
          <p className="form-links">
            Forgot your password?
            <Link to="/password/forgot">Reset</Link>
          </p>
          <p className="form-links">
            Don't have an account?
            <Link to="/register">Sign Up here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
