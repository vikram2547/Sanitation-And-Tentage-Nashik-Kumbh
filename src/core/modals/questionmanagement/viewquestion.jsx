import React from "react";

const ViewQuestion = ({ selectedQuestion }) => {
  if (!selectedQuestion) return null;

  return (
    <div className="modal fade" id="view-question-modal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Question Details</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body">
            <div className="row">

              <div className="col-md-6 mb-3">
                <strong>Question ID:</strong>
                <div>{selectedQuestion.question_id}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Question Type:</strong>
                <div>{selectedQuestion.question_type}</div>
              </div>

              <div className="col-md-12 mb-3">
                <strong>Question:</strong>
                <div>{selectedQuestion.question_text}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Expected Answer:</strong>
                <div>{selectedQuestion.expected_answer || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Options:</strong>
                <div>
                  {selectedQuestion.options
                    ? selectedQuestion.options
                    : "-"}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Condition Type:</strong>
                <div>{selectedQuestion.condition_type || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Condition Value:</strong>
                <div>{selectedQuestion.condition_value || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Severity:</strong>
                <div>{selectedQuestion.severity}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>SLA (Minutes):</strong>
                <div>{selectedQuestion.sla || "-"}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Mandatory:</strong>
                <div>
                  {selectedQuestion.is_mandatory === "1" ? "Yes" : "No"}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Photo Mandatory:</strong>
                <div>
                  {selectedQuestion.is_photo_mandatory === "1"
                    ? "Yes"
                    : "No"}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Sequence:</strong>
                <div>{selectedQuestion.sequence}</div>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Status:</strong>
                <div>
                  {selectedQuestion.is_active === "1"
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
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewQuestion;
