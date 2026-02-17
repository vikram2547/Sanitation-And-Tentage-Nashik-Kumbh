import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { addAssetType, clearMessages } from "../../redux/assettypeSlice";

const AddAssetType = () => {
    const dispatch = useDispatch();

    const { success, error, loading } = useSelector(
        (state) => state.assetTypes
    );

    const { questions } = useSelector(
        (state) => state.questions
    );

    const [formData, setFormData] = useState({
        type: "",
        name: "",
        description: "",
        questions: [],
    });

    /* ================= HANDLE CHANGE ================= */
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    /* ================= QUESTIONS MULTI SELECT ================= */
    const handleQuestionsChange = (e) => {
        const values = Array.from(e.target.selectedOptions).map(
            (opt) => opt.value
        );

        setFormData({
            ...formData,
            questions: values,
        });
    };

    /* ================= SUBMIT ================= */
    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
            addAssetType({
                type: formData.type,
                name: formData.name,
                description: formData.description,
                questions: formData.questions.join(","), // backend format
                status: 1,
            })
        );
    };

    /* ================= SUCCESS FLOW ================= */
    useEffect(() => {
        if (!success) return;

        const modalEl = document.getElementById("add-assettype");

        if (modalEl) {
            const modalInstance =
                Modal.getInstance(modalEl) || new Modal(modalEl);
            modalInstance.hide();
        }

        setTimeout(() => {
            document.body.classList.remove("modal-open");
            document.body.style.paddingRight = "";
            document
                .querySelectorAll(".modal-backdrop")
                .forEach((bd) => bd.remove());
        }, 300);

        // reset form
        setFormData({
            type: "",
            name: "",
            description: "",
            questions: [],
        });
    }, [success]);

    /* ================= AUTO CLEAR MESSAGE ================= */
    useEffect(() => {
        if (!success && !error) return;

        const timer = setTimeout(() => {
            dispatch(clearMessages());
        }, 5000);

        return () => clearTimeout(timer);
    }, [success, error, dispatch]);

    return (
        <div className="modal fade" id="add-assettype" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered custom-modal-two">
                <div className="modal-content">
                    <div className="page-wrapper-new p-0">
                        <div className="content">

                            {/* ================= HEADER ================= */}
                            <div className="modal-header border-0 custom-modal-header">
                                <div className="page-title">
                                    <h4>Add Asset Type</h4>
                                </div>
                                <button
                                    type="button"
                                    className="close"
                                    data-bs-dismiss="modal"
                                >
                                    <span>×</span>
                                </button>
                            </div>

                            {/* ================= BODY ================= */}
                            <div className="modal-body custom-modal-body">

                                {error && <div className="alert alert-danger">{error}</div>}
                                {success && (
                                    <div className="alert alert-success">
                                        Asset Type created successfully
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="row">

                                        {/* ===== TYPE ===== */}
                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>Asset Type</label>
                                                <select
                                                    className="form-control"
                                                    name="type"
                                                    value={formData.type}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            type: e.target.value,
                                                        })
                                                    }
                                                    required
                                                >
                                                    <option value="">Select Type</option>
                                                    <option value="SANITATION">Sanitation</option>
                                                    <option value="TENTAGE">Tentage</option>
                                                </select>
                                            </div>
                                        </div>


                                        {/* ===== NAME ===== */}
                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>Asset Type Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Enter asset type name"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* ===== DESCRIPTION ===== */}
                                        <div className="col-lg-12">
                                            <div className="input-blocks">
                                                <label>Description</label>
                                                <textarea
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Enter description"
                                                    rows="3"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* ===== QUESTIONS (MULTI SELECT) ===== */}
                                        <div className="col-lg-12">
                                            <div className="input-blocks">
                                                <label>Questions</label>
                                                <select
                                                    multiple
                                                    className="form-control"
                                                    value={formData.questions}
                                                    onChange={handleQuestionsChange}
                                                >
                                                    {Array.isArray(questions) &&
                                                        questions.map((q) => (
                                                            <option
                                                                key={q.question_id}
                                                                value={q.question_id}
                                                            >
                                                                {q.question_text}
                                                            </option>
                                                        ))}
                                                </select>
                                                <small className="text-muted">
                                                    Hold Ctrl (Windows) / Cmd (Mac) to select multiple
                                                </small>
                                            </div>
                                        </div>


                                    </div>

                                    {/* ================= FOOTER ================= */}
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

export default AddAssetType;
