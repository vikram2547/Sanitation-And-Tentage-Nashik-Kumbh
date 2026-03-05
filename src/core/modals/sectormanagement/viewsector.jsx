import React from "react";

const ViewSector = ({ selectedSector }) => {
  return (
    <div className="modal fade" id="view-sector-modal">
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Sector Details</h5>
            <button type="button" className="close" data-bs-dismiss="modal">
              <span>×</span>
            </button>
          </div>

          <div className="modal-body">
            <div className="row">

              <div className="col-md-6 mb-3">
                <strong>Sector ID:</strong>
                <div>{selectedSector?.sector_id || selectedSector?.id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Sector Name:</strong>
                <div>{selectedSector?.sector_name}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Sector Code:</strong>
                <div>{selectedSector?.sector_code}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Created At:</strong>
                <div>{selectedSector?.created_at}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Updated At:</strong>
                <div>{selectedSector?.updated_at}</div>
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

export default ViewSector;