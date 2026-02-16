import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { all_routes } from "../../../../routes/all_routes";
import {
  logoPng,
  logoWhitePng,
  nashikKumbh,
} from "../../../../utils/imagepath";
import { clearSigninState, signinUser } from "../../../../core/redux/signinSlice";


const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const route = all_routes;

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const { loading, loginSuccess, loginError } = useSelector(
    (state) => state.signin
  );
  const token = useSelector((state) => state.signin?.token);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= SUBMIT LOGIN ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(signinUser(formData)).unwrap();

      if (res.success === true) {
        navigate(route.newdashboard);
        console.log("LOGIN API RESPONSE:", res);
      }
    } catch (err) {
      // error already handled by redux
    }
  };


  /* ================= CLEAR STATE ON UNMOUNT ================= */
  useEffect(() => {
    return () => {
      dispatch(clearSigninState());
    };
  }, [dispatch]);

  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper">
        <div className="account-content">
          <div
            className="login-wrapper bg-img"
            style={{
              backgroundImage: `url(${nashikKumbh})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "100vh",
            }}
          >
            <div className="login-content authent-content">
              <form onSubmit={handleSubmit}>
                <div className="login-userset">
                  <div className="login-logo logo-normal">
                    <img src={logoPng} alt="img" />
                  </div>

                  <Link to={route.dashboard} className="login-logo logo-white">
                    <img src={logoWhitePng} alt="Img" />
                  </Link>

                  <div className="login-userheading">
                    <h3>Sign In</h3>
                    <h4 className="fs-16">
                      Access using your phone and passcode.
                    </h4>
                  </div>

                  {/* PHONE */}
                  <div className="mb-3">
                    <label className="form-label">
                      Phone <span className="text-danger"> *</span>
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-control border-end-0"
                        required
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div className="mb-3">
                    <label className="form-label">
                      Password <span className="text-danger"> *</span>
                    </label>
                    <div className="pass-group">
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="pass-input form-control"
                        required
                      />

                      <span
                        className={`ti toggle-password text-gray-9 ${isPasswordVisible ? "ti-eye" : "ti-eye-off"
                          }`}
                        onClick={togglePasswordVisibility}
                      ></span>
                    </div>
                  </div>

                  {/* FORGOT PASSWORD */}
                  <div className="form-login authentication-check">
                    <div className="row">
                      <div className="col-12 d-flex align-items-center justify-content-between">
                        <div className="text-end">
                          <Link
                            className="text-orange fs-16 fw-medium"
                            to={route.forgotPassword}
                          >
                            Forgot Password?
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ERROR MESSAGE */}
                  {loginError && (
                    <div className="alert alert-danger mt-2">
                      {loginError}
                    </div>
                  )}

                  {/* SUBMIT BUTTON */}
                  <div className="form-login">
                    <button
                      type="submit"
                      className="btn btn-login w-100"
                      disabled={loading}
                    >
                      {loading ? "Signing In..." : "Sign In"}
                    </button>
                  </div>

                  {/* REGISTER */}
                  <div className="signinform">
                    <h4>
                      New on our platform?
                      <Link to={route.register} className="hover-a">
                        {" "}
                        Create an account
                      </Link>
                    </h4>
                  </div>

                  <div className="my-4 d-flex justify-content-center align-items-center copyright-text">
                    <p>Copyright © 2025 DreamsPOS</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Main Wrapper */}
    </>
  );
};

export default Signin;
