import React from "react";

const ViewVendor = ({ selectedVendor }) => {
  if (!selectedVendor) return null;

  return (
    <div className="modal fade" id="view-vendor-modal">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Vendor Details</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body">

            <div className="row">

              <div className="col-md-6 mb-3">
                <strong>Vendor ID:</strong>
                <div>
                  {selectedVendor.vendor_id || selectedVendor.id}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Vendor Name:</strong>
                <div>{selectedVendor.vendor_name}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Vendor Code:</strong>
                <div>{selectedVendor.vendor_code}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Contact Person:</strong>
                <div>{selectedVendor.contact_person}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Contact Email:</strong>
                <div>{selectedVendor.contact_email}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Contact Phone:</strong>
                <div>{selectedVendor.contact_phone}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Status:</strong>
                <div>
                  {selectedVendor.status === "ACTIVE"
                    ? "Active"
                    : "Inactive"}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Address:</strong>
                <div>{selectedVendor.address}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>User ID:</strong>
                <div>{selectedVendor.user_id || 0}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Created At:</strong>
                <div>{selectedVendor.created_at}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Updated At:</strong>
                <div>{selectedVendor.updated_at}</div>
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

export default ViewVendor;
