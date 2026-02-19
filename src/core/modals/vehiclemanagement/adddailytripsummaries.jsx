import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import {
  addVehicleDailyTripSummary,
  clearMessages,
} from "../../redux/vehicleDailyTripSummarySlice";

const AddDailyTripSummaries = () => {
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

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.assignment_id ||
      !formData.vehicle_id ||
      !formData.route_id ||
      !formData.trip_date ||
      !formData.start_time ||
      !formData.end_time
    ) {
      alert("Please fill all required fields");
      return;
    }

    const payload = {
      assignment_id: Number(formData.assignment_id),
      vehicle_id: Number(formData.vehicle_id),
      route_id: Number(formData.route_id),
      trip_date: formData.trip_date, // YYYY-MM-DD

      start_time: `${formData.start_time}:00`, // HH:mm:ss
      end_time: `${formData.end_time}:00`,     // HH:mm:ss

      total_distance: Number(formData.total_distance || 0),
      total_points_assigned: Number(formData.total_points_assigned || 0),
      total_points_visited: Number(formData.total_points_visited || 0),
      total_points_missed: Number(formData.total_points_missed || 0),
      total_garbage_collected: Number(formData.total_garbage_collected || 0),

      avg_speed: Number(formData.avg_speed || 0),
      max_speed: Number(formData.max_speed || 0),

      idle_time: Number(formData.idle_time || 0),
      moving_time: Number(formData.moving_time || 0),

      completion_percentage: Number(formData.completion_percentage || 0),

      trip_status: formData.trip_status, // COMPLETED / IN_PROGRESS / CANCELLED
    };

    console.log("ADD DAILY TRIP SUMMARY PAYLOAD:", payload);

    dispatch(addVehicleDailyTripSummary(payload));
  };

  /* ================= SUCCESS FLOW ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("add-daily-trip-summary");
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

    dispatch(clearMessages());
  }, [success, dispatch]);

  /* ================= AUTO CLEAR ================= */
  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => dispatch(clearMessages()), 5000);
    return () => clearTimeout(timer);
  }, [error, dispatch]);

  return (
    <div className="modal fade" id="add-daily-trip-summary" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              {/* ===== HEADER ===== */}
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>Add Daily Trip Summary</h4>
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
                    Daily trip summary created successfully
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    {/* IDs */}
                    {["assignment_id", "vehicle_id", "route_id"].map((f) => (
                      <div className="col-lg-4" key={f}>
                        <div className="input-blocks">
                          <label>{f.replace(/_/g, " ").toUpperCase()}</label>
                          <input
                            type="number"
                            name={f}
                            value={formData[f]}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    ))}

                    {/* Date & Time */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>TRIP DATE</label>
                        <input
                          type="date"
                          name="trip_date"
                          value={formData.trip_date}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>START TIME</label>
                        <input
                          type="time"
                          name="start_time"
                          value={formData.start_time}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>END TIME</label>
                        <input
                          type="time"
                          name="end_time"
                          value={formData.end_time}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    {/* Numeric metrics */}
                    {[
                      "total_distance",
                      "total_points_assigned",
                      "total_points_visited",
                      "total_points_missed",
                      "total_garbage_collected",
                      "avg_speed",
                      "max_speed",
                      "idle_time",
                      "moving_time",
                      "completion_percentage",
                    ].map((f) => (
                      <div className="col-lg-4" key={f}>
                        <div className="input-blocks">
                          <label>{f.replace(/_/g, " ").toUpperCase()}</label>
                          <input
                            type="number"
                            name={f}
                            value={formData[f]}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                      </div>
                    ))}

                    {/* Status */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>TRIP STATUS</label>
                        <select
                          name="trip_status"
                          value={formData.trip_status}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="COMPLETED">Completed</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
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

export default AddDailyTripSummaries;
