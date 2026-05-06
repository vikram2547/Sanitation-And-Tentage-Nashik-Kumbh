import React from "react";
import { useTranslation } from "react-i18next";
import { formatDateTime } from "../../../utils/dateFormat";

const ViewGpsTracking = ({ selectedGps }) => {
const { t } = useTranslation();
  return (
    <div className="modal fade" id="view-gps-modal">
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">{t("gps_tracking_details")}</h5>
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
                <strong>{t("vehicle_id")}:</strong>
                <div>{selectedGps?.vehicle_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("assignment_id")}:</strong>
                <div>{selectedGps?.assignment_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("latitude")}:</strong>
                <div>{selectedGps?.latitude}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("longitude")}:</strong>
                <div>{selectedGps?.longitude}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("speed")}:</strong>
                <div>{selectedGps?.speed}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("ignition_status")}:</strong>
                <div>{selectedGps?.ignition_status}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("fuel_level")}:</strong>
                <div>{selectedGps?.fuel_level}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("odometer_reading")}:</strong>
                <div>{selectedGps?.odometer_reading}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("timestamp")}:</strong>
                <div>{formatDateTime(selectedGps?.timestamp)}</div>
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

export default ViewGpsTracking;
