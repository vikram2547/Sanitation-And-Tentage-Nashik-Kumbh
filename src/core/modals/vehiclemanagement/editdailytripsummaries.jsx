import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { clearMessages, updateVehicleDailyTripSummary } from "../../redux/vehicleDailyTripSummarySlice";


const EditDailyTripSummaries = ({ selectedTrip }) => {
  const dispatch = useDispatch();
  const { success, error, loading } = useSelector(
    (state) => state.vehicleDailyTripSummaries
  );

  const [formData, setFormData] = useState({
    assignment_id: "",
    vehicle_id: "",
    route_id: "",
    trip_date: "",
    start_time: "",
    end_time: "",
    total_distance: "",
    total_points_assigned: "",
    total_points_visited: "",
    total_points_missed: "",
    total_garbage_collected: "",
    avg_speed: "",
    max_speed: "",
    idle_time: "",
    moving_time: "",
    completion_percentage: "",
    trip_status: "COMPLETED",
  });

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (!selectedTrip) return;
    setFormData({ ...selectedTrip });
  }, [selectedTrip]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTrip?.id) return;

    dispatch(
      updateVehicleDailyTripSummary({
        id: selectedTrip.id,
        data: formData,
      })
    );
  };

  /* ================= CLOSE ON SUCCESS ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("edit-daily-trip-summary");
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

  if (!selectedTrip) return null;

  return (
    <div className="modal fade" id="edit-daily-trip-summary">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              {/* ===== HEADER ===== */}
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>Edit Daily Trip Summary</h4>
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
                    Daily trip summary updated successfully
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {Object.keys(formData).map((key) => (
                      <div className="col-lg-4" key={key}>
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

export default EditDailyTripSummaries;
