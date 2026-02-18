import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { clearMessages, updateVehicleRoute } from "../../redux/vehicleRouteSlice";

const EditRoute = ({ selectedRoute }) => {
  const dispatch = useDispatch();

  const { success, error, loading } = useSelector(
    (state) => state.vehicleRoutes
  );

  const [formData, setFormData] = useState({
    route_code: "",
    route_name: "",
    status: "ACTIVE",
  });

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (!selectedRoute) return;

    setFormData({
      route_code: selectedRoute.route_code || "",
      route_name: selectedRoute.route_name || "",
      status: selectedRoute.status || "ACTIVE",
    });
  }, [selectedRoute]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedRoute?.route_id) return;

    dispatch(
      updateVehicleRoute({
        route_id: selectedRoute.route_id, // ✅ FIXED KEY
        data: formData,
      })
    );
  };

  /* ================= CLOSE ON SUCCESS ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("edit-route-modal");
    if (!modalEl) return;

    const modalInstance =
      Modal.getInstance(modalEl) || new Modal(modalEl);

    modalInstance.hide();
    modalInstance.dispose();

    setTimeout(() => {
      document.body.classList.remove("modal-open");
      document.body.style.paddingRight = "";
      document
        .querySelectorAll(".modal-backdrop")
        .forEach((bd) => bd.remove());

      dispatch(clearMessages());
    }, 300);
  }, [success, dispatch]);

  // if (!selectedRoute) return null;
  return (
    <div className="modal fade" id="edit-route-modal">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              {/* HEADER */}
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>Edit Route</h4>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                />
              </div>

              {/* BODY */}
              <div className="modal-body custom-modal-body">

                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                  <div className="alert alert-success">
                    Route updated successfully
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Route Code</label>
                        <input
                          type="text"
                          name="route_code"
                          value={formData.route_code}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Route Name</label>
                        <input
                          type="text"
                          name="route_name"
                          value={formData.route_name}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Status</label>
                        <select
                          className="form-control"
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                        >
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="INACTIVE">INACTIVE</option>
                        </select>
                      </div>
                    </div>

                  </div>

                  <div className="modal-footer-btn mt-3">
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

export default EditRoute;
