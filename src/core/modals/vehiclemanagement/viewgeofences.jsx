import React from "react";
import { useTranslation } from "react-i18next";

const ViewGeofences = ({ selectedGeofence }) => {
const { t } = useTranslation();

  return (
    <div className="modal fade" id="view-geofence-modal">
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">{t("geofence_details")}</h5>
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
                <strong>{t("geofence_id")}:</strong>
                <div>{selectedGeofence?.geofence_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("point_id")}:</strong>
                <div>{selectedGeofence?.point_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("radius_meters")}:</strong>
                <div>{selectedGeofence?.radius_meters}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("status")}:</strong>
                <div>
                  {selectedGeofence?.is_active === "1"
                    ? "Active"
                    : "Inactive"}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("created_at")}:</strong>
                <div>{selectedGeofence?.created_at}</div>
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

export default ViewGeofences;
