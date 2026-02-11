
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { all_routes } from "../../../../routes/all_routes";
import { logoPng, logoWhitePng, nashikKumbh } from "../../../../utils/imagepath";
import OtpInput from "react-otp-input";
import { clearVerifyOtpState, verifyOtp } from "../../../../core/redux/verifyOtpSlice";

const EmailVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const route = all_routes;

  // ✅ Only take user from signin slice
  const { user } = useSelector((state) => state.signin);

  // ✅ OTP slice state
  const { loading, success, error } = useSelector(
    (state) => state.verifyOtp
  );

  const [otp, setOtp] = useState("");


  // Navigate on OTP success
  useEffect(() => {
    if (success) {
      navigate(route.dashboard);
      dispatch(clearOtpState());
    }
  }, [success, navigate, route, dispatch]);

  // Show error only for 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearVerifyOtpState());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleVerify = () => {
    if (otp.length !== 4) return;

    dispatch(
      verifyOtp({
        phone: user?.phone,
        otp: otp,
      })
    );
  };

  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div
          className="login-wrapper email-veri-wrap bg-img"
          style={{
            backgroundImage: `url(${nashikKumbh})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
        >
          <div className="login-content authent-content">
            <div className="login-userset">

              <div className="login-logo logo-normal">
                <img src={logoPng} alt="img" />
              </div>

              <Link to={route.dashboard} className="login-logo logo-white">
                <img src={logoWhitePng} alt="Img" />
              </Link>

              <div className="login-userheading">
                <h3>OTP Verification</h3>
                <h4>OTP sent to {user?.phone}</h4>
              </div>

              <div className="text-center otp-input">
                <div className="d-flex align-items-center mb-3 otp-input-class-custom">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  renderInput={(props) => <input {...props} />}
                  inputType="tel"
                  containerStyle={{
                    display: "flex",
                    gap: "8px",
                    justifyContent: "center",
                  }}
                />
                </div>
              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <div className="alert alert-danger mt-3">
                  {error}
                </div>
              )}

              <div className="mt-3">
                <button
                  onClick={handleVerify}
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify & Proceed"}
                </button>
              </div>

              <div className="my-4 text-center">
                <p>Copyright © 2026 KASH IT</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
