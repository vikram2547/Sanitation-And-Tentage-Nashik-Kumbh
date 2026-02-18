import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { clearMessages, updateVehiclePerformanceMetric } from "../../redux/vehiclePerformanceMetricSlice";

const EditPerformanceMetrics = ({ selectedMetric }) => {
  const dispatch = useDispatch();
  const { success, error, loading } = useSelector(
    (state) => state.performanceMetrics
  );

  const [formData, setFormData] = useState({
    vehicle_id: "",
    route_id: "",
    metric_date: "",
    metric_type: "",
    metric_value: "",
  });

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (!selectedMetric) return;
    setFormData({ ...selectedMetric });
  }, [selectedMetric]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMetric?.id) return;

    dispatch(
      updateVehiclePerformanceMetric({
        id: selectedMetric.id,
        data: formData,
      })
    );
  };

  /* ================= CLOSE ON SUCCESS ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("edit-performance-metric");
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
    <div className="modal fade" id="edit-performance-metric">
      <div className="modal-dialog modal-dialog-centered modal-lg">
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
                  className="btn-close"
                  data-bs-dismiss="modal"
                />
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
                    {Object.keys(formData).map((key) => (
                      <div className="col-lg-6" key={key}>
                        <div className="input-blocks">
                          <label>{key.replace(/_/g, " ").toUpperCase()}</label>
                          <input
                            type="text"
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    ))}
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
