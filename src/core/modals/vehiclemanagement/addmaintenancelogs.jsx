import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import {
  addVehicleMaintenanceLog,
  clearMessages,
} from "../../redux/vehicleMaintenanceLogSlice";

const AddMaintenanceLogs = () => {
  const dispatch = useDispatch();

  const { success, error, loading } = useSelector(
    (state) => state.vehicleMaintenanceLogs
  );

  const [formData, setFormData] = useState({
    vehicle_id: "",
    maintenance_date: "",
    maintenance_type: "",
    description: "",
    cost: "",
    next_maintenance_date: "",
    vendor_id: "",
  });

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      vehicle_id: Number(formData.vehicle_id),
      maintenance_date: formData.maintenance_date, // YYYY-MM-DD
      maintenance_type: formData.maintenance_type,
      description: formData.description,
      cost: Number(formData.cost),
      next_maintenance_date: formData.next_maintenance_date,
      vendor_id: Number(formData.vendor_id),
    };

    dispatch(addVehicleMaintenanceLog(payload));
  };

  /* ================= SUCCESS FLOW ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("add-maintenance-modal");
    if (modalEl) {
      const instance =
        Modal.getInstance(modalEl) || new Modal(modalEl);
      instance.hide();
    }

    setFormData({
      vehicle_id: "",
      maintenance_date: "",
      maintenance_type: "",
      description: "",
      cost: "",
      next_maintenance_date: "",
      vendor_id: "",
    });

    dispatch(clearMessages());
  }, [success, dispatch]);

  return (
    <div
      className="modal fade"
      id="add-maintenance-modal"
    >
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">
              {/* ===== HEADER ===== */}
              <div className="modal-header border-0 custom-modal-header">
                <h5 className="modal-title">Add Maintenance Log</h5>
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
                    Maintenance log added successfully
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
                      {loading ? "Adding..." : "Submit"}
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

export default AddMaintenanceLogs;
