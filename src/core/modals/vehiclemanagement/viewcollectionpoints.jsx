import React from "react";
import { useTranslation } from "react-i18next";

const ViewCollectionPoints = ({ selectedPoint }) => {
const { t } = useTranslation();

  return (
    <div className="modal fade" id="view-collection-point-modal">
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">{t("collection_point_details")}</h5>
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
                <strong>{t("point_code")}:</strong>
                <div>{selectedPoint?.point_code}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("point_name")}:</strong>
                <div>{selectedPoint?.point_name}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("latitude")}:</strong>
                <div>{selectedPoint?.latitude}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("longitude")}:</strong>
                <div>{selectedPoint?.longitude}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("address")}:</strong>
                <div>{selectedPoint?.address || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("ward_number")}:</strong>
                <div>{selectedPoint?.ward_number || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("zone")}:</strong>
                <div>{selectedPoint?.zone || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("point_type")}:</strong>
                <div>{selectedPoint?.point_type}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("expected_collection_time")}:</strong>
                <div>{selectedPoint?.expected_collection_time}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("collection_frequency")}:</strong>
                <div>{selectedPoint?.collection_frequency}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("status")}:</strong>
                <div>{selectedPoint?.status}</div>
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

export default ViewCollectionPoints;
