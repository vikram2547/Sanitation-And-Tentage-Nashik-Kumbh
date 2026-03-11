import React from "react";
import { useTranslation } from "react-i18next";

const ViewMaintenanceLogs = ({ selectedLog }) => {
const { t } = useTranslation();
  return (
    <div className="modal fade" id="view-maintenance-modal">
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">{t("maintenance_log_details")}</h5>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
            >
              <span>×</span>
            </button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            <div className="row">

              <div className="col-md-6 mb-3">
                <strong>{t("maintenance_id")}:</strong>
                <div>{selectedLog?.maintenance_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("vehicle_id")}:</strong>
                <div>{selectedLog?.vehicle_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("maintenance_date")}:</strong>
                <div>{selectedLog?.maintenance_date}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("maintenance_type")}:</strong>
                <div>{selectedLog?.maintenance_type}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("description")}:</strong>
                <div>{selectedLog?.description || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("cost")}:</strong>
                <div>{selectedLog?.cost}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("next_maintenance_date")}:</strong>
                <div>{selectedLog?.next_maintenance_date}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("vendor_id")}:</strong>
                <div>{selectedLog?.vendor_id}</div>
              </div>

            </div>
          </div>

          {/* FOOTER */}
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

export default ViewMaintenanceLogs;
