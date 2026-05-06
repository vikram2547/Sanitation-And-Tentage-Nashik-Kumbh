import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { all_routes } from "../../../../routes/all_routes";
import {
  logoPng,
  logoWhitePng,
  nashikKumbh,
} from "../../../../utils/imagepath";
import {
  clearSigninState,
  signinUser,
} from "../../../../core/redux/signinSlice";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const route = all_routes;

  /* ================= STATE ================= */
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState(0);
  const [captchaError, setCaptchaError] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const { loading, loginError } = useSelector((state) => state.signin);

  /* ================= TOGGLE PASSWORD ================= */
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

  /* ================= CAPTCHA ================= */
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);

    setCaptcha(`${num1} + ${num2}`);
    setCaptchaAnswer(num1 + num2);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // safer check (avoid NaN issue)
    if (Number(captchaInput) !== captchaAnswer) {
      setCaptchaError("Invalid captcha. Please try again.");
      generateCaptcha();
      setCaptchaInput("");
      return;
    }

    setCaptchaError("");

    try {
      const res = await dispatch(signinUser(formData)).unwrap();

      if (res?.success) {
        const twoFactorRequired = res?.data?.two_factor_required;

        if (!twoFactorRequired) {
          navigate(route.superadmindashboard);
        } else {
          navigate(route.forgotPassword);
        }
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  /* ================= CLEAR STATE ================= */
  useEffect(() => {
    return () => {
      dispatch(clearSigninState());
    };
  }, [dispatch]);

  return (
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
                {/* LOGO */}
                <div className="login-logo logo-normal">
                  <img src={logoPng} alt="logo" />
                </div>

                <Link to={route.dashboard} className="login-logo logo-white">
                  <img src={logoWhitePng} alt="logo" />
                </Link>

                {/* HEADING */}
                <div className="login-userheading">
                  <h3>Sign In</h3>
                  <h4 className="fs-16">
                    Access using your phone and passcode.
                  </h4>
                </div>

                {/* PHONE */}
                <div className="mb-3">
                  <label className="form-label">
                    Phone <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* PASSWORD */}
                <div className="mb-3">
                  <label className="form-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <div className="pass-group">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                    <span
                      className={`ti toggle-password ${
                        isPasswordVisible ? "ti-eye" : "ti-eye-off"
                      }`}
                      onClick={togglePasswordVisibility}
                    ></span>
                  </div>
                </div>

                {/* FORGOT PASSWORD */}
                <div className="text-end mb-2">
                  <Link
                    className="text-orange fs-16 fw-medium"
                    to={route.forgotPassword}
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* LOGIN ERROR */}
                {loginError && (
                  <div className="alert alert-danger">{loginError}</div>
                )}

                {/* CAPTCHA */}
                <div className="mb-3">
                  <label className="form-label">
                    Solve Captcha <span className="text-danger">*</span>
                  </label>

                  <div className="d-flex gap-2">
                    <div
                      className="form-control text-center"
                      style={{
                        background: "#f1f1f1",
                        fontWeight: "bold",
                      }}
                    >
                      {captcha} = ?
                    </div>

                    <input
                      type="text"
                      className="form-control text-center"
                      placeholder="Answer"
                      value={captchaInput}
                      onChange={(e) => {
                        setCaptchaInput(e.target.value);
                        setCaptchaError(""); // clear error while typing
                      }}
                      required
                    />

                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={generateCaptcha}
                    >
                      ↻
                    </button>
                  </div>

                  {/* CAPTCHA ERROR */}
                  {captchaError && (
                    <div className="text-danger mt-1">{captchaError}</div>
                  )}
                </div>

                {/* SUBMIT */}
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
                <div className="signinform mt-3">
                  <h4>
                    New on our platform?{" "}
                    <Link to={route.register}>Create an account</Link>
                  </h4>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;