import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { addVehicleRouteAssignment, clearMessages } from "../../redux/vehicleRouteAssignmentSlice";
import { useTranslation } from "react-i18next";

const AddRouteAssignment = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      const modalInstance = Modal.getInstance(modalEl) || new Modal(modalEl);
      modalInstance.hide();
    }

    // Reset form after successful submission
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

              {/* HEADER */}
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>{t("add_new_vehicle_route_assignment")}</h4>
                </div>
                <button type="button" className="close" data-bs-dismiss="modal">
                  <span>×</span>
                </button>
              </div>

              {/* BODY */}
              <div className="modal-body custom-modal-body">

                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                  <div className="alert alert-success">{t("created_successfully")}</div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    <div className="col-lg-6">
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

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("route_id")}</label>
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
                        <label>{t("assignment_date")}</label>
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
                        <label>{t("driver_id")}</label>
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
                        <label>{t("shift")}</label>
                        <select
                          name="shift"
                          value={formData.shift}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="">Select Shift</option>
                          <option value="Morning">Morning</option>
                          <option value="Evening">Evening</option>
                          <option value="Night">Night</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("start_time")}</label>
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
                        <label>{t("end_time")}</label>
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

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("status")}</label>
                        <select
                          name="assignment_status"
                          value={formData.assignment_status}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="SCHEDULED">Scheduled</option>
                          <option value="COMPLETED">Completed</option>
                        </select>
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

export default AddRouteAssignment;