import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import {
  clearMessages,
  updateVehiclePerformanceMetric,
} from "../../redux/vehiclePerformanceMetricSlice";
import { useTranslation } from "react-i18next";


const EditPerformanceMetrics = ({ selectedMetric }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { success, error, loading } = useSelector(
    (state) => state.vehiclePerformanceMetrics
  );

  const [formData, setFormData] = useState({
    vehicle_id: "",
    route_id: "",
    metric_type: "DISTANCE",
    metric_value: "",
    metric_date: "",
  });

   /* ================= CLOSE MODAL ON SUCCESS ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("edit-metric-modal");
    if (!modalEl) return;

    const modalInstance = Modal.getInstance(modalEl);
    if (!modalInstance) return;

    const handleHidden = () => {
      // CLEANUP
      document.body.classList.remove("modal-open");
      document.body.style.paddingRight = "";
      document.querySelectorAll(".modal-backdrop").forEach((bd) => bd.remove());

      modalEl.removeEventListener("hidden.bs.modal", handleHidden);
      dispatch(clearMessages());
    };

    modalEl.addEventListener("hidden.bs.modal", handleHidden);
    modalInstance.hide();
  }, [success, dispatch]);

  /* ================= PREFILL FORM AND SHOW MODAL ================= */
   useEffect(() => {
    if (selectedMetric) {
      setFormData({
      vehicle_id: selectedMetric.vehicle_id || "",
      route_id: selectedMetric.route_id || "",
      metric_type: selectedMetric.metric_type || "DISTANCE",
      metric_value: selectedMetric.metric_value || "",
      metric_date: selectedMetric.metric_date || "",
      });
    }
  }, [selectedMetric]);
  

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= SUBMIT ================= */
const handleSubmit = async (e) => {
      e.preventDefault();

      const metricId = selectedMetric?.metric_id || selectedMetric?.id;

      if (!metricId) {
        console.log("No Metric ID found");
        return;
      }

      const resultAction = await dispatch(
        updateVehiclePerformanceMetric({
          id: metricId,
          data: formData,
        })
      );
    };

 

  /* ================= RENDER MODAL ================= */
  return (
    <div className="modal fade" id="edit-metric-modal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              {/* ===== HEADER ===== */}
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>{t("edit_performance_metric")}</h4>
                </div>
                <button type="button" className="close" data-bs-dismiss="modal">
                  <span>×</span>
                </button>
              </div>

              {/* ===== BODY ===== */}
              <div className="modal-body custom-modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                  <div className="alert alert-success">
                    {t("updated_successfully")}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("vehicle_id")}</label>
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

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("route_id")}</label>
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

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("metric_type")}</label>
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

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("metric_value")}</label>
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

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("metric_date")}</label>
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

                  <div className="modal-footer-btn mt-3">
                    <button
                      type="button"
                      className="btn btn-cancel me-2"
                      data-bs-dismiss="modal"
                    >
                      {t("cancel")}
                    </button>
                    <button
                      type="submit"
                      className="btn btn-submit"
                      disabled={loading}
                    >
                      {loading ? t("updating") : t("update")}
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