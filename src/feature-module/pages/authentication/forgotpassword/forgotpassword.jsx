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

const Forgotpassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const route = all_routes;

  const { loading, success, error } = useSelector(
    (state) => state.forgotPassword
  );

  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ phone }));
  };

  // Navigate on success
  useEffect(() => {
    if (success) {
      localStorage.setItem("resetPhone", phone);
      navigate(route.emailverification);
      dispatch(clearForgotPasswordState());
    }
  }, [success, navigate, route, dispatch, phone]);

  // Show error only 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearForgotPasswordState());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

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
            <form onSubmit={handleSubmit}>
              <div className="login-userset">

                <div className="login-logo logo-normal">
                  <img src={logoPng} alt="img" />
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
                  />
                </div>

                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                <div className="form-login">
                  <button
                    type="submit"
                    className="btn btn-login w-100"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send OTP"}
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
