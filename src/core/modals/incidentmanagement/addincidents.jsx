import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { addIncidents, clearMessages } from "../../redux/incidentsSlice";
import { useTranslation } from "react-i18next";


const AddIncident = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { success, error, loading } = useSelector(
    (state) => state.incidents
  );

  /* ================= FORM STATE ================= */
  const [formData, setFormData] = useState({
    inspection_id: null,
    asset_id: null,
    question_id: null,
    vendor_id: null,
    response_id: null,
    severity: "",
    description: "",
  });

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? null : value,
    }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addIncidents({
        inspection_id: formData.inspection_id
          ? Number(formData.inspection_id)
          : null,
        asset_id: formData.asset_id
          ? Number(formData.asset_id)
          : null,
        question_id: formData.question_id
          ? Number(formData.question_id)
          : null,
        vendor_id: formData.vendor_id
          ? Number(formData.vendor_id)
          : null,
        response_id: formData.response_id
          ? Number(formData.response_id)
          : null,
        severity: formData.severity,
        description: formData.description,
      })
    );
  };

  /* ================= SUCCESS FLOW ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("add-incident");
    if (modalEl) {
      const modalInstance =
        Modal.getInstance(modalEl) || new Modal(modalEl);
      modalInstance.hide();
    }

    setFormData({
      inspection_id: null,
      asset_id: null,
      question_id: null,
      vendor_id: null,
      response_id: null,
      severity: "",
      description: "",
    });
  }, [success]);

  /* ================= AUTO CLEAR MESSAGE ================= */
  useEffect(() => {
    if (!success && !error) return;

    const timer = setTimeout(() => {
      dispatch(clearMessages());
    }, 3000);

    return () => clearTimeout(timer);
  }, [success, error, dispatch]);

  return (
    <div className="modal fade" id="add-incident" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>{t("add_new_incident")}</h4>
                </div>
                <button type="button" className="close" data-bs-dismiss="modal">
                  <span>×</span>
                </button>
              </div>

              <div className="modal-body custom-modal-body">

                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                  <div className="alert alert-success">
                    {t("created_successfully")}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    {/* ===== Inspection ID ===== */}
                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("inspection_id")}</label>
                        <input
                          type="number"
                          name="inspection_id"
                          value={formData.inspection_id ?? ""}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* ===== Asset ID ===== */}
                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("asset_id")}</label>
                        <input
                          type="number"
                          name="asset_id"
                          value={formData.asset_id ?? ""}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* ===== Question ID ===== */}
                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("question_id")}</label>
                        <input
                          type="number"
                          name="question_id"
                          value={formData.question_id ?? ""}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* ===== Vendor ID ===== */}
                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("vendor_id")}</label>
                        <input
                          type="number"
                          name="vendor_id"
                          value={formData.vendor_id ?? ""}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* ===== Response ID ===== */}
                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("response_id")}</label>
                        <input
                          type="number"
                          name="response_id"
                          value={formData.response_id ?? ""}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* ===== Severity ===== */}
                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("severity")}</label>
                        <select
                          name="severity"
                          value={formData.severity}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="">Select Severity</option>
                          <option value="LOW">Low</option>
                          <option value="MEDIUM">Medium</option>
                          <option value="HIGH">High</option>
                        </select>
                      </div>
                    </div>

                    {/* ===== Description ===== */}
                    <div className="col-lg-12">
                      <div className="input-blocks">
                        <label>{t("description")}</label>
                        <input
                          type="text"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Issue reported during inspection"
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
                      {t("cancel")}
                    </button>

                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={loading}
                    >
                      {loading ? t("adding") : t("submit")}
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

export default AddIncident;