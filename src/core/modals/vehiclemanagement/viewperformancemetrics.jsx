import React from "react";

const ViewPerformanceMetrics = ({ selectedMetric }) => {
  if (!selectedMetric) return null;

  return (
    <div className="modal fade" id="view-metric-modal">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">Performance Metric Details</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            <div className="row">

              <div className="col-md-6 mb-3">
                <strong>Metric ID:</strong>
                <div>{selectedMetric.metric_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Vehicle ID:</strong>
                <div>{selectedMetric.vehicle_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Route ID:</strong>
                <div>{selectedMetric.route_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Metric Date:</strong>
                <div>{selectedMetric.metric_date}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Metric Type:</strong>
                <div>{selectedMetric.metric_type}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Metric Value:</strong>
                <div>{selectedMetric.metric_value}</div>
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
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewPerformanceMetrics;
