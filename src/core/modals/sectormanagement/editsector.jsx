  import { useState, useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { Modal } from "bootstrap";
  import { clearMessages, updateSector } from "../../redux/sectorSlice";
  import { useTranslation } from "react-i18next";



  const EditSector = ({ selectedSector }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { success, error, loading } = useSelector((state) => state.sectors);

    const [formData, setFormData] = useState({
      sector_name: "",
      sector_code: "",
      boundary_coordinates: null,
    });

    // ✅ CLOSE MODAL + REMOVE BACKDROP PROPERLY
    useEffect(() => {
      if (!success) return;

      const modalEl = document.getElementById("edit-sector");
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


    // ✅ Prefill when selectedSector changes
    useEffect(() => {
      if (selectedSector) {
        setFormData({
          sector_name: selectedSector.sector_name || "",
          sector_code: selectedSector.sector_code || "",
        });
      }
    }, [selectedSector]);

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const sectorId = selectedSector?.sector_id || selectedSector?.id;

      if (!sectorId) {
        console.log("No Sector ID found");
        return;
      }

      const resultAction = await dispatch(
        updateSector({
          id: sectorId,
          data: formData,
        })
      );
    };

    return (
      <div className="modal fade" id="edit-sector">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>{t("edit_sector")}</h4>
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
                  {error && <div className="alert alert-danger">{error}</div>}
                  {success && (
                    <div className="alert alert-success">{success}</div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="row">

                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>{t("sector_name")}</label>
                          <input
                            type="text"
                            name="sector_name"
                            value={formData.sector_name}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>{t("sector_code")}</label>
                          <input
                            type="text"
                            name="sector_code"
                            value={formData.sector_code}
                            onChange={handleChange}
                            className="form-control"
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

  export default EditSector;
