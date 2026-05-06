import React from "react";
import { useTranslation } from "react-i18next";
import { formatDateTime } from "../../../utils/dateFormat";


const ViewVendor = ({ selectedVendor }) => {
  const { t } = useTranslation();

  return (
    <div className="modal fade" id="view-vendor-modal">
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">{t("vendor_details")}</h5>
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
                <strong>{t("vendor_id")}:</strong>
                <div>
                  {selectedVendor?.vendor_id || selectedVendor?.id}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("vendor_name")}:</strong>
                <div>{selectedVendor?.vendor_name}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("vendor_code")}:</strong>
                <div>{selectedVendor?.vendor_code}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("contact_person")}:</strong>
                <div>{selectedVendor?.contact_person}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("email")}:</strong>
                <div>{selectedVendor?.contact_email}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("phone")}:</strong>
                <div>{selectedVendor?.contact_phone}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("status")}:</strong>
                <div>
                  {selectedVendor?.status === "ACTIVE"
                    ? "Active"
                    : "Inactive"}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("address")}:</strong>
                <div>{selectedVendor?.address}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("user_id")}:</strong>
                <div>{selectedVendor?.user_id || 0}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("created_at")}:</strong>
                <div>{formatDateTime(selectedVendor?.created_at)}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("updated_at")}:</strong>
                <div>{formatDateTime(selectedVendor?.updated_at)}</div>
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

export default ViewVendor;
