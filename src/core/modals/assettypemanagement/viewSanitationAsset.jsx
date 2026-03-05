import React from "react";

const ViewSanitationAsset = ({ selectedAsset }) => {

  return (
    <div
      className="modal fade"
      id="view-sanitation-asset"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">

          {/* ===== Modal Header ===== */}
          <div className="modal-header">
            <h5 className="modal-title">Sanitation Asset Details</h5>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
            >
              <span>×</span>
            </button>
          </div>

          {/* ===== Modal Body ===== */}
          <div className="modal-body">
            <div className="row">

              <div className="col-md-6 mb-3">
                <strong>Asset ID:</strong>
                <div>{selectedAsset?.sanitation_asset_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>QR Code:</strong>
                <div>{selectedAsset?.qr_code || "-"}</div>
              </div>

              <div className="col-md-12 mb-3">
                <strong>Asset Name:</strong>
                <div>{selectedAsset?.asset_name || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Gender:</strong>
                <div>{selectedAsset?.gender || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Status:</strong>
                <div>
                  {selectedAsset?.status === "ACTIVE" ? "Active" : "Inactive"}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Sector:</strong>
                <div>{selectedAsset?.sector_name || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Circle:</strong>
                <div>{selectedAsset?.circle_name || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Latitude:</strong>
                <div>{selectedAsset?.latitude || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Longitude:</strong>
                <div>{selectedAsset?.longitude || "-"}</div>
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

export default ViewSanitationAsset;
