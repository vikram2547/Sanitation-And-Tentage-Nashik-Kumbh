import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import PrimeDataTable from "../../components/data-table";
import { clearMessages, deleteQuestion, getQuestions } from "../../core/redux/questionSlice";
import AddQuestion from "../../core/modals/questionmanagement/addquestions";
import EditQuestion from "../../core/modals/questionmanagement/editquestion";
import ViewQuestion from "../../core/modals/questionmanagement/viewquestion";


const Questions = () => {
    const dispatch = useDispatch();

    const { questions, totalRecords, loading, error, success } = useSelector(
        (state) => state.questions
    );

    const [rows, setRows] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteId, setDeleteId] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [viewQuestionData, setViewQuestionData] = useState(null);
    const [editQuestionData, setEditQuestionData] = useState(null);


    // ============================
    // FETCH QUESTIONS
    // ============================
    useEffect(() => {
        dispatch(getQuestions({ page: currentPage, per_page: rows }));
    }, [dispatch, currentPage, rows]);

    // ============================
    // AUTO CLEAR SUCCESS / ERROR
    // ============================
    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => {
                dispatch(clearMessages());
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [success, error, dispatch]);

    // ============================
    // DELETE VENDOR
    // ============================
    const handleDelete = async () => {
        if (!deleteId) return;

        await dispatch(deleteQuestion(deleteId));
        setDeleteId(null);
    };

    // ============================
    // TABLE COLUMNS
    // ============================
    const columns = [
        {
            header: "Question",
            field: "question_text",
            sortable: true,
            body: (rowData) => rowData?.question_text || "-"
        },
        {
            header: "Type",
            field: "question_type",
            sortable: true,
            body: (rowData) => rowData?.question_type || "-"
        },
        {
            header: "Expected Answer",
            field: "expected_answer",
            sortable: true,
            body: (rowData) => rowData?.expected_answer || "-"
        },
        {
            header: "Severity",
            field: "severity",
            sortable: true,
            body: (rowData) => rowData?.severity || "-"
        },
        {
            header: "Status",
            field: "is_active",
            sortable: true,
            body: (rowData) =>
                rowData?.is_active === "1" ? "Active" : "Inactive"
        },
        {
            header: "Actions",
            field: "actions",
            sortable: false,
            body: (rowData) => (
                <div className="action-table-data">
                    <div className="edit-delete-action">

                        {/* VIEW */}
                        <Link
                            className="me-2 p-2"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#view-question-modal"
                            onClick={() => setViewQuestionData(rowData)}
                        >
                            <i className="feather feather-eye action-eye"></i>
                        </Link>

                        {/* EDIT */}
                        <Link
                            className="me-2 p-2"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-question"
                            onClick={() => setEditQuestionData(rowData)}
                        >
                            <i className="feather-edit"></i>
                        </Link>

                        {/* DELETE */}
                        <Link
                            className="confirm-text p-2"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#delete-question-modal"
                            onClick={() => setDeleteId(Number(rowData.question_id))}
                        >
                            <i className="feather-trash-2"></i>
                        </Link>

                    </div>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="add-item d-flex">
                            <div className="page-title">
                                <h4>Questions List</h4>
                                <h6>Manage Your Questions</h6>
                            </div>
                        </div>

                        <ul className="table-top-head">
                            <TooltipIcons />
                        </ul>

                        <div className="page-btn">
                            <Link
                                to="#"
                                className="btn btn-added"
                                data-bs-toggle="modal"
                                data-bs-target="#add-question"
                            >
                                <i className="ti ti-circle-plus me-1"></i>
                                Add New Question
                            </Link>
                        </div>
                    </div>

                    <div className="card table-list-card">
                        <div className="card-body">

                            {success && (
                                <div className="alert alert-success">{success}</div>
                            )}

                            {error && (
                                <div className="alert alert-danger">{error}</div>
                            )}

                            <div className="table-responsive">
                                <PrimeDataTable
                                    column={columns}
                                    data={Array.isArray(questions) ? questions : []}
                                    totalRecords={totalRecords}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    rows={rows}
                                    setRows={setRows}
                                    selectionMode="checkbox"
                                    selection={selectedQuestion}
                                    onSelectionChange={(e) => setSelectedQuestion(e.value)}
                                    dataKey="question_id"
                                />
                            </div>

                            {loading && (
                                <div className="text-center mt-3">
                                    <div className="spinner-border text-primary"></div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>

            <AddQuestion />
            <EditQuestion selectedQuestion={editQuestionData} />
            <ViewQuestion selectedQuestion={viewQuestionData} />

            {/* DELETE MODAL */}
            <div className="modal fade" id="delete-question-modal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content p-5 px-3 text-center">
                                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                                    <i className="ti ti-trash fs-24 text-danger" />
                                </span>
                                <h4 className="fs-20 fw-bold mb-2 mt-1">Delete Question</h4>
                                <p className="mb-0 fs-16">
                                    Are you sure you want to delete question?
                                </p>
                                <div className="modal-footer-btn mt-3 d-flex justify-content-center">
                                    <button
                                        type="button"
                                        className="btn me-2 btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        data-bs-dismiss="modal"
                                        onClick={handleDelete}
                                    >
                                        Yes Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Questions;
