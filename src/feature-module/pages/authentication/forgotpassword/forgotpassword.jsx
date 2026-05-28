import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { all_routes } from "../../../../routes/all_routes";
import {
  logoPng,
  logoWhitePng,
  nashikKumbh,
} from "../../../../utils/imagepath";

import {
  forgotPassword,
  clearForgotPasswordState,
} from "../../../../core/redux/forgotPasswordSlice";

import {
  verifyOtp,
  clearVerifyOtpState,
} from "../../../../core/redux/verifyOtpSlice";

const Forgotpassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const route = all_routes;

  const {
    loading,
    success,
    message,
    error,
  } = useSelector((state) => state.forgotPassword);

  const {
    loading: otpLoading,
    success: otpSuccess,
    error: otpError,
  } = useSelector((state) => state.verifyOtp);

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);

  /* ================= SEND OTP ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ phone }));
  };

  /* ================= VERIFY OTP ================= */
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    dispatch(
      verifyOtp({
        phone,
        otp,
      })
    );
  };

  /* ================= OTP SENT SUCCESS ================= */
  useEffect(() => {
    if (success) {
      setShowOtpField(true);
    }
  }, [success]);

  /* ================= OTP VERIFIED SUCCESS ================= */
  useEffect(() => {
    if (otpSuccess) {
      dispatch(clearForgotPasswordState());
      dispatch(clearVerifyOtpState());
      navigate(route.newdashboard);
    }
  }, [otpSuccess, navigate, dispatch, route]);

  /* ================= CLEAR ERRORS AFTER 5s ================= */
  useEffect(() => {
    if (error || otpError) {
      const timer = setTimeout(() => {
        dispatch(clearForgotPasswordState());
        dispatch(clearVerifyOtpState());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, otpError, dispatch]);

  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div
          className="login-wrapper forgot-pass-wrap bg-img"
          style={{
            backgroundImage: `url(${nashikKumbh})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
        >
          <div className="login-content authent-content">
            <form onSubmit={showOtpField ? handleVerifyOtp : handleSubmit}>
              <div className="login-userset">

                <div className="login-logo logo-normal">
                  {/* <img src={logoPng} alt="img" /> */}
                </div>

                <Link to={route.dashboard} className="login-logo logo-white">
                  <img src={logoWhitePng} alt="Img" />
                </Link>

                <div className="login-userheading">
                  <h3>Forgot password?</h3>
                  <h4>
                    Enter your phone number and we’ll send you an OTP.
                  </h4>
                </div>

                {/* PHONE */}
                <div className="mb-3">
                  <label className="form-label">
                    Phone <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    required
                    disabled={showOtpField}
                  />
                </div>

                {/* SUCCESS MESSAGE */}
                {message && (
                  <div className="alert alert-success">
                    {message}
                  </div>
                )}

                {/* ERROR MESSAGE */}
                {(error || otpError) && (
                  <div className="alert alert-danger">
                    {error || otpError}
                  </div>
                )}

                {/* OTP FIELD */}
                {showOtpField && (
                  <div className="mb-3">
                    <label className="form-label">
                      Verify OTP <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="form-control"
                      required
                    />
                  </div>
                )}

                {/* SUBMIT BUTTON */}
                <div className="form-login">
                  <button
                    type="submit"
                    className="btn btn-login w-100"
                    disabled={
                      loading ||
                      otpLoading ||
                      (showOtpField && otp.length === 0)
                    }
                  >
                    {loading
                      ? "Sending..."
                      : otpLoading
                      ? "Verifying..."
                      : showOtpField
                      ? "Verify OTP"
                      : "Send OTP"}
                  </button>
                </div>

                <div className="signinform text-center">
                  <h4>
                    Return to
                    <Link to={route.signin} className="hover-a">
                      {" "}login
                    </Link>
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

export default Forgotpassword;