import React from "react";
import { useTranslation } from "react-i18next";

const ViewSanitationAsset = ({ selectedAsset }) => {
  const { t } = useTranslation();

  return (
    <div
      className="modal fade"
      id="view-sanitation-asset"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">

          {/* ===== Modal Header ===== */}
          <div className="modal-header">
            <h5 className="modal-title">{t("sanitation_asset_details")}</h5>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
            >
              <span>×</span>
            </button>
          </div>

          {/* ===== Modal Body ===== */}
          <div className="modal-body">
            <div className="row">

              <div className="col-md-6 mb-3">
                <strong>{t("sanitation_asset_id")}:</strong>
                <div>{selectedAsset?.sanitation_asset_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("qr_code")}:</strong>
                <div>{selectedAsset?.qr_code || "-"}</div>
              </div>

              <div className="col-md-12 mb-3">
                <strong>{t("asset_name")}:</strong>
                <div>{selectedAsset?.asset_name || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("gender")}:</strong>
                <div>{selectedAsset?.gender || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("status")}:</strong>
                <div>
                  {selectedAsset?.status === "ACTIVE" ? "Active" : "Inactive"}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("sector")}:</strong>
                <div>{selectedAsset?.sector_name || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("circle")}:</strong>
                <div>{selectedAsset?.circle_name || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("latitude")}:</strong>
                <div>{selectedAsset?.latitude || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("longitude")}:</strong>
                <div>{selectedAsset?.longitude || "-"}</div>
              </div>

            </div>
          </div>

          {/* ===== Modal Footer ===== */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {t("close")}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewSanitationAsset;
