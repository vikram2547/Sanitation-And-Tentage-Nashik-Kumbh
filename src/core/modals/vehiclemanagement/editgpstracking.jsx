import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import {
  clearMessages,
  updateVehicleGpsTracking,
} from "../../redux/vehicleGpsTrackingSlice";

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
    if (!selectedGps) return;

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
                  <h4>Edit GPS Tracking</h4>
                </div>

                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                >
                  <span>×</span>
                </button>
              </div>

              {/* BODY */}

              <div className="modal-body custom-modal-body">

                {error && (
                  <div className="alert alert-danger">{error}</div>
                )}

                {success && (
                  <div className="alert alert-success">
                    GPS tracking updated successfully
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    {Object.keys(formData).map((key) => (
                      <div className="col-lg-4" key={key}>
                        <div className="input-blocks">

                          <label>
                            {key.replace(/_/g, " ").toUpperCase()}
                          </label>

                          <input
                            type={
                              key === "timestamp"
                                ? "datetime-local"
                                : "text"
                            }
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

                  {/* FOOTER */}

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

export default EditGpsTracking;