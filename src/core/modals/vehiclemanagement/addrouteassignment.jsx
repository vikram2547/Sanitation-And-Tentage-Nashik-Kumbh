import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { addVehicleRouteAssignment, clearMessages } from "../../redux/vehicleRouteAssignmentSlice";

const AddRouteAssignment = () => {
  const dispatch = useDispatch();

  const { success, error, loading } = useSelector(
    (state) => state.vehicleRouteAssignments
  );

  const [formData, setFormData] = useState({
    vehicle_id: "",
    route_id: "",
    assignment_date: "",
    driver_id: "",
    shift: "",
    planned_start_time: "",
    planned_end_time: "",
    assignment_status: "SCHEDULED",
  });

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addVehicleRouteAssignment(formData));
  };

  /* ================= SUCCESS FLOW ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("add-assignment-modal");
    if (modalEl) {
      const modalInstance =
        Modal.getInstance(modalEl) || new Modal(modalEl);
      modalInstance.hide();
    }

    setFormData({
      vehicle_id: "",
      route_id: "",
      assignment_date: "",
      driver_id: "",
      shift: "",
      planned_start_time: "",
      planned_end_time: "",
      assignment_status: "SCHEDULED",
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
    <div className="modal fade" id="add-assignment-modal">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              {/* ===== HEADER ===== */}
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>Add Route Assignment</h4>
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
                    Route assignment added successfully
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {Object.keys(formData).map((key) => (
                      <div className="col-lg-6" key={key}>
                        <div className="input-blocks">
                          <label>{key.replace(/_/g, " ").toUpperCase()}</label>

                          {key === "assignment_status" || key === "shift" ? (
                            <select
                              name={key}
                              value={formData[key]}
                              onChange={handleChange}
                              className="form-control"
                              required
                            >
                              {key === "shift" && (
                                <>
                                  <option value="">Select Shift</option>
                                  <option value="MORNING">Morning</option>
                                  <option value="EVENING">Evening</option>
                                  <option value="NIGHT">Night</option>
                                </>
                              )}

                              {key === "assignment_status" && (
                                <>
                                  <option value="SCHEDULED">Scheduled</option>
                                  <option value="COMPLETED">Completed</option>
                                </>
                              )}
                            </select>
                          ) : (
                            <input
                              type={
                                key.includes("date")
                                  ? "date"
                                  : key.includes("time")
                                  ? "time"
                                  : "text"
                              }
                              name={key}
                              value={formData[key]}
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
                          )}
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

export default AddRouteAssignment;
