import React from "react";
import { useTranslation } from "react-i18next";

const ViewRoute = ({ selectedRoute }) => {
const { t } = useTranslation();

  return (
    <div className="modal fade" id="view-route-modal">
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">{t("route_details")}</h5>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
            >
              <span>×</span>
            </button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            <div className="row">

              <div className="col-md-6 mb-3">
                <strong>{t("route_id")}:</strong>
                <div>{selectedRoute?.route_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("route_code")}:</strong>
                <div>{selectedRoute?.route_code}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("route_name")}:</strong>
                <div>{selectedRoute?.route_name}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("zone")}:</strong>
                <div>{selectedRoute?.zone}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("status")}:</strong>
                <div>{selectedRoute?.status}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("created_at")}:</strong>
                <div>{selectedRoute?.created_at}</div>
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
              {t("cancel")}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewRoute;
