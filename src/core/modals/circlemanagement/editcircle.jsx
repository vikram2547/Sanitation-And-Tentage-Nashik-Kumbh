import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";


const EditCircle = ({ selectedCircle }) => {
  const dispatch = useDispatch();
  const { success, error, loading } = useSelector((state) => state.circles);

  const [formData, setFormData] = useState({
    circle_name: "",
    circle_code: "",
    // sector_id: sector_id,
    boundary_coordinates: null,
  });

  // ✅ CLOSE MODAL + REMOVE BACKDROP PROPERLY
  useEffect(() => {
    if (success) {
      const modalEl = document.getElementById("edit-circle");

      if (modalEl) {
        const modalInstance =
          Modal.getInstance(modalEl) || new Modal(modalEl);

        modalInstance.hide();
      }

      // ✅ CLEANUP BACKDROP & BODY STATE (IMPORTANT)
      setTimeout(() => {
        document.body.classList.remove("modal-open");
        document.body.style.paddingRight = "";

        const backdrops = document.querySelectorAll(".modal-backdrop");
        backdrops.forEach((bd) => bd.remove());
      }, 500);
    }
  }, [success]);


  // ✅ Prefill when selectedCircle changes
  useEffect(() => {
    if (selectedCircle) {
      setFormData({
        circle_name: selectedCircle.circle_name || "",
        circle_code: selectedCircle.circle_code || "",
        // sector_id: sector_id,
        boundary_coordinates: null,
      });
    }
  }, [selectedCircle]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const circleId = selectedCircle?.circle_id || selectedCircle?.id;

    if (!circleId) {
      console.log("No User ID found");
      return;
    }

    const resultAction = await dispatch(
      updateUser({
        id: circleId,
        data: formData,
      })
    );
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

                    {/* <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Sector Id</label>
                        <input
                          type="text"
                          name="sector_id"
                          value={formData.sector_id}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div> */}

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Circle Name</label>
                        <input
                          type="text"
                          name="circle_name"
                          value={formData.circle_name}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Circle Code</label>
                        <input
                          type="text"
                          name="circle_code"
                          value={formData.circle_code}
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

export default EditCircle;
