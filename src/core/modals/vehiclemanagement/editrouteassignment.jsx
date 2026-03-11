import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import {
  clearMessages,
  updateVehicleRouteAssignment,
} from "../../redux/vehicleRouteAssignmentSlice";
import { useTranslation } from "react-i18next";


const EditRouteAssignment = ({ selectedAssignment }) => {
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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

    const modal =
      Modal.getInstance(modalEl) || new Modal(modalEl);

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
    <div className="modal fade" id="edit-assignment-modal">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              {/* HEADER */}
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>{t("edit_vehicle_route_assignment")}</h4>
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
                    {t("updated_successfully")}
                  </div>
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
                        <label>{t("status")}</label>
                        <select
                          name="assignment_status"
                          value={formData.assignment_status}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="Sheduled">Sheduled</option>
                          <option value="Completed">Completed</option>
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

                  </div>

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

export default EditRouteAssignment;