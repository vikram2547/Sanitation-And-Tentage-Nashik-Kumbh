import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { clearMessages, updateVehicleDailyTripSummary } from "../../redux/vehicleDailyTripSummarySlice";
import { useTranslation } from "react-i18next";


const EditDailyTripSummaries = ({ selectedTrip }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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

    const modal =
      Modal.getInstance(modalEl) || new Modal(modalEl);

    const handleHidden = () => {
      // CLEANUP AFTER BOOTSTRAP FINISHES
      document.body.classList.remove("modal-open");
      document.body.style.paddingRight = "";
      document
        .querySelectorAll(".modal-backdrop")
        .forEach((bd) => bd.remove());

      modalEl.removeEventListener("hidden.bs.modal", handleHidden);
    };

    modalEl.addEventListener("hidden.bs.modal", handleHidden);
    modal.hide();
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
                  <h4>{t("edit_daily_trip_summary")}</h4>
                </div>
                <button type="button" className="close" data-bs-dismiss="modal">
                  <span>×</span>
                </button>
              </div>

              {/* ===== BODY ===== */}
              <div className="modal-body custom-modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{t("updated_successfully")}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    {/* Assignment ID */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("assignment_id")}</label>
                        <input
                          type="number"
                          name="assignment_id"
                          value={formData.assignment_id}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    {/* Vehicle ID */}
                    <div className="col-lg-4">
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

                    {/* Route ID */}
                    <div className="col-lg-4">
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

                    {/* Trip Date */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("trip_date")}</label>
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

                    {/* Start Time */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("start_time")}</label>
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

                    {/* End Time */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("end_time")}</label>
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

                    {/* Idle Time */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("idle_time")}</label>
                        <input
                          type="time"
                          name="idle_time"
                          value={formData.idle_time}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* Moving Time */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("moving_time")}</label>
                        <input
                          type="time"
                          name="moving_time"
                          value={formData.moving_time}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* Total Distance */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("total_distance")}</label>
                        <input
                          type="number"
                          name="total_distance"
                          value={formData.total_distance}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* Total Points Assigned */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("total_points_assigned")}</label>
                        <input
                          type="number"
                          name="total_points_assigned"
                          value={formData.total_points_assigned}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* Total Points Visited */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("total_points_visited")}</label>
                        <input
                          type="number"
                          name="total_points_visited"
                          value={formData.total_points_visited}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* Total Points Missed */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("total_points_missed")}</label>
                        <input
                          type="number"
                          name="total_points_missed"
                          value={formData.total_points_missed}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* Total Garbage Collected */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("total_garbage_collected")}</label>
                        <input
                          type="number"
                          name="total_garbage_collected"
                          value={formData.total_garbage_collected}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* Avg Speed */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("avg_speed")}</label>
                        <input
                          type="number"
                          name="avg_speed"
                          value={formData.avg_speed}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* Max Speed */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("max_speed")}</label>
                        <input
                          type="number"
                          name="max_speed"
                          value={formData.max_speed}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* Completion Percentage */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("completion_percentage")}</label>
                        <input
                          type="number"
                          name="completion_percentage"
                          value={formData.completion_percentage}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* Trip Status */}
                    <div className="col-lg-4">
                      <div className="input-blocks">
                        <label>{t("trip_status")}</label>
                        <select
                          name="trip_status"
                          value={formData.trip_status}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="COMPLETED">Completed</option>
                          <option value="IN_PROGRESS">In-Progress</option>
                          <option value="CANCELLED">Cancelled</option>
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

export default EditDailyTripSummaries;
