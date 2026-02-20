import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { updateVehicle, clearMessages } from "../../redux/vehicleSlice";

const EditVehicle = ({ selectedVehicle }) => {
  const dispatch = useDispatch();

  const { success, error, loading } = useSelector((state) => state.vehicles);

  const [formData, setFormData] = useState({
    vehicle_name: "",
    vehicle_type: "",
    vehicle_number: "",
    rc_number: "",
    vendor_id: "",
    status: "Active",
  });

  /* ================= PREFILL DATA ================= */
  useEffect(() => {
    if (!selectedVehicle) return;

    setFormData({
      vehicle_name: selectedVehicle.vehicle_name || "",
      vehicle_type: selectedVehicle.vehicle_type || "",
      vehicle_number: selectedVehicle.vehicle_number || "",
      rc_number: selectedVehicle.rc_number || "",
      vendor_id: selectedVehicle.vendor_id || "",
      status: selectedVehicle.status || "Active",
    });
  }, [selectedVehicle]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedVehicle?.vehicle_id) return;

    dispatch(
      updateVehicle({
        vehicle_id: selectedVehicle.vehicle_id,
        data: formData,
      })
    );
  };

  /* ================= CLOSE MODAL ON SUCCESS ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("edit-vehicle");
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
  }, [success]);

  if (!selectedVehicle) return null;

  return (
    <div className="modal fade" id="edit-vehicle">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              {/* ===== HEADER ===== */}
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>Edit Vehicle</h4>
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
                    Vehicle updated successfully
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Vehicle Name</label>
                        <input
                          type="text"
                          name="vehicle_name"
                          value={formData.vehicle_name}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Vehicle Type</label>
                        <input
                          type="text"
                          name="vehicle_type"
                          value={formData.vehicle_type}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Vehicle Number</label>
                        <input
                          type="text"
                          name="vehicle_number"
                          value={formData.vehicle_number}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>RC Number</label>
                        <input
                          type="text"
                          name="rc_number"
                          value={formData.rc_number}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Vendor ID</label>
                        <input
                          type="text"
                          name="vendor_id"
                          value={formData.vendor_id}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Status</label>
                        <select
                          className="form-control"
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
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

export default EditVehicle;
