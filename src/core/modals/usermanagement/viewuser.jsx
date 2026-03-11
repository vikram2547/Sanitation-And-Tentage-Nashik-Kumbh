import React from "react";
import { useTranslation } from "react-i18next";


const ViewUser = ({ selectedUser }) => {
  const { t } = useTranslation();

  return (
    <div className="modal fade" id="view-user-modal">
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t("user_details")}</h5>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
            >
              <span>×</span>
            </button>
          </div>

          <div className="modal-body">

            <div className="row">

              <div className="col-md-6 mb-3">
                <strong>{t("user_id")}:</strong>
                <div>{selectedUser?.user_id || selectedUser?.id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("full_name")}:</strong>
                <div>{selectedUser?.full_name}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("email")}:</strong>
                <div>{selectedUser?.email}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("phone")}:</strong>
                <div>{selectedUser?.phone}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("status")}:</strong>
                <div>
                  {selectedUser?.is_active === 1
                    ? "Active"
                    : "Inactive"}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("user_type_id")}:</strong>
                <div>{selectedUser?.user_type_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("vendor_id")}:</strong>
                <div>{selectedUser?.vendor_id || "N/A"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("created_at")}:</strong>
                <div>{selectedUser?.created_at}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("updated_at")}:</strong>
                <div>{selectedUser?.updated_at}</div>
              </div>

            </div>

          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {t("close")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
