import React from "react";

const ViewCircle = ({ selectedCircle }) => {
  if (!selectedCircle) return null;

  return (
    <div className="modal fade" id="view-circle-modal">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Circle Details</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body">

            <div className="row">

              <div className="col-md-6 mb-3">
                <strong>Circle ID:</strong>
                <div>
                  {selectedCircle.circle_id || selectedCircle.id}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Circle Name:</strong>
                <div>{selectedCircle.circle_name}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Circle Code:</strong>
                <div>{selectedCircle.circle_code}</div>
              </div>

            </div>

          </div>

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

export default ViewCircle;
