import React from "react";
import { useTranslation } from "react-i18next";


const ViewSector = ({ selectedSector }) => {
  const { t } = useTranslation();
  return (
    <div className="modal fade" id="view-sector-modal">
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">{t("sector_details")}</h5>
            <button type="button" className="close" data-bs-dismiss="modal">
              <span>×</span>
            </button>
          </div>

          <div className="modal-body">
            <div className="row">

              <div className="col-md-6 mb-3">
                <strong>{t("sector_id")}:</strong>
                <div>{selectedSector?.sector_id || selectedSector?.id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("sector_name")}:</strong>
                <div>{selectedSector?.sector_name}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("sector_code")}:</strong>
                <div>{selectedSector?.sector_code}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("created_at")}:</strong>
                <div>{selectedSector?.created_at}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("updated_at")}:</strong>
                <div>{selectedSector?.updated_at}</div>
              </div>

            </div>
          </div>

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

export default ViewSector;