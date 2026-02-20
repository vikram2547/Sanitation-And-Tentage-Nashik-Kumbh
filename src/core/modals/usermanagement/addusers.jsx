
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages, createUser } from "../../redux/usersSlice";
import { Modal } from "bootstrap";


const AddUsers = () => {
  const dispatch = useDispatch();

  const { success, error, loading } = useSelector((state) => state.users);


  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    full_name: "",
    email: "",
    user_type_id: 0,
    vendor_id: null,
    is_active: 1,
  });


  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      phone: formData.phone,
      password: formData.password,
      full_name: formData.full_name,
      email: formData.email,
      user_type_id: formData.user_type_id,
      vendor_id: null,
      is_active: 1,
    };

    const resultAction = await dispatch(createUser(payload));

    if (createUser.fulfilled.match(resultAction)) {
      // Close modal
      const modal = window.bootstrap.Modal.getInstance(
        document.getElementById("add-units")
      );
      modal?.hide();
    }
  };


  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("add-units");




    if (modalEl) {
      const modalInstance =
        Modal.getInstance(modalEl) || new Modal(modalEl);

      modalInstance.hide();
    }
    setFormData({
      phone: "",
      password: "",
      full_name: "",
      email: "",
      user_type_id: 0,
      vendor_id: null,
      is_active: 1,
    })


  }, [success]);


  // ✅ Show message for 5 sec
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  // ✅ Reset form after success
  useEffect(() => {
    if (success) {
      setFormData({
        phone: "",
        password: "",
        full_name: "",
        email: "",
        user_type_id: 0,
        vendor_id: null,
        is_active: 1,
      });
    }
  }, [success]);

  return (
    <div>
      <div className="modal fade" id="add-units">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Add User</h4>
                  </div>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>

                <div className="modal-body custom-modal-body">

                  {/* ✅ Message */}
                  {error && (
                    <div className="alert alert-danger">{error}</div>
                  )}
                  {success && (
                    <div className="alert alert-success">{success}</div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="row">

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
                          <label>Password</label>
                          <div className="pass-group">
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              className="pass-input form-control"
                            />
                            <span
                              className={`ti toggle-password ${showPassword ? "ti-eye" : "ti-eye-off"
                                }`}
                              onClick={handleTogglePassword}
                            />
                          </div>
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
                        {loading ? "Adding..." : "Submit"}
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

export default AddUsers;
