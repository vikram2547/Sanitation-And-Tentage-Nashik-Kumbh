import React from "react";
import { useTranslation } from "react-i18next";
import { formatDateTime } from "../../../utils/dateFormat";


const ViewShift = ({ selectedShift }) => {
  const { t } = useTranslation();

  const activeStatus = (value) =>
    value === 1 || value === "1" ? "Active" : "Inactive";

  return (
    <div className="modal fade" id="view-shift-modal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">

          {/* ================= HEADER ================= */}
          <div className="modal-header">
            <h5 className="modal-title">{t("shift_details")}</h5>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
            >
              <span>×</span>
            </button>
          </div>

          {/* ================= BODY ================= */}
          <div className="modal-body">
            <div className="row">

              {/* Shift ID */}
              <div className="col-md-6 mb-3">
                <strong>{t("shift_id")}:</strong>
                <div>{selectedShift?.shift_id || selectedShift?.id || "-"}</div>
              </div>

              {/* Shift Name */}
              <div className="col-md-6 mb-3">
                <strong>{t("shift_name")}:</strong>
                <div>{selectedShift?.shift_name || "-"}</div>
              </div>

              {/* Start Time */}
              <div className="col-md-6 mb-3">
                <strong>{t("start_time")}:</strong>
                <div>{selectedShift?.start_time || "-"}</div>
              </div>

              {/* End Time */}
              <div className="col-md-6 mb-3">
                <strong>{t("end_time")}:</strong>
                <div>{selectedShift?.end_time || "-"}</div>
              </div>

              {/* Break Duration (Optional) */}
              {selectedShift?.break_duration !== undefined && (
                <div className="col-md-6 mb-3">
                  <strong>{t("break_duration")}:</strong>
                  <div>{selectedShift?.break_duration}</div>
                </div>
              )}

              {/* Grace Time (Optional) */}
              {selectedShift?.grace_time !== undefined && (
                <div className="col-md-6 mb-3">
                  <strong>{t("grace_time")}:</strong>
                  <div>{selectedShift?.grace_time}</div>
                </div>
              )}

              {/* Status */}
              <div className="col-md-6 mb-3">
                <strong>{t("status")}:</strong>
                <div>{activeStatus(selectedShift?.is_active)}</div>
              </div>

              {/* Created At (Optional) */}
              {selectedShift?.created_at && (
                <div className="col-md-6 mb-3">
                  <strong>{t("created_at")}:</strong>
                  <div>{formatDateTime(selectedShift?.created_at)}</div>
                </div>
              )}

            </div>
          </div>

          {/* ================= FOOTER ================= */}
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

export default ViewShift;
