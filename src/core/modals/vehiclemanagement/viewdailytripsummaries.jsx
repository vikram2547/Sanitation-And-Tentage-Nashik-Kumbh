import React from "react";

const ViewDailyTripSummaries = ({ selectedTrip }) => {
  if (!selectedTrip) return null;

  return (
    <div className="modal fade" id="view-daily-trip-summary">
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">Daily Trip Summary Details</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            <div className="row">

              {Object.entries(selectedTrip).map(([key, value]) => (
                <div className="col-md-4 mb-3" key={key}>
                  <strong>{key.replace(/_/g, " ").toUpperCase()}:</strong>
                  <div>{value ?? "-"}</div>
                </div>
              ))}

            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button
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

export default ViewDailyTripSummaries;
