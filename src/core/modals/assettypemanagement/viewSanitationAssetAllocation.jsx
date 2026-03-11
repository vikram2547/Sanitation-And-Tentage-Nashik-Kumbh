import React from "react";
import { useTranslation } from "react-i18next";


const ViewSanitationAssetAllocation = ({ selectedAsset }) => {
  const { t } = useTranslation();

  return (
    <div
      className="modal fade"
      id="view-sanitation-asset-allocation"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">

          {/* ===== Modal Header ===== */}
          <div className="modal-header">
            <h5 className="modal-title">{t("sanitation_asset_allocation_details")}</h5>
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
                <strong>{t("asset_id")}:</strong>
                <div>{selectedAsset?.asset_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("swachhagrahi_id")}:</strong>
                <div>{selectedAsset?.swachhagrahi_id || "-"}</div>
              </div>

              <div className="col-md-12 mb-3">
                <strong>{t("shift_id")}:</strong>
                <div>{selectedAsset?.shift_id || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("allocation_date")}:</strong>
                <div>{selectedAsset?.allocation_date || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("status")}:</strong>
                <div>
                  {selectedAsset?.status === "ACTIVE" ? "Active" : "Inactive"}
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
              {t("cancel")}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewSanitationAssetAllocation;
