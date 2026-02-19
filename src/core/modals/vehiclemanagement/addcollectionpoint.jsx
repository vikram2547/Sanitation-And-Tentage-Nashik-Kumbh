import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import {
  addVehicleCollectionPoint,
  clearMessages,
} from "../../redux/vehicleCollectionPointSlice";

const AddCollectionPoint = () => {
  const dispatch = useDispatch();

  const { success, error, loading } = useSelector(
    (state) => state.vehicleCollectionPoints
  );

  const [formData, setFormData] = useState({
    point_code: "",
    point_name: "",
    latitude: "",
    longitude: "",
    address: "",
    ward_number: "",
    zone: "",
    point_type: "PRIMARY",
    expected_collection_time: "",
    collection_frequency: "DAILY",
    status: "ACTIVE",
  });

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.point_code ||
      !formData.point_name ||
      !formData.latitude ||
      !formData.longitude ||
      !formData.expected_collection_time
    ) {
      alert("Please fill all required fields");
      return;
    }

    const payload = {
      point_code: formData.point_code.trim(),
      point_name: formData.point_name.trim(),
      latitude: String(formData.latitude),
      longitude: String(formData.longitude),
      address: formData.address || "",
      ward_number: formData.ward_number || "",
      zone: formData.zone || "",
      point_type: formData.point_type === "PRIMARY" ? "P" : "S",
      expected_collection_time: `${formData.expected_collection_time}:00`, // ✅ HH:mm:ss
      collection_frequency: formData.collection_frequency,
      status: formData.status,
    };

    console.log("ADD COLLECTION POINT PAYLOAD:", payload);

    dispatch(addVehicleCollectionPoint(payload));
  };

  /* ================= SUCCESS FLOW ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("add-collection-point-modal");
    if (modalEl) {
      const modalInstance =
        Modal.getInstance(modalEl) || new Modal(modalEl);
      modalInstance.hide();
    }

    setTimeout(() => {
      document.body.classList.remove("modal-open");
      document.body.style.paddingRight = "";
      document
        .querySelectorAll(".modal-backdrop")
        .forEach((bd) => bd.remove());
    }, 300);

    setFormData({
      point_code: "",
      point_name: "",
      latitude: "",
      longitude: "",
      address: "",
      ward_number: "",
      zone: "",
      point_type: "PRIMARY",
      expected_collection_time: "",
      collection_frequency: "DAILY",
      status: "ACTIVE",
    });

    dispatch(clearMessages());
  }, [success, dispatch]);

  /* ================= AUTO CLEAR ERROR ================= */
  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => dispatch(clearMessages()), 5000);
    return () => clearTimeout(timer);
  }, [error, dispatch]);

  return (
    <div
      className="modal fade"
      id="add-collection-point-modal"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              {/* ===== HEADER ===== */}
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>Add Collection Point</h4>
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
                    Collection Point created successfully
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Point Code</label>
                        <input
                          type="text"
                          name="point_code"
                          value={formData.point_code}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Point Name</label>
                        <input
                          type="text"
                          name="point_name"
                          value={formData.point_name}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Latitude</label>
                        <input
                          type="text"
                          name="latitude"
                          value={formData.latitude}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Longitude</label>
                        <input
                          type="text"
                          name="longitude"
                          value={formData.longitude}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Expected Collection Time</label>
                        <input
                          type="time"
                          name="expected_collection_time"
                          value={formData.expected_collection_time}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Collection Frequency</label>
                        <select
                          name="collection_frequency"
                          value={formData.collection_frequency}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="DAILY">Daily</option>
                          <option value="WEEKLY">Weekly</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Point Type</label>
                        <select
                          name="point_type"
                          value={formData.point_type}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="PRIMARY">Primary</option>
                          <option value="SECONDARY">Secondary</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Status</label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="ACTIVE">Active</option>
                          <option value="INACTIVE">Inactive</option>
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

export default AddCollectionPoint;
