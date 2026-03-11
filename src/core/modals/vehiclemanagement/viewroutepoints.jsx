import React from "react";
import { useTranslation } from "react-i18next";

const ViewRoutePoints = ({ selectedRoutePoint }) => {
 const { t } = useTranslation();
 
  return (
    <div className="modal fade" id="view-route-point-modal">
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">{t("route_points_details")}</h5>
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
                <strong>{t("route_point_id")}:</strong>
                <div>{selectedRoutePoint?.route_point_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("route_id")}:</strong>
                <div>{selectedRoutePoint?.route_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("point_id")}:</strong>
                <div>{selectedRoutePoint?.point_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("sequence_number")}:</strong>
                <div>{selectedRoutePoint?.sequence_number}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("estimated_arrival_time")}:</strong>
                <div>{selectedRoutePoint?.estimated_arrival_time}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("expected_stay_duration")}:</strong>
                <div>{selectedRoutePoint?.expected_stay_duration}</div>
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

export default ViewRoutePoints;
