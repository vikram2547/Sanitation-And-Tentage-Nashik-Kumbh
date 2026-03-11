import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import {
  addSanitationAsset,
  clearMessages,
} from "../../redux/sanitationAssetSlice";
import { useTranslation } from "react-i18next";


const AddSanitationAsset = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { loading, success, error } = useSelector(
    (state) => state.sanitationAssets
  );
  const { sectors } = useSelector((state) => state.sectors);
  const { circles } = useSelector((state) => state.circles);

  const [formData, setFormData] = useState({
    asset_type_id: 1, // fixed for sanitation
    qr_code: "",
    asset_name: "",
    short_url: "",
    description: "",
    gender: "MALE",
    vendor_id: 1,
    vendor_asset_code: "",
    status: "ACTIVE",
    sector_id: "",
    circle_id: "",
    latitude: "",
    longitude: "",
    photo: null,
  });

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSanitationAsset(formData));
  };

  /* ================= SUCCESS FLOW ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("add-sanitation-asset");
    if (modalEl) {
      const modal =
        Modal.getInstance(modalEl) || new Modal(modalEl);
      modal.hide();
    }

    setFormData({
      asset_type_id: 1,
      qr_code: "",
      asset_name: "",
      short_url: "",
      description: "",
      gender: "MALE",
      vendor_id: 1,
      vendor_asset_code: "",
      status: "ACTIVE",
      sector_id: "",
      circle_id: "",
      latitude: "",
      longitude: "",
      photo: null,
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
    <div className="modal fade" id="add-sanitation-asset" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              {/* ================= HEADER ================= */}
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>{t("add_sanitation_asset")}</h4>
                </div>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                >
                  <span>×</span>
                </button>
              </div>

              {/* ================= BODY ================= */}
              <div className="modal-body custom-modal-body">

                {error && (
                  <div className="alert alert-danger">{error}</div>
                )}
                {success && (
                  <div className="alert alert-success">
                    {t("created_successfully")}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("qr_code")}</label>
                        <input
                          type="text"
                          name="qr_code"
                          className="form-control"
                          value={formData.qr_code}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("asset_name")}</label>
                        <input
                          type="text"
                          name="asset_name"
                          className="form-control"
                          value={formData.asset_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("sector")}</label>
                        <select
                          className="form-control"
                          name="sector_id"
                          value={formData.sector_id}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Sector</option>
                          {sectors?.map((s) => (
                            <option key={s.sector_id} value={s.sector_id}>
                              {s.sector_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("circle")}</label>
                        <select
                          className="form-control"
                          name="circle_id"
                          value={formData.circle_id}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Circle</option>
                          {circles?.map((c) => (
                            <option key={c.circle_id} value={c.circle_id}>
                              {c.circle_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("latitude")}</label>
                        <input
                          type="text"
                          name="latitude"
                          className="form-control"
                          value={formData.latitude}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("longitude")}</label>
                        <input
                          type="text"
                          name="longitude"
                          className="form-control"
                          value={formData.longitude}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                  </div>

                  {/* ================= FOOTER ================= */}
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

export default AddSanitationAsset;
