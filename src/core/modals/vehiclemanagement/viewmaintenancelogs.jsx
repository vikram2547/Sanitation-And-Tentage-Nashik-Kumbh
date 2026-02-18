import React from "react";

const ViewMaintenanceLogs = ({ selectedLog }) => {
  if (!selectedLog) return null;

  return (
    <div className="modal fade" id="view-maintenance-modal">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">Maintenance Log Details</h5>
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
                <strong>Maintenance ID:</strong>
                <div>{selectedLog.maintenance_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Vehicle ID:</strong>
                <div>{selectedLog.vehicle_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Maintenance Date:</strong>
                <div>{selectedLog.maintenance_date}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Maintenance Type:</strong>
                <div>{selectedLog.maintenance_type}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Description:</strong>
                <div>{selectedLog.description || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Cost:</strong>
                <div>{selectedLog.cost}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Next Maintenance Date:</strong>
                <div>{selectedLog.next_maintenance_date}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Vendor ID:</strong>
                <div>{selectedLog.vendor_id}</div>
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

export default ViewMaintenanceLogs;
