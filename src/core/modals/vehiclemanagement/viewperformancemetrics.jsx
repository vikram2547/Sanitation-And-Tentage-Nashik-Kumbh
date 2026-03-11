import React from "react";
import { useTranslation } from "react-i18next";

const ViewPerformanceMetrics = ({ selectedMetric }) => {
const { t } = useTranslation();

  return (
    <div className="modal fade" id="view-metric-modal">
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">{t("performance_metrics_details")}</h5>
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
                <strong>{t("metric_id")}:</strong>
                <div>{selectedMetric?.metric_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("vehicle_id")}:</strong>
                <div>{selectedMetric?.vehicle_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("route_id")}:</strong>
                <div>{selectedMetric?.route_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("metric_date")}:</strong>
                <div>{selectedMetric?.metric_date}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("metric_type")}:</strong>
                <div>{selectedMetric?.metric_type}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("metric_value")}:</strong>
                <div>{selectedMetric?.metric_value}</div>
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

export default ViewPerformanceMetrics;
