import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { clearMessages, updateVehicleRouteAssignment } from "../../redux/vehicleRouteAssignmentSlice";


const EditRouteAssignment = ({ selectedAssignment }) => {
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

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (!selectedAssignment) return;

    setFormData({
      vehicle_id: selectedAssignment.vehicle_id || "",
      route_id: selectedAssignment.route_id || "",
      assignment_date: selectedAssignment.assignment_date || "",
      driver_id: selectedAssignment.driver_id || "",
      shift: selectedAssignment.shift || "",
      planned_start_time: selectedAssignment.planned_start_time || "",
      planned_end_time: selectedAssignment.planned_end_time || "",
      assignment_status:
        selectedAssignment.assignment_status || "SCHEDULED",
    });
  }, [selectedAssignment]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedAssignment?.assignment_id) return;

    dispatch(
      updateVehicleRouteAssignment({
        route_assignment_id: selectedAssignment.assignment_id,
        data: {
          vehicle_id: Number(formData.vehicle_id),
          route_id: Number(formData.route_id),
          assignment_date: formData.assignment_date,
          driver_id: Number(formData.driver_id),
          shift: formData.shift,
          planned_start_time: formData.planned_start_time,
          planned_end_time: formData.planned_end_time,
          assignment_status: formData.assignment_status,
        },
      })
    );
  };

  /* ================= CLOSE ON SUCCESS ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("edit-assignment-modal");
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

  if (!selectedAssignment) return null;

  return (
    <div className="modal fade" id="edit-assignment-modal">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              {/* ===== HEADER ===== */}
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>Edit Route Assignment</h4>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                />
              </div>

              {/* ===== BODY ===== */}
              <div className="modal-body custom-modal-body">

                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                  <div className="alert alert-success">
                    Route assignment updated successfully
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Vehicle ID</label>
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

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Route ID</label>
                        <input
                          type="number"
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
                        <label>Assignment Date</label>
                        <input
                          type="date"
                          name="assignment_date"
                          value={formData.assignment_date}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Driver ID</label>
                        <input
                          type="number"
                          name="driver_id"
                          value={formData.driver_id}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Shift</label>
                        <select
                          name="shift"
                          value={formData.shift}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="">Select Shift</option>
                          <option value="MORNING">Morning</option>
                          <option value="EVENING">Evening</option>
                          <option value="NIGHT">Night</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Status</label>
                        <select
                          name="assignment_status"
                          value={formData.assignment_status}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="SCHEDULED">Scheduled</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="COMPLETED">Completed</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Planned Start Time</label>
                        <input
                          type="time"
                          name="planned_start_time"
                          value={formData.planned_start_time}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Planned End Time</label>
                        <input
                          type="time"
                          name="planned_end_time"
                          value={formData.planned_end_time}
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

export default EditRouteAssignment;
