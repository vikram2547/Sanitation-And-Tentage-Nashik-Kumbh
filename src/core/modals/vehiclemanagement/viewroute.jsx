import React from "react";

const ViewRoute = ({ selectedRoute }) => {
  if (!selectedRoute) return null;

  return (
    <div className="modal fade" id="view-route-modal">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">Route Details</h5>
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
                <strong>Route ID:</strong>
                <div>{selectedRoute.route_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Route Code:</strong>
                <div>{selectedRoute.route_code}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Route Name:</strong>
                <div>{selectedRoute.route_name}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Zone:</strong>
                <div>{selectedRoute.zone}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Status:</strong>
                <div>{selectedRoute.status}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Created At:</strong>
                <div>{selectedRoute.created_at}</div>
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

export default ViewRoute;
