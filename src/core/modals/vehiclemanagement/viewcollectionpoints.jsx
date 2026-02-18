import React from "react";

const ViewCollectionPoints = ({ selectedPoint }) => {
  if (!selectedPoint) return null;

  return (
    <div className="modal fade" id="view-collection-point-modal">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">Collection Point Details</h5>
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
                <strong>Point Code:</strong>
                <div>{selectedPoint.point_code}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Point Name:</strong>
                <div>{selectedPoint.point_name}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Latitude:</strong>
                <div>{selectedPoint.latitude}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Longitude:</strong>
                <div>{selectedPoint.longitude}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Address:</strong>
                <div>{selectedPoint.address || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Ward Number:</strong>
                <div>{selectedPoint.ward_number || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Zone:</strong>
                <div>{selectedPoint.zone || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Point Type:</strong>
                <div>{selectedPoint.point_type}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Expected Collection Time:</strong>
                <div>{selectedPoint.expected_collection_time}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Collection Frequency:</strong>
                <div>{selectedPoint.collection_frequency}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Status:</strong>
                <div>{selectedPoint.status}</div>
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

export default ViewCollectionPoints;
