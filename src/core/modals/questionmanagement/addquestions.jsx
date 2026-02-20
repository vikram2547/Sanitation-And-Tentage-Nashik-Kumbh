import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { addQuestion, clearMessages } from "../../redux/questionSlice";

const AddQuestion = () => {
  const dispatch = useDispatch();

  const { success, error, loading } = useSelector(
    (state) => state.questions
  );

  const [formData, setFormData] = useState({
    question_text: "",
    question_type: "YES_NO",
    options: null,
    expected_answer: "YES",
    condition_type: null,
    condition_value: null,
    severity: "",
    is_mandatory: 1,
    is_photo_mandatory: 0,
    sequence: 1,
    is_active: 1,
  });

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addQuestion(formData));
  };

  /* ================= SUCCESS FLOW ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("add-question");

    if (modalEl) {
      const modalInstance =
        Modal.getInstance(modalEl) || new Modal(modalEl);
      modalInstance.hide();
    }

    // reset form
    setFormData({
      question_text: "",
      question_type: "YES_NO",
      options: null,
      expected_answer: "YES",
      condition_type: null,
      condition_value: null,
      severity: "",
      is_mandatory: 1,
      is_photo_mandatory: 0,
      sequence: 1,
      is_active: 1,
    });
  }, [success]);

  /* ================= AUTO CLEAR MESSAGE ================= */
  useEffect(() => {
    if (!success && !error) return;

    const timer = setTimeout(() => {
      dispatch(clearMessages());
    }, 3000);

    return () => clearTimeout(timer);
  }, [success, error, dispatch]);

  return (
    <div className="modal fade" id="add-question" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>Add Question</h4>
                </div>
                <button type="button" className="close" data-bs-dismiss="modal">
                  <span>×</span>
                </button>
              </div>

              <div className="modal-body custom-modal-body">

                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                  <div className="alert alert-success">
                    Question created successfully
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    {/* ===== Question Text ===== */}
                    <div className="col-lg-12">
                      <div className="input-blocks">
                        <label>Question</label>
                        <input
                          type="text"
                          name="question_text"
                          value={formData.question_text}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter question"
                          required
                        />
                      </div>
                    </div>

                    {/* ===== Question Type ===== */}
                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Question Type</label>
                        <select
                          name="question_type"
                          value={formData.question_type}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="YES_NO">Yes / No</option>
                        </select>
                      </div>
                    </div>

                    {/* ===== Expected Answer ===== */}
                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Expected Answer</label>
                        <select
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

                    {/* ===== Severity ===== */}
                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Severity</label>
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

                    {/* ===== Sequence ===== */}
                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Sequence</label>
                        <input
                          type="number"
                          name="sequence"
                          value={formData.sequence}
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
                      {loading ? "Adding..." : "Submit"}
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

export default AddQuestion;
