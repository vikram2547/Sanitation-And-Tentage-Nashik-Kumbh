import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import {
  clearMessages,
  updateVehicleMaintenanceLog,
} from "../../redux/vehicleMaintenanceLogSlice";

const EditMaintenanceLogs = ({ selectedLog }) => {
  const dispatch = useDispatch();

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

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (!selectedLog) return;

    setFormData({
      vehicle_id: selectedLog.vehicle_id ?? "",
      vendor_id: selectedLog.vendor_id ?? "",
      maintenance_type: selectedLog.maintenance_type ?? "",
      cost: selectedLog.cost ?? "",
      maintenance_date: selectedLog.maintenance_date ?? "",
      next_maintenance_date: selectedLog.next_maintenance_date ?? "",
      description: selectedLog.description ?? "",
    });
  }, [selectedLog]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedLog?.id) return;

    const payload = {
      vehicle_id: Number(formData.vehicle_id),
      vendor_id: Number(formData.vendor_id),
      maintenance_type: formData.maintenance_type,
      cost: Number(formData.cost),
      maintenance_date: formData.maintenance_date,
      next_maintenance_date: formData.next_maintenance_date,
      description: formData.description,
    };

    dispatch(
      updateVehicleMaintenanceLog({
        maintenance_id: selectedLog.maintenance_id,
        data: payload,
      })
    );
  };

  /* ================= CLOSE ON SUCCESS ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("edit-maintenance-log");
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

    dispatch(clearMessages());
  }, [success, dispatch]);

  if (!selectedLog) return null;

  return (
    <div className="modal fade" id="edit-maintenance-log">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              {/* ===== HEADER ===== */}
              <div className="modal-header border-0 custom-modal-header">
                <h5 className="modal-title">Edit Maintenance Log</h5>
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
                    Maintenance log updated successfully
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    {/* VEHICLE ID */}
                    <div className="col-lg-6">
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

                    {/* VENDOR ID */}
                    <div className="col-lg-6">
                      <label>Vendor ID</label>
                      <input
                        type="number"
                        name="vendor_id"
                        value={formData.vendor_id}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>

                    {/* MAINTENANCE TYPE */}
                    <div className="col-lg-6 mt-2">
                      <label>Maintenance Type</label>
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

                    {/* COST */}
                    <div className="col-lg-6 mt-2">
                      <label>Cost</label>
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

                    {/* MAINTENANCE DATE */}
                    <div className="col-lg-6 mt-2">
                      <label>Maintenance Date</label>
                      <input
                        type="date"
                        name="maintenance_date"
                        value={formData.maintenance_date}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>

                    {/* NEXT MAINTENANCE DATE */}
                    <div className="col-lg-6 mt-2">
                      <label>Next Maintenance Date</label>
                      <input
                        type="date"
                        name="next_maintenance_date"
                        value={formData.next_maintenance_date}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>

                    {/* DESCRIPTION */}
                    <div className="col-lg-12 mt-2">
                      <label>Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-control"
                      />
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

export default EditMaintenanceLogs;