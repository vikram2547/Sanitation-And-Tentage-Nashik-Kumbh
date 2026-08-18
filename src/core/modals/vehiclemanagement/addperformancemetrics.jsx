import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import {
  addVehiclePerformanceMetric,
  clearMessages,
} from "../../redux/vehiclePerformanceMetricSlice";
import { useTranslation } from "react-i18next";


const AddPerformanceMetrics = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();


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

  /* ================= SET TODAY DATE ================= */
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({
      ...prev,
      metric_date: today,
    }));
  }, []);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addVehiclePerformanceMetric(formData));
  };

  /* ================= SUCCESS FLOW ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("add-metric-modal");
    if (modalEl) {
      const modalInstance =
        Modal.getInstance(modalEl) || new Modal(modalEl);
      modalInstance.hide(); 
    }

    const today = new Date().toISOString().split("T")[0];
    setFormData({
      vehicle_id: "",
      route_id: "",
      metric_type: "",
      metric_value: "",
      metric_date: today,
    });
  }, [success]);

  /* ================= AUTO CLEAR ================= */
  useEffect(() => {
    if (!success && !error) return;
    const timer = setTimeout(() => {
      dispatch(clearMessages());
    }, 3000);
    return () => clearTimeout(timer);
  }, [success, error, dispatch]);

  return (
    <div className="modal fade" id="add-metric-modal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              {/* ===== HEADER ===== */}
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>{t("add_new_vehicle_performance_metric")}</h4>
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
                    {t("created_successfully")}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    {/* Vehicle ID */}
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

                    {/* Route ID */}
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

                    {/* Metric Type */}
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

                    {/* Metric Value */}
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

                    {/* Metric Date */}
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

                  {/* ===== FOOTER ===== */}
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
                      className="btn btn-success"
                      disabled={loading}
                    >
                      {loading ? t("adding") : t("submit")}
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

export default AddPerformanceMetrics;
