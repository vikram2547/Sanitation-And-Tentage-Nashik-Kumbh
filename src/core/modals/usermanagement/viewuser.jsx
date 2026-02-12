import React from "react";

const ViewUser = ({ selectedUser }) => {
  if (!selectedUser) return null;

  return (
    <div className="modal fade" id="view-user-modal">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">User Details</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body">

            <div className="row">

              <div className="col-md-6 mb-3">
                <strong>User ID:</strong>
                <div>{selectedUser.user_id || selectedUser.id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Full Name:</strong>
                <div>{selectedUser.full_name}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Email:</strong>
                <div>{selectedUser.email}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Phone:</strong>
                <div>{selectedUser.phone}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Status:</strong>
                <div>
                  {selectedUser.is_active === 1
                    ? "Active"
                    : "Inactive"}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>User Type ID:</strong>
                <div>{selectedUser.user_type_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Vendor ID:</strong>
                <div>{selectedUser.vendor_id || "N/A"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Created At:</strong>
                <div>{selectedUser.created_at}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Updated At:</strong>
                <div>{selectedUser.updated_at}</div>
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

export default ViewUser;
