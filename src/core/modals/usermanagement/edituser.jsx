import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages, updateUser } from "../../redux/usersSlice";

const EditUser = ({ selectedUser }) => {
  const dispatch = useDispatch();
  const { success, error, loading } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    phone: "",
    full_name: "",
    email: "",
    user_type_id: 0,
    vendor_id: null,
    is_active: 1,
  });

  // ✅ Prefill when selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      setFormData({
        phone: selectedUser.phone || "",
        full_name: selectedUser.full_name || "",
        email: selectedUser.email || "",
        user_type_id: Number(selectedUser.user_type_id) || 0,
        vendor_id: null,
        is_active: Number(selectedUser.is_active) || 1,
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    console.log("MODAL RECEIVED:", selectedUser);
  }, [selectedUser]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = selectedUser?.user_id || selectedUser?.id;

    if (!userId) {
      console.log("No User ID found");
      return;
    }

    const resultAction = await dispatch(
      updateUser({
        id: userId,
        data: formData,
      })
    );

    console.log("Result Action:", resultAction);
  };
  
  // ✅ Auto clear message
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  return (
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
                {error && <div className="alert alert-danger">{error}</div>}
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
                      {loading ? "Updating..." : "Update"}
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
