import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { updateCircle, clearMessages } from "../../redux/circleSlice";

const EditCircle = ({ selectedCircle }) => {
  const dispatch = useDispatch();

  const { success, error, loading } = useSelector(
    (state) => state.circles
  );

  const { sectors } = useSelector(
    (state) => state.sectors
  );

  const [formData, setFormData] = useState({
    circle_name: "",
    circle_code: "",
    sector_id: "",
    boundary_coordinates: null,
  });

  /* ================= PREFILL DATA ================= */
  useEffect(() => {
    if (selectedCircle) {
      setFormData({
        circle_name: selectedCircle.circle_name || "",
        circle_code: selectedCircle.circle_code || "",
        sector_id: selectedCircle.sector_id || "",
        boundary_coordinates: null,
      });
    }
  }, [selectedCircle]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const circleId =
      selectedCircle?.circle_id || selectedCircle?.id;

    if (!circleId) {
      console.log("No Circle ID found");
      return;
    }

    const resultAction = await dispatch(
      updateCircle({
        id: circleId,
        data: formData,
      })
    );
  };

  /* ================= CLOSE MODAL ON SUCCESS ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("edit-circle");
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

  return (
    <div className="modal fade" id="edit-circle">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>Edit Circle</h4>
                </div>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>

              <div className="modal-body custom-modal-body">

                {error && (
                  <div className="alert alert-danger">{error}</div>
                )}

                {success && (
                  <div className="alert alert-success">{success}</div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    {/* ===== Sector Dropdown ===== */}
                    <div className="col-lg-12">
                      <div className="input-blocks">
                        <label>Sector</label>
                        <select
                          name="sector_id"
                          value={formData.sector_id}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="">Select Sector</option>

                          {Array.isArray(sectors) &&
                            sectors.map((sector) => (
                              <option
                                key={sector.sector_id}
                                value={sector.sector_id}
                              >
                                {sector.sector_name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    {/* ===== Circle Name ===== */}
                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Circle Name</label>
                        <input
                          type="text"
                          name="circle_name"
                          value={formData.circle_name}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    {/* ===== Circle Code ===== */}
                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Circle Code</label>
                        <input
                          type="text"
                          name="circle_code"
                          value={formData.circle_code}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                  </div>

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

export default EditCircle;
