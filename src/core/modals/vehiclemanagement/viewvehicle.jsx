import React from "react";

const ViewVehicle = ({ selectedVehicle }) => {
  if (!selectedVehicle) return null;

  return (
    <div
      className="modal fade"
      id="view-vehicle-modal"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">

          {/* ===== Modal Header ===== */}
          <div className="modal-header">
            <h5 className="modal-title">Vehicle Details</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          {/* ===== Modal Body ===== */}
          <div className="modal-body">
            <div className="row">

              <div className="col-md-6 mb-3">
                <strong>Vehicle ID:</strong>
                <div>{selectedVehicle.vehicle_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Vehicle Name:</strong>
                <div>{selectedVehicle.vehicle_name || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Vehicle Type:</strong>
                <div>{selectedVehicle.vehicle_type || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Vehicle Number:</strong>
                <div>{selectedVehicle.vehicle_number || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>RC Number:</strong>
                <div>{selectedVehicle.rc_number || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Vendor ID:</strong>
                <div>{selectedVehicle.vendor_id || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Status:</strong>
                <div>
                  {selectedVehicle.status === "Active" ||
                  selectedVehicle.status === "1"
                    ? "Active"
                    : "Inactive"}
                </div>
              </div>

            </div>
          </div>

          {/* ===== Modal Footer ===== */}
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

export default ViewVehicle;
