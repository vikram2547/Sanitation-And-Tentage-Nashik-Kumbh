import React from "react";

const ViewRoutePoints = ({ selectedRoutePoint }) => {
  if (!selectedRoutePoint) return null;

  return (
    <div className="modal fade" id="view-route-point-modal">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">Route Point Details</h5>
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
                <strong>Route Point ID:</strong>
                <div>{selectedRoutePoint.route_point_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Route ID:</strong>
                <div>{selectedRoutePoint.route_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Point ID:</strong>
                <div>{selectedRoutePoint.point_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Sequence Number:</strong>
                <div>{selectedRoutePoint.sequence_number}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Estimated Arrival Time:</strong>
                <div>{selectedRoutePoint.estimated_arrival_time}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Expected Stay Duration:</strong>
                <div>{selectedRoutePoint.expected_stay_duration}</div>
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

export default ViewRoutePoints;
