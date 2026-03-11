import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { clearMessages, updateVehicleRoute } from "../../redux/vehicleRouteSlice";
import { useTranslation } from "react-i18next";


const EditRoute = ({ selectedRoute }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { success, error, loading } = useSelector(
    (state) => state.vehicleRoutes
  );

  const [formData, setFormData] = useState({
    route_code: "",
    route_name: "",
    status: "ACTIVE",
  });

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (!selectedRoute) return;

    setFormData({
      route_code: selectedRoute.route_code || "",
      route_name: selectedRoute.route_name || "",
      status: selectedRoute.status || "ACTIVE",
    });
  }, [selectedRoute]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedRoute?.route_id) return;

    dispatch(
      updateVehicleRoute({
        route_id: selectedRoute.route_id, // ✅ FIXED KEY
        data: formData,
      })
    );
  };

  /* ================= CLOSE ON SUCCESS ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("edit-route-modal");
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

  // if (!selectedRoute) return null;
  return (
    <div className="modal fade" id="edit-route-modal">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              {/* HEADER */}
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>{t("edit_route")}</h4>
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
                    {t("updated_succesfully")}
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
                        <label>{t("status")}</label>
                        <select
                          className="form-control"
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                        >
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="INACTIVE">INACTIVE</option>
                        </select>
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

export default EditRoute;
