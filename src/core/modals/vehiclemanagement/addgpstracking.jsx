import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import {
  addVehicleGpsTracking,
  clearMessages,
} from "../../redux/vehicleGpsTrackingSlice";

const AddGpsTracking = () => {
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
      timestamp: formData.timestamp,
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

    setTimeout(() => {
      document.body.classList.remove("modal-open");
      document.body.style.paddingRight = "";
      document
        .querySelectorAll(".modal-backdrop")
        .forEach((bd) => bd.remove());
    }, 300);

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
    }, 5000);
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
                  <h4>Add GPS Tracking</h4>
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
                    GPS tracking added successfully
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {Object.keys(formData).map((key) => (
                      <div className="col-lg-4" key={key}>
                        <div className="input-blocks">
                          <label>{key.replace(/_/g, " ").toUpperCase()}</label>
                          <input
                            type={key === "timestamp" ? "datetime-local" : "text"}
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
                      {loading ? "Adding..." : "Submit"}
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
