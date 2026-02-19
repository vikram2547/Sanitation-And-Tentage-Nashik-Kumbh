import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import {
  clearMessages,
  updateVehicleGpsTracking,
} from "../../redux/vehicleGpsTrackingSlice";

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
      ...selectedGps,
      timestamp: selectedGps.timestamp
        ? selectedGps.timestamp.replace(" ", "T")
        : "",
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
      ...formData,
      timestamp: formData.timestamp
        ? formData.timestamp.replace("T", " ")
        : "",
    };

    // ✅ DISPATCH WILL FIRE
    dispatch(
      updateVehicleGpsTracking({
        id: selectedGps.id,
        data: payload,
      })
    );
  };

  /* ================= CLOSE ON SUCCESS ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("edit-gps-modal");
    if (!modalEl) return;

    const modal =
      Modal.getInstance(modalEl) || new Modal(modalEl);

    // ✅ FIX accessibility warning
    document.activeElement?.blur();

    modal.hide();

    setTimeout(() => {
      document.body.classList.remove("modal-open");
      document.body.style.paddingRight = "";
      document
        .querySelectorAll(".modal-backdrop")
        .forEach((bd) => bd.remove());
      dispatch(clearMessages());
    }, 300);
  }, [success, dispatch]);

  if (!selectedGps) return null;

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
                <button type="button" className="close" data-bs-dismiss="modal">
                  <span>×</span>
                </button>
              </div>

              {/* BODY */}
              <div className="modal-body custom-modal-body">

                {error && <div className="alert alert-danger">{error}</div>}
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
