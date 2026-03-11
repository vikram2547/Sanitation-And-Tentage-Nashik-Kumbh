import React from "react";
import { useTranslation } from "react-i18next";

const ViewQuestion = ({ selectedQuestion }) => {
  const { t } = useTranslation();

  return (
    <div className="modal fade" id="view-question-modal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">{t("question_details")}</h5>
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
                <strong>{t("question_id")}:</strong>
                <div>{selectedQuestion?.question_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("question_type")}:</strong>
                <div>{selectedQuestion?.question_type}</div>
              </div>

              <div className="col-md-12 mb-3">
                <strong>{t("question")}:</strong>
                <div>{selectedQuestion?.question_text}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("expected_answer")}:</strong>
                <div>{selectedQuestion?.expected_answer || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("options")}:</strong>
                <div>
                  {selectedQuestion?.options
                    ? selectedQuestion?.options
                    : "-"}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("condition_type")}:</strong>
                <div>{selectedQuestion?.condition_type || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("condition_value")}:</strong>
                <div>{selectedQuestion?.condition_value || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("severity")}:</strong>
                <div>{selectedQuestion?.severity}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("sla")}:</strong>
                <div>{selectedQuestion?.sla || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("is_mandatory")}:</strong>
                <div>
                  {selectedQuestion?.is_mandatory === "1" ? "Yes" : "No"}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("is_photo_mandatory")}:</strong>
                <div>
                  {selectedQuestion?.is_photo_mandatory === "1"
                    ? "Yes"
                    : "No"}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("sequence")}:</strong>
                <div>{selectedQuestion?.sequence}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>{t("status")}:</strong>
                <div>
                  {selectedQuestion?.is_active === "1"
                    ? "Active"
                    : "Inactive"}
                </div>
              </div>

            </div>
          </div>

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

export default ViewQuestion;
