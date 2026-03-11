import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { updateQuestion, clearMessages } from "../../redux/questionSlice";
import { useTranslation } from "react-i18next";


const EditQuestion = ({ selectedQuestion }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
    if (selectedQuestion) {
      setFormData({
        question_text: selectedQuestion.question_text || "",
        question_type: selectedQuestion.question_type || "",
        expected_answer: selectedQuestion.expected_answer || "",
        severity: selectedQuestion.severity || "",
        sequence: selectedQuestion.sequence ?? 1,
        is_active: selectedQuestion.is_active ?? 1,
      });
    }

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

    const modal =
      Modal.getInstance(modalEl) || new Modal(modalEl);

    const handleHidden = () => {
      // CLEANUP AFTER BOOTSTRAP FINISHES
      document.body.classList.remove("modal-open");
      document.body.style.paddingRight = "";
      document
        .querySelectorAll(".modal-backdrop")
        .forEach((bd) => bd.remove());

      modalEl.removeEventListener("hidden.bs.modal", handleHidden);
    };

    modalEl.addEventListener("hidden.bs.modal", handleHidden);
    modal.hide();
  }, [success, dispatch]);

  return (
    <div className="modal fade" id="edit-question" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>{t("edit_question")}</h4>
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
                    {t("updated_successfully")}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    <div className="col-lg-12">
                      <div className="input-blocks">
                        <label>{t("question")}</label>
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
                        <label>{t("question_type")}</label>
                        <select
                          type="text"
                          name="question_type"
                          value={formData.question_type}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="YES_NO">Yes/No</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("expected_answer")}</label>
                        <select
                          type='text'
                          name="expected_answer"
                          value={formData.expected_answer}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="YES">Yes</option>
                          <option value="NO">No</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("severity")}</label>
                        <select
                          name="severity"
                          value={formData.severity}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="">Select Severity</option>
                          <option value="LOW">Low</option>
                          <option value="MEDIUM">Medium</option>
                          <option value="HIGH">High</option>
                        </select>
                      </div>
                    </div>

                  </div>

                  <div className="modal-footer-btn">
                    <button
                      type="button"
                      className="btn btn-cancel me-2"
                      data-bs-dismiss="modal"
                    >
                      {t("cancel")}
                    </button>

                    <button
                      type="submit"
                      className="btn btn-submit"
                      disabled={loading}
                    >
                      {loading ? t("updating") : t("update")}
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
