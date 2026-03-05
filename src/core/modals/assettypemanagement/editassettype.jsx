import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { updateAssetType, clearMessages } from "../../redux/assettypeSlice";

const EditAssetType = ({ selectedAssetType }) => {
  const dispatch = useDispatch();

  const { success, error, loading } = useSelector(
    (state) => state.assetTypes
  );

  const [formData, setFormData] = useState({
    type: "",
    name: "",
    description: "",
    questions: [],
    status: 1,
  });

  /* ================= PREFILL DATA ================= */
  useEffect(() => {
    if (selectedAssetType) {
      setFormData({
        type: selectedAssetType.type || "",
        name: selectedAssetType.name || "",
        description: selectedAssetType.description || "",
        questions: Array.isArray(selectedAssetType.questions)
          ? selectedAssetType.questions
          : selectedAssetType.questions
          ? selectedAssetType.questions.split(",")
          : [],
        status: selectedAssetType.status ?? 1,
      });
    }
  }, [selectedAssetType]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    const assetTypeId =
      selectedAssetType?.asset_type_id || selectedAssetType?.id;

    if (!assetTypeId) {
      console.error("No Asset Type ID found");
      return;
    }

    dispatch(
      updateAssetType({
        id: assetTypeId,
        data: {
          ...formData,
          questions: formData.questions.join(","),
          status: 1,
        },
      })
    );
  };

  /* ================= CLOSE MODAL ON SUCCESS ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("edit-assettype");
    if (!modalEl) return;

    const modal = Modal.getInstance(modalEl) || new Modal(modalEl);

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
  }, [success, dispatch]);

  return (
    <div className="modal fade" id="edit-assettype">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              {/* ===== Header ===== */}
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>Edit Asset Type</h4>
                </div>

                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                >
                  <span>×</span>
                </button>
              </div>

              {/* ===== Body ===== */}
              <div className="modal-body custom-modal-body">

                {error && (
                  <div className="alert alert-danger">{error}</div>
                )}

                {success && (
                  <div className="alert alert-success">
                    Asset Type updated successfully
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Type</label>
                        <input
                          type="text"
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="input-blocks">
                        <label>Description</label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                  </div>

                  {/* ===== Footer ===== */}
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

export default EditAssetType;