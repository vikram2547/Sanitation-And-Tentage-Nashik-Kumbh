import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { clearMessages, updateVehicleRoutePoint } from "../../redux/vehicleRoutePointsSlice";


const EditRoutePoints = ({ selectedRoutePoint }) => {
  const dispatch = useDispatch();

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
    }, 200);
  }, [success, dispatch]);

  if (!selectedRoutePoint) return null;

  return (
    <div className="modal fade" id="edit-route-point-modal">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              {/* ===== HEADER ===== */}
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>Edit Route Point</h4>
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
                    Route point updated successfully
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">

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
                        <label>Point ID</label>
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
                        <label>Sequence Number</label>
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
                        <label>Estimated Arrival Time</label>
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
                        <label>Expected Stay Duration</label>
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

export default EditRoutePoints;
