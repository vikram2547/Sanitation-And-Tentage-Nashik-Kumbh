
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearSignupState, signupUser } from "../../../../core/redux/registerSlice";
import { all_routes } from "../../../../routes/all_routes";
import {
  nashikKumbh,
  logo,
  logoWhite
} from "../../../../utils/imagepath";

const Register = () => {
  const dispatch = useDispatch();
  const { loading, registrationStatus, registrationError } =
    useSelector(state => state.register);

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(""); // success | error
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
  });

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage(null);
    setMessageType("");


    const payload = {
      phone: formData.phone,
      password: formData.password,
      full_name: formData.full_name,
      email: formData.email,
      user_type_id: 0,
      vendor_id: null
    };
    setHasSubmitted(true);
    dispatch(signupUser(payload));
  };

  const route = all_routes;

  useEffect(() => {
    if (!hasSubmitted) return;

    if (registrationStatus) {
      setMessage("Registration successful!");
      setMessageType("success");

      // reset form
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        password: "",
      });

      setHasSubmitted(false);

      // auto-hide success message + clear redux
      setTimeout(() => {
        setMessage(null);
        setMessageType("");
        dispatch(clearSignupState());
      }, 3000);
    }

    if (registrationError) {
      setMessage(registrationError);
      setMessageType("error");
      setHasSubmitted(false);

      // 🔥 AUTO HIDE ERROR MESSAGE
      setTimeout(() => {
        setMessage(null);
        setMessageType("");
        dispatch(clearSignupState()); 
      }, 3000);
    }
  }, [registrationStatus, registrationError, hasSubmitted, dispatch]);


  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper register-wrap bg-img" style={{
          backgroundImage: `url(${nashikKumbh})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh"
        }}>
          <div className="login-content authent-content">
            <form onSubmit={handleSubmit}>
              <div className="login-userset">

                <div className="login-logo logo-normal">
                  <img src={logo} alt="img" />
                </div>

                <Link to={route.dashboard} className="login-logo logo-white">
                  <img src={logoWhite} alt="Img" />
                </Link>

                <div className="login-userheading">
                  <h3>Register</h3>
                </div>

                {/* Full Name */}
                <div className="mb-3">
                  <label className="form-label">Name *</label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label">Phone *</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password *</label>
                  <input
                    type={passwordVisibility.password ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                  <span
                    className={`ti ${passwordVisibility.password ? "ti-eye" : "ti-eye-off"
                      }`}
                    onClick={() => togglePasswordVisibility("password")}
                  />
                </div>


                <div className="form-login">
                  <button
                    type="submit"
                    className="btn btn-login w-100"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Sign Up"}
                  </button>
                </div>

                <div className="signinform">
                  <h4>
                    Already have an account ?
                    <Link to={route.signin}> Sign In</Link>
                  </h4>
                </div>

              </div>
              {message && (
                <div
                  className={`alert ${messageType === "success" ? "alert-success" : "alert-danger"
                    }`}
                  role="alert"
                >
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
