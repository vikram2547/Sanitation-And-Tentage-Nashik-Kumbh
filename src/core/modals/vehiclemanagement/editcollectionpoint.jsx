import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { clearMessages, updateVehicleCollectionPoint } from "../../redux/vehicleCollectionPointSlice";

const EditCollectionPoint = ({ selectedPoint }) => {
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

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (!selectedPoint) return;

    setFormData({
      point_code: selectedPoint.point_code || "",
      point_name: selectedPoint.point_name || "",
      latitude: selectedPoint.latitude || "",
      longitude: selectedPoint.longitude || "",
      address: selectedPoint.address || "",
      ward_number: selectedPoint.ward_number || "",
      zone: selectedPoint.zone || "",
      point_type: selectedPoint.point_type || "PRIMARY",
      expected_collection_time:
        selectedPoint.expected_collection_time || "",
      collection_frequency:
        selectedPoint.collection_frequency || "DAILY",
      status: selectedPoint.status || "ACTIVE",
    });
  }, [selectedPoint]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPoint?.id) return;

    dispatch(
      updateVehicleCollectionPoint({
        id: selectedPoint.id,
        data: formData,
      })
    );
  };

  /* ================= CLOSE ON SUCCESS ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("edit-collection-point-modal");
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

  if (!selectedPoint) return null;

  return (
    <div className="modal fade" id="edit-collection-point-modal">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              {/* ===== HEADER ===== */}
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>Edit Collection Point</h4>
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
                    Collection Point updated successfully
                  </div>
                )}

                <form onSubmit={handleSubmit}>
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

export default EditCollectionPoint;
