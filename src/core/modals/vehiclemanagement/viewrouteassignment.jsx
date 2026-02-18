import React from "react";

const ViewRouteAssignment = ({ selectedAssignment }) => {
  if (!selectedAssignment) return null;

  return (
    <div className="modal fade" id="view-assignment-modal">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">Assignment Details</h5>
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
                <strong>Assignment ID:</strong>
                <div>{selectedAssignment.assignment_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Vehicle ID:</strong>
                <div>{selectedAssignment.vehicle_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Route ID:</strong>
                <div>{selectedAssignment.route_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Assignment Date:</strong>
                <div>{selectedAssignment.assignment_date}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Driver ID:</strong>
                <div>{selectedAssignment.driver_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Shift:</strong>
                <div>{selectedAssignment.shift}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Planned Start Time:</strong>
                <div>{selectedAssignment.planned_start_time}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Planned End Time:</strong>
                <div>{selectedAssignment.planned_end_time}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Status:</strong>
                <div>{selectedAssignment.assignment_status}</div>
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

export default ViewRouteAssignment;
