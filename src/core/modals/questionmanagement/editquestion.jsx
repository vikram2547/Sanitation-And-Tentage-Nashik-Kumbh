import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { updateQuestion, clearMessages } from "../../redux/questionSlice";

const EditQuestion = ({ selectedQuestion }) => {
  const dispatch = useDispatch();

  const { success, error, loading } = useSelector(
    (state) => state.questions
  );

  const [formData, setFormData] = useState({
    question_text: "",
    question_type: "",
    expected_answer: "",
    severity: "",
    sequence: 1,
    is_active: 1,
  });

  /* ================= PREFILL DATA ================= */
  useEffect(() => {
    if (!selectedQuestion) return;

    setFormData({
      question_text: selectedQuestion.question_text || "",
      question_type: selectedQuestion.question_type || "",
      expected_answer: selectedQuestion.expected_answer || "",
      severity: selectedQuestion.severity || "",
      sequence: selectedQuestion.sequence ?? 1,
      is_active: selectedQuestion.is_active ?? 1,
    });
  }, [selectedQuestion]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const questionId =
      selectedQuestion?.question_id || selectedQuestion?.id;

    if (!questionId) {
      console.error("No Question ID found");
      return;
    }

    dispatch(
      updateQuestion({
        id: questionId,
        data: formData,
      })
    );
  };

  /* ================= CLOSE MODAL ON SUCCESS ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("edit-question");
    if (!modalEl) return;

    const modalInstance =
      Modal.getInstance(modalEl) || new Modal(modalEl);

    modalInstance.hide();
    modalInstance.dispose();

    setTimeout(() => {
      document.body.classList.remove("modal-open");
      document.body.style.paddingRight = "";
      document
        .querySelectorAll(".modal-backdrop")
        .forEach((bd) => bd.remove());

      dispatch(clearMessages());
    }, 300);
  }, [success, dispatch]);

  return (
    <div className="modal fade" id="edit-question" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>Edit Question</h4>
                </div>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                >
                  <span>×</span>
                </button>
              </div>

              <div className="modal-body custom-modal-body">

                {error && (
                  <div className="alert alert-danger">{error}</div>
                )}

                {success && (
                  <div className="alert alert-success">
                    Question updated successfully
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    <div className="col-lg-12">
                      <div className="input-blocks">
                        <label>Question</label>
                        <input
                          type="text"
                          name="question_text"
                          value={formData.question_text}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Question Type</label>
                        <input
                          type="text"
                          name="question_type"
                          value={formData.question_type}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Severity</label>
                        <input
                          type="text"
                          name="severity"
                          value={formData.severity}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Expected Answer</label>
                        <input
                          type="text"
                          name="expected_answer"
                          value={formData.expected_answer}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                  </div>

                  <div className="modal-footer-btn">
                    <button
                      type="button"
                      className="btn btn-cancel me-2"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="btn btn-submit"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update"}
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQuestion;
