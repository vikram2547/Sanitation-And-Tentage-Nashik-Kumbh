import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import {
  addVehicleGpsTracking,
  clearMessages,
} from "../../redux/vehicleGpsTrackingSlice";
import { useTranslation } from "react-i18next";


const AddGpsTracking = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { success, error, loading } = useSelector(
    (state) => state.vehicleGpsTracking
  );

  const formatTimestampForAPI = (value) => {
    if (!value) return "";

    // value: "2026-02-19T17:04"
    return value.replace("T", " ") + ":00";
  };

  const [formData, setFormData] = useState({
    vehicle_id: "",
    assignment_id: "",
    latitude: "",
    longitude: "",
    speed: "",
    direction: "",
    ignition_status: "ON",
    fuel_level: "",
    odometer_reading: "",
    accuracy: "",
    timestamp: "",
  });

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Convert to API-required payload
    const payload = {
      vehicle_id: Number(formData.vehicle_id),
      assignment_id: Number(formData.assignment_id),
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
      speed: Number(formData.speed),
      direction: Number(formData.direction),
      ignition_status: formData.ignition_status,
      fuel_level: Number(formData.fuel_level),
      odometer_reading: Number(formData.odometer_reading),
      accuracy: Number(formData.accuracy),
      timestamp: formatTimestampForAPI(formData.timestamp),
    };

    dispatch(addVehicleGpsTracking(payload));
  };

  /* ================= SUCCESS FLOW ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("add-gps-modal");
    if (modalEl) {
      const modalInstance =
        Modal.getInstance(modalEl) || new Modal(modalEl);
      modalInstance.hide();
    }
    setFormData({
      vehicle_id: "",
      assignment_id: "",
      latitude: "",
      longitude: "",
      speed: "",
      direction: "",
      ignition_status: "ON",
      fuel_level: "",
      odometer_reading: "",
      accuracy: "",
      timestamp: "",
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
    <div className="modal fade" id="add-gps-modal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              {/* ===== HEADER ===== */}
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>{t("add_new_vehicle_gps_tracking")}</h4>
                </div>
                <button type="button" className="close" data-bs-dismiss="modal">
                  <span>×</span>
                </button>
              </div>

              {/* ===== BODY ===== */}
              <div className="modal-body custom-modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{t("created_successfully")}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    {/* Vehicle ID */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("vehicle_id")}</label>
                        <input
                          type="number"
                          name="vehicle_id"
                          value={formData.vehicle_id}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    {/* Assignment ID */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("assignment_id")}</label>
                        <input
                          type="number"
                          name="assignment_id"
                          value={formData.assignment_id}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    {/* Latitude */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("latitude")}</label>
                        <input
                          type="number"
                          step="any"
                          name="latitude"
                          value={formData.latitude}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* Longitude */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("longitude")}</label>
                        <input
                          type="number"
                          step="any"
                          name="longitude"
                          value={formData.longitude}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* Speed */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("speed")}</label>
                        <input
                          type="number"
                          name="speed"
                          value={formData.speed}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* Direction */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("direction")}</label>
                        <input
                          type="number"
                          name="direction"
                          value={formData.direction}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* Ignition Status */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("ignition_status")}</label>
                        <select
                          name="ignition_status"
                          value={formData.ignition_status}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="ON">{t("on")}</option>
                          <option value="OFF">{t("off")}</option>
                        </select>
                      </div>
                    </div>

                    {/* Fuel Level */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("fuel_level")}</label>
                        <input
                          type="number"
                          name="fuel_level"
                          value={formData.fuel_level}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* Odometer Reading */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("odometer_reading")}</label>
                        <input
                          type="number"
                          name="odometer_reading"
                          value={formData.odometer_reading}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* Accuracy */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("accuracy")}</label>
                        <input
                          type="number"
                          name="accuracy"
                          value={formData.accuracy}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* Timestamp */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("timestamp")}</label>
                        <input
                          type="datetime-local"
                          name="timestamp"
                          value={formData.timestamp}
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
                      className="btn btn-submit"
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

export default AddGpsTracking;
