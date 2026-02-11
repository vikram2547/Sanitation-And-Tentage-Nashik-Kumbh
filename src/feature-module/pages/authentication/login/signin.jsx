import React, { useState } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../../../routes/all_routes";
import { appleLogo, facebookLogo, googleLogo, logoPng, logoWhitePng, nashikKumbh } from "../../../../utils/imagepath";


const Signin = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const route = all_routes;

  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper">
        <div className="account-content">
          <div className="login-wrapper bg-img" style={{
          backgroundImage: `url(${nashikKumbh})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh"
        }}>
            <div className="login-content authent-content">
              <form>
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
                  <div className="mb-3">
                    <label className="form-label">
                      Phone <span className="text-danger"> *</span>
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        defaultValue=""
                        className="form-control border-end-0" />
                      
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Password <span className="text-danger"> *</span>
                    </label>
                    <div className="pass-group">
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        className="pass-input form-control" />
                      
                      <span
                        className={`ti toggle-password text-gray-9 ${
                        isPasswordVisible ? "ti-eye" : "ti-eye-off"}`
                        }
                        onClick={togglePasswordVisibility}>
                      </span>
                    </div>
                  </div>
                  <div className="form-login authentication-check">
                    <div className="row">
                      <div className="col-12 d-flex align-items-center justify-content-between">
                        <div className="text-end">
                          <Link
                            className="text-orange fs-16 fw-medium"
                            to={route.forgotPassword}>
                            
                            Forgot Password?
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-login">
                    <Link
                      to={route.newdashboard}
                      className="btn btn-login w-100">
                      
                      Sign In
                    </Link>
                  </div>
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
    </>);

};

export default Signin;


// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { all_routes } from "../../../../routes/all_routes";
// import {
//   logoPng,
//   logoWhitePng,
//   nashikKumbh,
// } from "../../../../utils/imagepath";
// import { clearSigninState, signinUser } from "../../../../core/redux/signinSlice";

// const Signin = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const route = all_routes;

//   const {
//     loading,
//     loginSuccess,
//     twoFactorRequired,
//     loginError,
//   } = useSelector((state) => state.signin);

//   const [isPasswordVisible, setPasswordVisible] = useState(false);
//   const [formData, setFormData] = useState({
//     phone: "",
//     password: "",
//   });

//   /* ================= HANDLE INPUT ================= */

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   /* ================= HANDLE SUBMIT ================= */

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(signinUser(formData));
//   };

//   /* ================= NAVIGATION ================= */

//   // Clear old state on page load
//   useEffect(() => {
//     if (loginError) {
//       const timer = setTimeout(() => {
//         dispatch(clearSigninState());
//       }, 5000);

//       return () => clearTimeout(timer);
//     }
//   }, [loginError, dispatch]);

//   // Handle navigation
//   useEffect(() => {
//     if (twoFactorRequired) {
//       navigate("/email-verification");
//     }
//   }, [twoFactorRequired, navigate]);

//   /* ================= UI ================= */

//   return (
//     <div className="main-wrapper">
//       <div className="account-content">
//         <div
//           className="login-wrapper bg-img"
//           style={{
//             backgroundImage: `url(${nashikKumbh})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             minHeight: "100vh",
//           }}
//         >
//           <div className="login-content authent-content">
//             <form onSubmit={handleSubmit}>
//               <div className="login-userset">

//                 <div className="login-logo logo-normal">
//                   <img src={logoPng} alt="img" />
//                 </div>

//                 <Link to={route.dashboard} className="login-logo logo-white">
//                   <img src={logoWhitePng} alt="Img" />
//                 </Link>

//                 <div className="login-userheading">
//                   <h3>Sign In</h3>
//                   <h4 className="fs-16">
//                     Access using your phone and passcode.
//                   </h4>
//                 </div>

//                 {/* PHONE */}
//                 <div className="mb-3">
//                   <label className="form-label">
//                     Phone <span className="text-danger">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="form-control"
//                     required
//                   />
//                 </div>

//                 {/* PASSWORD */}
//                 <div className="mb-3">
//                   <label className="form-label">
//                     Password <span className="text-danger">*</span>
//                   </label>
//                   <div className="pass-group">
//                     <input
//                       type={isPasswordVisible ? "text" : "password"}
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       className="pass-input form-control"
//                       required
//                     />
//                     <span
//                       className={`ti toggle-password ${isPasswordVisible ? "ti-eye" : "ti-eye-off"
//                         }`}
//                       onClick={() =>
//                         setPasswordVisible(!isPasswordVisible)
//                       }
//                     ></span>
//                   </div>
//                 </div>
//                 <div className="form-login authentication-check">
//                   <div className="row">
//                     <div className="col-12 d-flex align-items-center justify-content-between">
//                       <div className="text-end">
//                         <Link
//                           className="text-orange fs-16 fw-medium"
//                           to={route.forgotPassword}>

//                           Forgot Password?
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* ERROR MESSAGE */}
//                 {loginError && (
//                   <div className="alert alert-danger">
//                     {loginError}
//                   </div>
//                 )}

//                 {/* SUBMIT BUTTON */}
//                 <div className="form-login">
//                   <button
//                     type="submit"
//                     className="btn btn-login w-100"
//                     disabled={loading}
//                   >
//                     {loading ? "Signing in..." : "Sign In"}
//                   </button>
//                 </div>

//                 <div className="signinform">
//                   <h4>
//                     New on our platform?
//                     <Link to={route.register} className="hover-a">
//                       {" "}Create an account
//                     </Link>
//                   </h4>
//                 </div>

//                 <div className="my-4 d-flex justify-content-center align-items-center copyright-text">
//                   <p>Copyright © 2026 KASH IT</p>
//                 </div>

//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signin;
