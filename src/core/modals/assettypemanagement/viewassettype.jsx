import React from "react";

const ViewAssetType = ({ selectedAssetType }) => {
  return (
    <div
      className="modal fade"
      id="view-assettype-modal"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">

          {/* ===== Modal Header ===== */}
          <div className="modal-header">
            <h5 className="modal-title">Asset Type Details</h5>
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
                <strong>Asset Type ID:</strong>
                <div>{selectedAssetType?.asset_type_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Type:</strong>
                <div>{selectedAssetType?.type || "-"}</div>
              </div>

              <div className="col-md-12 mb-3">
                <strong>Name:</strong>
                <div>{selectedAssetType?.name}</div>
              </div>

              <div className="col-md-12 mb-3">
                <strong>Description:</strong>
                <div>{selectedAssetType?.description || "-"}</div>
              </div>

              <div className="col-md-12 mb-3">
                <strong>Questions:</strong>
                <div>
                  {Array.isArray(selectedAssetType?.questions)
                    ? selectedAssetType.questions.join(", ")
                    : selectedAssetType?.questions || "-"}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Status:</strong>
                <div>
                  {selectedAssetType?.status === "1"
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

export default ViewAssetType;