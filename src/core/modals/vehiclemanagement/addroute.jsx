import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { addVehicleRoute, clearMessages } from "../../redux/vehicleRouteSlice";
import { useTranslation } from "react-i18next";


const AddRoute = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { success, error, loading } = useSelector(
    (state) => state.vehicleRoutes
  );

  const [formData, setFormData] = useState({
    route_code: "",
    route_name: "",
    zone: "",
    status: "ACTIVE",
  });

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addVehicleRoute(formData));
  };

  /* ================= SUCCESS FLOW ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("add-route-modal");
    if (modalEl) {
      const modalInstance =
        Modal.getInstance(modalEl) || new Modal(modalEl);
      modalInstance.hide();
    }

    setFormData({
      route_code: "",
      route_name: "",
      zone: "",
      status: "ACTIVE",
    });
  }, [success]);

  /* ================= AUTO CLEAR MESSAGE ================= */
  useEffect(() => {
    if (!success && !error) return;

    const timer = setTimeout(() => {
      dispatch(clearMessages());
    }, 3000);

    return () => clearTimeout(timer);
  }, [success, error, dispatch]);

  return (
    <div className="modal fade" id="add-route-modal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              {/* ===== HEADER ===== */}
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>{t("add_new_vehicle_route")}</h4>
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
                    {success}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("route_code")}</label>
                        <input
                          type="text"
                          name="route_code"
                          value={formData.route_code}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("route_name")}</label>
                        <input
                          type="text"
                          name="route_name"
                          value={formData.route_name}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("zone")}</label>
                        <select
                          name="zone"
                          value={formData.zone}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="">Select Zone</option>
                          <option value="North">North</option>
                          <option value="South">South</option>
                          <option value="East">East</option>
                          <option value="West">West</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("status")}</label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="INACTIVE">INACTIVE</option>
                        </select>
                      </div>
                    </div>

                  </div>

                  {/* ===== FOOTER ===== */}
                  <div className="modal-footer-btn">
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

export default AddRoute;
