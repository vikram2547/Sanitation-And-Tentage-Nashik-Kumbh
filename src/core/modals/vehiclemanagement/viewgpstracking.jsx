import React from "react";

const ViewGpsTracking = ({ selectedGps }) => {

  return (
    <div className="modal fade" id="view-gps-modal">
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">GPS Tracking Details</h5>
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
                <strong>Vehicle ID:</strong>
                <div>{selectedGps?.vehicle_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Assignment ID:</strong>
                <div>{selectedGps?.assignment_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Latitude:</strong>
                <div>{selectedGps?.latitude}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Longitude:</strong>
                <div>{selectedGps?.longitude}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Speed:</strong>
                <div>{selectedGps?.speed}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Ignition Status:</strong>
                <div>{selectedGps?.ignition_status}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Fuel Level:</strong>
                <div>{selectedGps?.fuel_level}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Odometer Reading:</strong>
                <div>{selectedGps?.odometer_reading}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Timestamp:</strong>
                <div>{selectedGps?.timestamp}</div>
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

export default ViewGpsTracking;
