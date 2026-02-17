import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import {
  updateSanitationAsset,
  clearMessages,
} from "../../redux/sanitationAssetSlice";

const EditSanitationAsset = ({ selectedAsset }) => {
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    (state) => state.sanitationAssets
  );
  const { sectors } = useSelector((state) => state.sectors);
  const { circles } = useSelector((state) => state.circles);

  const [formData, setFormData] = useState({
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

  /* ================= PREFILL DATA ================= */
  useEffect(() => {
    if (!selectedAsset) return;

    setFormData({
      asset_type_id: 1,
      qr_code: selectedAsset.qr_code || "",
      asset_name: selectedAsset.asset_name || "",
      short_url: selectedAsset.short_url || "",
      description: selectedAsset.description || "",
      gender: selectedAsset.gender || "MALE",
      vendor_id: selectedAsset.vendor_id || 1,
      vendor_asset_code: selectedAsset.vendor_asset_code || "",
      status: selectedAsset.status || "ACTIVE",
      sector_id: selectedAsset.sector_id || "",
      circle_id: selectedAsset.circle_id || "",
      latitude: selectedAsset.latitude || "",
      longitude: selectedAsset.longitude || "",
      photo: null,
    });
  }, [selectedAsset]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    const assetId = selectedAsset?.sanitation_asset_id;
    if (!assetId) return;

    dispatch(
      updateSanitationAsset({
        id: assetId,
        data: formData,
      })
    );
  };

  /* ================= CLOSE MODAL ON SUCCESS ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("edit-sanitation-asset");
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

  if (!selectedAsset) return null;

  return (
    <div className="modal fade" id="edit-sanitation-asset" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              {/* ================= HEADER ================= */}
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>Edit Sanitation Asset</h4>
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
                    Sanitation Asset updated successfully
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>QR Code</label>
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
                        <label>Asset Name</label>
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
                        <label>Sector</label>
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
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Circle</label>
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
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Latitude</label>
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
                        <label>Longitude</label>
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

export default EditSanitationAsset;
