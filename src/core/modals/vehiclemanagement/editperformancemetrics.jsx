import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import {
  clearMessages,
  updateVehiclePerformanceMetric,
} from "../../redux/vehiclePerformanceMetricSlice";

const EditPerformanceMetrics = ({ selectedMetric }) => {
  const dispatch = useDispatch();

  const { success, error, loading } = useSelector(
    (state) => state.vehiclePerformanceMetrics
  );

  const [formData, setFormData] = useState({
    vehicle_id: "",
    route_id: "",
    metric_type: "",
    metric_value: "",
    metric_date: "",
  });

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (!selectedMetric) return;

    setFormData({
      vehicle_id: selectedMetric.vehicle_id || "",
      route_id: selectedMetric.route_id || "",
      metric_type: selectedMetric.metric_type || "",
      metric_value: selectedMetric.metric_value || "",
      metric_date: selectedMetric.metric_date || "",
    });
  }, [selectedMetric]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMetric?.metric_id) return;

    dispatch(
      updateVehiclePerformanceMetric({
        id: selectedMetric.metric_id,
        data: formData,
      })
    );
  };

  /* ================= CLOSE ON SUCCESS ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("edit-metric-modal");
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

  if (!selectedMetric) return null;

  return (
    <div className="modal fade" id="edit-metric-modal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              {/* ===== HEADER ===== */}
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>Edit Performance Metric</h4>
                </div>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                >
                  <span>×</span>
                </button>
              </div>

              {/* ===== BODY ===== */}
              <div className="modal-body custom-modal-body">

                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                  <div className="alert alert-success">
                    Performance metric updated successfully
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    {/* VEHICLE ID */}
                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>VEHICLE ID</label>
                        <input
                          type="text"
                          name="vehicle_id"
                          value={formData.vehicle_id}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    {/* ROUTE ID */}
                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>ROUTE ID</label>
                        <input
                          type="text"
                          name="route_id"
                          value={formData.route_id}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    {/* METRIC TYPE */}
                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>METRIC TYPE</label>
                        <input
                          type="text"
                          name="metric_type"
                          value={formData.metric_type}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    {/* METRIC VALUE */}
                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>METRIC VALUE</label>
                        <input
                          type="text"
                          name="metric_value"
                          value={formData.metric_value}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    {/* METRIC DATE (FIXED) */}
                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>METRIC DATE</label>
                        <input
                          type="date"
                          name="metric_date"
                          value={formData.metric_date}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* ===== FOOTER ===== */}
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

export default EditPerformanceMetrics;
