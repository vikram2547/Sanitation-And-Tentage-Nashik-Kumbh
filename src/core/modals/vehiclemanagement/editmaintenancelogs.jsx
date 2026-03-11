import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import {
  clearMessages,
  updateVehicleMaintenanceLog,
} from "../../redux/vehicleMaintenanceLogSlice";
import { useTranslation } from "react-i18next";


const EditMaintenanceLogs = ({ selectedLog }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { success, error, loading } = useSelector(
    (state) => state.vehicleMaintenanceLogs
  );

  const [formData, setFormData] = useState({
    vehicle_id: "",
    vendor_id: "",
    maintenance_type: "",
    cost: "",
    maintenance_date: "",
    next_maintenance_date: "",
    description: "",
  });

  /* ================= PREFILL FORM ================= */
  useEffect(() => {
    if (selectedLog) {
      setFormData({
        vehicle_id: selectedLog.vehicle_id ?? "",
        vendor_id: selectedLog.vendor_id ?? "",
        maintenance_type: selectedLog.maintenance_type ?? "",
        cost: selectedLog.cost ?? "",
        maintenance_date: selectedLog.maintenance_date ?? "",
        next_maintenance_date: selectedLog.next_maintenance_date ?? "",
        description: selectedLog.description ?? "",
      });
    }
  }, [selectedLog]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
        e.preventDefault();
  
        const maintenanceId = selectedLog?.maintenance_id || selectedLog?.id;
  
        if (!maintenanceId) {
          console.log("No Maintenance ID found");
          return;
        }
  
        const resultAction = await dispatch(
          updateVehicleMaintenanceLog({
            id: maintenanceId,
            data: formData,
          })
        );
      };

  /* ================= CLOSE ON SUCCESS ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("edit-maintenance-log");
    if (!modalEl) return;

    const modalInstance = Modal.getInstance(modalEl);
    if (!modalInstance) return;

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
    modalInstance.hide();
  }, [success, dispatch]);

  /* ================= RENDER MODAL ================= */
  return (
    <div className="modal fade" id="edit-maintenance-log" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              {/* ===== HEADER ===== */}
              <div className="modal-header border-0 custom-modal-header">
                <h5 className="modal-title">{t("edit_maintenance_log")}</h5>
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
                    {t("updated_successfully")}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    <div className="col-lg-6">
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

                    <div className="col-lg-6">
                      <label>{t("vendor_id")}</label>
                      <input
                        type="number"
                        name="vendor_id"
                        value={formData.vendor_id}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>

                    <div className="col-lg-6 mt-2">
                      <label>{t("maintenance_type")}</label>
                      <select
                        name="maintenance_type"
                        value={formData.maintenance_type}
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="">Select</option>
                        <option value="OIL_CHANGE">Oil Change</option>
                        <option value="SERVICE">Service</option>
                        <option value="REPAIR">Repair</option>
                        <option value="INSPECTION">Inspection</option>
                      </select>
                    </div>

                    <div className="col-lg-6 mt-2">
                      <label>{t("cost")}</label>
                      <input
                        type="number"
                        step="0.01"
                        name="cost"
                        value={formData.cost}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="col-lg-6 mt-2">
                      <label>{t("maintenance_date")}</label>
                      <input
                        type="date"
                        name="maintenance_date"
                        value={formData.maintenance_date}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="col-lg-6 mt-2">
                      <label>{t("next_maintenance_date")}</label>
                      <input
                        type="date"
                        name="next_maintenance_date"
                        value={formData.next_maintenance_date}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>

                    <div className="col-lg-12 mt-2">
                      <label>{t("description")}</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-control"
                      />
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

export default EditMaintenanceLogs;