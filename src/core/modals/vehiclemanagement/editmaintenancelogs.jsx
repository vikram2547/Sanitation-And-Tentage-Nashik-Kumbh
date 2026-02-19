import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { clearMessages, updateVehicleMaintenanceLog } from "../../redux/vehicleMaintenanceLogSlice";

const EditMaintenanceLogs = ({ selectedLog }) => {
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

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (!selectedLog) return;
    setFormData({ ...selectedLog });
  }, [selectedLog]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedLog?.id) return;

    dispatch(
      updateVehicleMaintenanceLog({
        id: selectedLog.id,
        data: formData,
      })
    );
  };

  /* ================= CLOSE ON SUCCESS ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("edit-maintenance-log");
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
    }, 300);
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
                <div className="page-title">
                  <h4>Edit Maintenance Log</h4>
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
                    Maintenance log updated successfully
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {Object.keys(formData).map((key) => (
                      <div className="col-lg-6" key={key}>
                        <div className="input-blocks">
                          <label>{key.replace(/_/g, " ").toUpperCase()}</label>
                          <input
                            type="text"
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    ))}
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
