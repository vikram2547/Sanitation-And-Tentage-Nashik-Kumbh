import React from "react";

const ViewGeofences = ({ selectedGeofence }) => {
  if (!selectedGeofence) return null;

  return (
    <div className="modal fade" id="view-geofence-modal">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">Geofence Details</h5>
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
                <strong>Geofence ID:</strong>
                <div>{selectedGeofence.geofence_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Point ID:</strong>
                <div>{selectedGeofence.point_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Radius (Meters):</strong>
                <div>{selectedGeofence.radius_meters}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Status:</strong>
                <div>
                  {selectedGeofence.is_active === "1"
                    ? "Active"
                    : "Inactive"}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Created At:</strong>
                <div>{selectedGeofence.created_at}</div>
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

export default ViewGeofences;
