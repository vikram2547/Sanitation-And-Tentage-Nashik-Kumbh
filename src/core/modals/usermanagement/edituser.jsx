// import CommonSelect from "../../../components/select/common-select";
// import { editUser } from "../../../utils/imagepath";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// const EditUser = () => {
//   const status = [
//   { value: "Choose", label: "Choose" },
//   { value: "Manager", label: "Manager" },
//   { value: "Admin", label: "Admin" }];

//   const [showPassword, setShowPassword] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState(null);
//   const handleTogglePassword = () => {
//     setShowPassword((prevShowPassword) => !prevShowPassword);
//   };
//   const [showConfirmPassword, setConfirmPassword] = useState(false);

//   const handleToggleConfirmPassword = () => {
//     setConfirmPassword((prevShowPassword) => !prevShowPassword);
//   };
//   return (
//     <div>
//       {/* Edit User */}
//       <div className="modal fade" id="edit-units">
//         <div className="modal-dialog modal-dialog-centered custom-modal-two">
//           <div className="modal-content">
//             <div className="page-wrapper-new p-0">
//               <div className="content">
//                 <div className="modal-header border-0 custom-modal-header">
//                   <div className="page-title">
//                     <h4>Edit User</h4>
//                   </div>
//                   <button
//                     type="button"
//                     className="close"
//                     data-bs-dismiss="modal"
//                     aria-label="Close">
                    
//                     <span aria-hidden="true">×</span>
//                   </button>
//                 </div>
//                 <div className="modal-body custom-modal-body">
//                   <form>
//                     <div className="row">
//                       <div className="col-lg-12">
//                         <div className="new-employee-field">
//                           <span>Avatar</span>
//                           <div className="profile-pic-upload edit-pic">
//                             <div className="profile-pic">
//                               <span>
//                                 <img
//                                   src={editUser}
//                                   className="user-editer"
//                                   alt="User" />
                                
//                               </span>
//                               <div className="close-img">
//                                 <i className="feather icon-x info-img" />
//                               </div>
//                             </div>
//                             <div className="input-blocks mb-0">
//                               <div className="image-upload mb-0">
//                                 <input type="file" />
//                                 <div className="image-uploads">
//                                   <h4>Change Image</h4>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="col-lg-6">
//                         <div className="input-blocks">
//                           <label>User Name</label>
//                           <input type="text" className="form-control" placeholder="Thomas" />
//                         </div>
//                       </div>
//                       <div className="col-lg-6">
//                         <div className="input-blocks">
//                           <label>Phone</label>
//                           <input type="text" className="form-control" placeholder={"+12163547758"} />
//                         </div>
//                       </div>
//                       <div className="col-lg-6">
//                         <div className="input-blocks">
//                           <label>Email</label>
//                           <input
//                             type="email"
//                             className="form-control"
//                             placeholder="thomas@example.com" />
                          
//                         </div>
//                       </div>
//                       <div className="col-lg-6">
//                         <div className="input-blocks">
//                           <label>Role</label>
//                           <CommonSelect
//                             className="w-100"
//                             options={status}
//                             value={selectedStatus}
//                             onChange={(e) => setSelectedStatus(e.value)}
//                             placeholder="Choose"
//                             filter={false} />
                          
//                         </div>
//                       </div>
//                       <div className="col-lg-6">
//                         <div className="input-blocks">
//                           <label>Password</label>
//                           <div className="pass-group">
//                             <input
//                               type={showPassword ? "text" : "password"}
//                               className="pass-input form-control"
//                               placeholder="Enter your password" />
                            
//                             <span
//                               className={`ti toggle-password text-gray-9 ${showPassword ? "ti-eye" : "ti-eye-off"}`}
//                               onClick={handleTogglePassword} />
                            
//                           </div>
//                         </div>
//                       </div>
//                       <div className="col-lg-6">
//                         <div className="input-blocks">
//                           <label>Confirm Passworrd</label>
//                           <div className="pass-group">
//                             <input
//                               type={showConfirmPassword ? "text" : "password"}
//                               className="pass-input form-control"
//                               placeholder="Enter your password" />
                            
//                             <span
//                               className={`ti   toggle-password  ${showConfirmPassword ? "ti-eye" : "ti-eye-off"}`}
//                               onClick={handleToggleConfirmPassword} />
                            
//                           </div>
//                         </div>
//                       </div>
//                       <div className="col-lg-12">
//                         <div className="mb-0 input-blocks">
//                           <label className="form-label">Descriptions</label>
//                           <textarea
//                             className="form-control mb-1"
//                             defaultValue={""} />
                          
//                           <p>Maximum 600 Characters</p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="modal-footer-btn">
//                       <button
//                         type="button"
//                         className="btn btn-cancel me-2"
//                         data-bs-dismiss="modal">
                        
//                         Cancel
//                       </button>
//                       <Link to="#" className="btn btn-submit">
//                         Submit
//                       </Link>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* /Edit User */}
//     </div>);

// };

// export default EditUser;
import CommonSelect from "../../../components/select/common-select";
import { editUser as editImage } from "../../../utils/imagepath";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages, updateUser } from "../../redux/usersSlice";

const EditUser = ({ selectedUser }) => {
  const dispatch = useDispatch();
  const { success, error, loading } = useSelector((state) => state.users);

  const status = [
    { value: 0, label: "Manager" },
    { value: 1, label: "Admin" },
  ];

  const [selectedStatus, setSelectedStatus] = useState(null);

  const [formData, setFormData] = useState({
    phone: "",
    full_name: "",
    email: "",
    user_type_id: 0,
    vendor_id: null,
    is_active: 1,
  });

  // ✅ Prefill data when selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      setFormData({
        phone: selectedUser.phone || "",
        full_name: selectedUser.full_name || "",
        email: selectedUser.email || "",
        user_type_id: selectedUser.user_type_id || 0,
        vendor_id: null,
        is_active: selectedUser.is_active ?? 1,
      });

      setSelectedStatus({
        value: selectedUser.user_type_id,
        label:
          selectedUser.user_type_id === 1 ? "Admin" : "Manager",
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (option) => {
    setSelectedStatus(option);
    setFormData({ ...formData, user_type_id: option.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateUser({
        id: selectedUser.id,
        data: formData,
      })
    );
  };

  // ✅ Auto clear message after 5 sec
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  return (
    <div>
      <div className="modal fade" id="edit-units">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Edit User</h4>
                  </div>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>

                <div className="modal-body custom-modal-body">

                  {/* ✅ Messages */}
                  {error && <div className="alert alert-danger">{error}</div>}
                  {success && <div className="alert alert-success">{success}</div>}

                  <form onSubmit={handleSubmit}>
                    <div className="row">

                      <div className="col-lg-12">
                        <div className="new-employee-field">
                          <span>Avatar</span>
                          <div className="profile-pic-upload edit-pic">
                            <div className="profile-pic">
                              <span>
                                <img
                                  src={editImage}
                                  className="user-editer"
                                  alt="User"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>User Name</label>
                          <input
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Phone</label>
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Role</label>
                          <CommonSelect
                            className="w-100"
                            options={status}
                            value={selectedStatus}
                            onChange={handleRoleChange}
                            placeholder="Choose"
                            filter={false}
                          />
                        </div>
                      </div>

                    </div>

                    <div className="modal-footer-btn">
                      <button
                        type="button"
                        className="btn btn-cancel me-2"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="btn btn-submit"
                        disabled={loading}
                      >
                        {loading ? "Updating..." : "Submit"}
                      </button>
                    </div>

                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
