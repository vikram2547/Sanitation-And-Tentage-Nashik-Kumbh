import React from "react";

const ViewShift = ({ selectedShift }) => {

  const activeStatus = (value) =>
    value === 1 || value === "1" ? "Active" : "Inactive";

  return (
    <div className="modal fade" id="view-shift-modal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">

          {/* ================= HEADER ================= */}
          <div className="modal-header">
            <h5 className="modal-title">Shift Details</h5>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
            >
              <span>×</span>
            </button>
          </div>

          {/* ================= BODY ================= */}
          <div className="modal-body">
            <div className="row">

              {/* Shift ID */}
              <div className="col-md-6 mb-3">
                <strong>Shift ID:</strong>
                <div>{selectedShift?.shift_id || selectedShift?.id || "-"}</div>
              </div>

              {/* Shift Name */}
              <div className="col-md-6 mb-3">
                <strong>Shift Name:</strong>
                <div>{selectedShift?.shift_name || "-"}</div>
              </div>

              {/* Start Time */}
              <div className="col-md-6 mb-3">
                <strong>Start Time:</strong>
                <div>{selectedShift?.start_time || "-"}</div>
              </div>

              {/* End Time */}
              <div className="col-md-6 mb-3">
                <strong>End Time:</strong>
                <div>{selectedShift?.end_time || "-"}</div>
              </div>

              {/* Break Duration (Optional) */}
              {selectedShift?.break_duration !== undefined && (
                <div className="col-md-6 mb-3">
                  <strong>Break Duration (Minutes):</strong>
                  <div>{selectedShift?.break_duration}</div>
                </div>
              )}

              {/* Grace Time (Optional) */}
              {selectedShift?.grace_time !== undefined && (
                <div className="col-md-6 mb-3">
                  <strong>Grace Time (Minutes):</strong>
                  <div>{selectedShift?.grace_time}</div>
                </div>
              )}

              {/* Status */}
              <div className="col-md-6 mb-3">
                <strong>Status:</strong>
                <div>{activeStatus(selectedShift?.is_active)}</div>
              </div>

              {/* Created At (Optional) */}
              {selectedShift?.created_at && (
                <div className="col-md-6 mb-3">
                  <strong>Created At:</strong>
                  <div>{selectedShift?.created_at}</div>
                </div>
              )}

            </div>
          </div>

          {/* ================= FOOTER ================= */}
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

export default ViewShift;
