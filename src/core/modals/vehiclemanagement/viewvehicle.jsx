import React from "react";
import { useTranslation } from "react-i18next";

const ViewVehicle = ({ selectedVehicle }) => {
  const { t } = useTranslation();

  return (
    <div
      className="modal fade"
      id="view-vehicle-modal"
    >
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">

          {/* ===== Modal Header ===== */}
          <div className="modal-header">
            <h5 className="modal-title">{t("vehicle_details")}</h5>
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
                <strong>{t("vehicle_id")}:</strong>
                <div>{selectedVehicle?.vehicle_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("vehicle_name")}:</strong>
                <div>{selectedVehicle?.vehicle_name || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("vehicle_type")}:</strong>
                <div>{selectedVehicle?.vehicle_type || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("vehicle_number")}:</strong>
                <div>{selectedVehicle?.vehicle_number || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("rc_number")}:</strong>
                <div>{selectedVehicle?.rc_number || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("vendor_id")}:</strong>
                <div>{selectedVehicle?.vendor_id || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("status")}:</strong>
                <div>
                  {selectedVehicle?.status === "Active" ||
                    selectedVehicle?.status === "1"
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
              {t("cancel")}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewVehicle;
