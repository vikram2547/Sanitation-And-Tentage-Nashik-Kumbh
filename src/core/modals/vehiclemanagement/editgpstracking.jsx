import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import {
  clearMessages,
  updateVehicleGpsTracking,
} from "../../redux/vehicleGpsTrackingSlice";
import { useTranslation } from "react-i18next";


/* ================= TIMESTAMP HELPERS ================= */

const toInputDateTime = (value) => {
  if (!value) return "";
  return value.replace(" ", "T").slice(0, 16);
};

const toApiTimestamp = (value) => {
  if (!value) return "";
  return value.replace("T", " ") + ":00";
};

const EditGpsTracking = ({ selectedGps }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { success, error, loading } = useSelector(
    (state) => state.vehicleGpsTracking
  );

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

  /* ================= PREFILL ================= */

  useEffect(() => {
    if (selectedGps) {
      setFormData({
        vehicle_id: selectedGps.vehicle_id ?? "",
        assignment_id: selectedGps.assignment_id ?? "",
        latitude: selectedGps.latitude ?? "",
        longitude: selectedGps.longitude ?? "",
        speed: selectedGps.speed ?? "",
        direction: selectedGps.direction ?? "",
        ignition_status: selectedGps.ignition_status ?? "ON",
        fuel_level: selectedGps.fuel_level ?? "",
        odometer_reading: selectedGps.odometer_reading ?? "",
        accuracy: selectedGps.accuracy ?? "",
        timestamp: toInputDateTime(selectedGps.timestamp),
      });
    }
  }, [selectedGps]);

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedGps?.id) return;

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
      timestamp: toApiTimestamp(formData.timestamp),
    };

    dispatch(
      updateVehicleGpsTracking({
        id: selectedGps.id,
        data: payload,
      })
    );
  };

  /* ================= CLOSE MODAL ON SUCCESS ================= */

  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("edit-gps-modal");
    if (!modalEl) return;

    const modal = Modal.getInstance(modalEl) || new Modal(modalEl);

    const handleHidden = () => {
      document.body.classList.remove("modal-open");
      document.body.style.paddingRight = "";

      document
        .querySelectorAll(".modal-backdrop")
        .forEach((bd) => bd.remove());

      modalEl.removeEventListener("hidden.bs.modal", handleHidden);

      dispatch(clearMessages());
    };

    modalEl.addEventListener("hidden.bs.modal", handleHidden);

    modal.hide();
  }, [success, dispatch]);

  return (
    <div className="modal fade" id="edit-gps-modal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">
              {/* HEADER */}
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>{t("edit_gps_tracking")}</h4>
                </div>
                <button type="button" className="close" data-bs-dismiss="modal">
                  <span>×</span>
                </button>
              </div>

              {/* BODY */}
              <div className="modal-body custom-modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                  <div className="alert alert-success">
                    {t("updated_successfully")}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    {/* Vehicle ID */}
                    <div className="col-lg-4">
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

                    {/* Assignment ID */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("assignment_id")}</label>
                        <input
                          type="text"
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
                          type="text"
                          name="latitude"
                          value={formData.latitude}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    {/* Longitude */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("longitude")}</label>
                        <input
                          type="text"
                          name="longitude"
                          value={formData.longitude}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    {/* Speed */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("speed")}</label>
                        <input
                          type="text"
                          name="speed"
                          value={formData.speed}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    {/* Direction */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("direction")}</label>
                        <input
                          type="text"
                          name="direction"
                          value={formData.direction}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    {/* Ignition Status */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("ignition_status")}</label>
                        <input
                          type="text"
                          name="ignition_status"
                          value={formData.ignition_status}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    {/* Fuel Level */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("fuel_level")}</label>
                        <input
                          type="text"
                          name="fuel_level"
                          value={formData.fuel_level}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    {/* Odometer Reading */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("odometer_reading")}</label>
                        <input
                          type="text"
                          name="odometer_reading"
                          value={formData.odometer_reading}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    {/* Accuracy */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("accuracy")}</label>
                        <input
                          type="text"
                          name="accuracy"
                          value={formData.accuracy}
                          onChange={handleChange}
                          className="form-control"
                          required
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

                  {/* FOOTER */}
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

export default EditGpsTracking;