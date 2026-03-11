import React from "react";
import { useTranslation } from "react-i18next";

const ViewDailyTripSummaries = ({ selectedTrip }) => {
  const { t } = useTranslation();

  return (
    <div className="modal fade" id="view-daily-trip-summary">
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">{t("daily_trip_summary_details")}</h5>
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

              {selectedTrip &&
                Object.entries(selectedTrip).map(([key, value]) => (
                  <div className="col-md-4 mb-3" key={key}>
                    <strong>{key.replace(/_/g, " ").toUpperCase()}:</strong>
                    <div>{value ?? "-"}</div>
                  </div>
                ))}

            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button
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

export default ViewDailyTripSummaries;