import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { clearMessages, updateVehicleRoutePoint } from "../../redux/vehicleRoutePointsSlice";
import { useTranslation } from "react-i18next";


const EditRoutePoints = ({ selectedRoutePoint }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { success, error, loading } = useSelector(
    (state) => state.vehicleRoutePoints
  );

  const [formData, setFormData] = useState({
    route_id: "",
    point_id: "",
    sequence_number: "",
    estimated_arrival_time: "",
    expected_stay_duration: "",
  });

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (!selectedRoutePoint) return;

    setFormData({
      route_id: selectedRoutePoint.route_id || "",
      point_id: selectedRoutePoint.point_id || "",
      sequence_number: selectedRoutePoint.sequence_number || "",
      estimated_arrival_time:
        selectedRoutePoint.estimated_arrival_time || "",
      expected_stay_duration:
        selectedRoutePoint.expected_stay_duration || "",
    });
  }, [selectedRoutePoint]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    const routePointId =
      selectedRoutePoint?.route_point_id ||
      selectedRoutePoint?.id;

    if (!routePointId) return;

    dispatch(
      updateVehicleRoutePoint({
        route_point_id: routePointId,
        data: {
          route_id: Number(formData.route_id),
          point_id: Number(formData.point_id),
          sequence_number: Number(formData.sequence_number),
          estimated_arrival_time: formData.estimated_arrival_time,
          expected_stay_duration: formData.expected_stay_duration,
        },
      })
    );
  };

  /* ================= CLOSE ON SUCCESS ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("edit-route-point-modal");
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
    };

    modalEl.addEventListener("hidden.bs.modal", handleHidden);
    modal.hide();
  }, [success, dispatch]);

  return (
    <div className="modal fade" id="edit-route-point-modal">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              {/* HEADER */}
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>{t("edit_route_point")}</h4>
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

                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                  <div className="alert alert-success">
                    {t("updated_successfully")}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">

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
                        <label>{t("point_id")}</label>
                        <input
                          type="number"
                          name="point_id"
                          value={formData.point_id}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("sequence_number")}</label>
                        <input
                          type="number"
                          name="sequence_number"
                          value={formData.sequence_number}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("estimated_arrival_time")}</label>
                        <input
                          type="time"
                          name="estimated_arrival_time"
                          value={formData.estimated_arrival_time}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("expected_stay_duration")}</label>
                        <input
                          type="time"
                          name="expected_stay_duration"
                          value={formData.expected_stay_duration}
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

export default EditRoutePoints;