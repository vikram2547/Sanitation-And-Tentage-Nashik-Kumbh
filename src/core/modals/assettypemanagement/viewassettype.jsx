import React from "react";
import { useTranslation } from "react-i18next";


const ViewAssetType = ({ selectedAssetType }) => {
    const { t } = useTranslation();
  
  return (
    <div
      className="modal fade"
      id="view-assettype-modal"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">

          {/* ===== Modal Header ===== */}
          <div className="modal-header">
            <h5 className="modal-title">{t("asset_type_details")}</h5>
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
                <strong>{t("asset_type_id")}:</strong>
                <div>{selectedAssetType?.asset_type_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("asset_type")}:</strong>
                <div>{selectedAssetType?.type || "-"}</div>
              </div>

              <div className="col-md-12 mb-3">
                <strong>{t("asset_name")}:</strong>
                <div>{selectedAssetType?.name}</div>
              </div>

              <div className="col-md-12 mb-3">
                <strong>{t("description")}:</strong>
                <div>{selectedAssetType?.description || "-"}</div>
              </div>

              <div className="col-md-12 mb-3">
                <strong>{t("questions")}:</strong>
                <div>
                  {Array.isArray(selectedAssetType?.questions)
                    ? selectedAssetType.questions.join(", ")
                    : selectedAssetType?.questions || "-"}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("status")}:</strong>
                <div>
                  {selectedAssetType?.status === "1"
                    ? "Active"
                    : "Inactive"}
                </div>
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

export default ViewAssetType;