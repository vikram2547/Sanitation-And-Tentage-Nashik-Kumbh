import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import PrimeDataTable from "../../components/data-table";
import { clearMessages, deleteCircle, getCircles } from "../../core/redux/circleSlice";
import AddCircle from "../../core/modals/circlemanagement/addcircle";
import EditCircle from "../../core/modals/circlemanagement/editcircle";
import ViewCircle from "../../core/modals/circlemanagement/viewcircle";
import { Modal } from "bootstrap";


const Circles = () => {
    const dispatch = useDispatch();

    const { circles, totalRecords, loading, error, success } = useSelector(
        (state) => state.circles
    );

    const [rows, setRows] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteId, setDeleteId] = useState(null);
    const [selectedCircle, setSelectedCircle] = useState(null);
    const [viewCircleData, setViewCircleData] = useState(null);
    const [editCircleData, setEditCircleData] = useState(null);


    // ============================
    // FETCH CIRCLES
    // ============================
    useEffect(() => {
        dispatch(getCircles({ page: currentPage, per_page: rows }));
    }, [dispatch, currentPage, rows]);

    // ============================
    // AUTO CLEAR SUCCESS / ERROR
    // ============================
    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => {
                dispatch(clearMessages());
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [success, error, dispatch]);

    // ============================
    // DELETE VENDOR
    // ============================
    const handleDelete = async () => {
        if (!deleteId) return;

        await dispatch(deleteCircle(deleteId));
        setDeleteId(null);
    };

    // ============================
    // TABLE COLUMNS
    // ============================
    const columns = [
        {
            header: "Circle Name",
            field: "circle_name",
            sortable: true,
            body: (rowData) => rowData?.circle_name || "-"
        },
        {
            header: "Circle Code",
            field: "circle_code",
            sortable: true,
            body: (rowData) => rowData?.circle_code || "-"
        },
        {
            header: "Created At",
            field: "created_at",
            sortable: true,
            body: (rowData) => rowData?.created_at || "-"

        },
        {
            header: "Actions",
            field: "actions",
            body: (rowData) => (
                <div className="action-table-data">
                    <div className="edit-delete-action">

                        {/* VIEW */}
                        <Link
                            className="me-2 p-2"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#view-circle-modal"
                            onClick={() => setViewCircleData(rowData)}
                        >
                            <i className="feather feather-eye action-eye"></i>
                        </Link>

                        {/* EDIT */}
                        <Link
                            className="me-2 p-2"
                            to="#"
                            onClick={() => {
                                setEditCircleData(rowData);
                                const modalEl = document.getElementById("edit-circle");
                                if (!modalEl) return;

                                const modal =
                                    Modal.getInstance(modalEl) || new Modal(modalEl);
                                modal.show();
                            }}
                        >
                            <i className="feather-edit"></i>
                        </Link>
                        {/* DELETE */}
                        <Link
                            className="confirm-text p-2"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#delete-circle-modal"
                            onClick={() => setDeleteId(Number(rowData.circle_id))}
                        >
                            <i className="feather-trash-2"></i>
                        </Link>

                    </div>
                </div>
            ),
            sortable: false,
        },
    ];

    return (
        <div>
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="add-item d-flex">
                            <div className="page-title">
                                <h4>Circles List</h4>
                                <h6>Manage Your Circles</h6>
                            </div>
                        </div>

                        <ul className="table-top-head">
                            <TooltipIcons />
                        </ul>

                        <div className="page-btn">
                            <Link
                                to="#"
                                className="btn btn-added"
                                onClick={() => {
                                    const modalEl = document.getElementById("add-circle");
                                    if (!modalEl) return;

                                    const modal =
                                        Modal.getInstance(modalEl) || new Modal(modalEl);
                                    modal.show();
                                }}
                            >
                                <i className="ti ti-circle-plus me-1"></i>
                                Add New Circle
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
                                    data={Array.isArray(circles) ? circles : []}
                                    totalRecords={totalRecords}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    rows={rows}
                                    setRows={setRows}
                                    selectionMode="checkbox"
                                    selection={selectedCircle}
                                    onSelectionChange={(e) => setSelectedCircle(e.value)}
                                    dataKey="circle_id"
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

            <AddCircle />
            <EditCircle selectedCircle={editCircleData} />
            <ViewCircle selectedCircle={viewCircleData} />

            {/* DELETE MODAL */}
            <div className="modal fade" id="delete-circle-modal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content p-5 px-3 text-center">
                                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                                    <i className="ti ti-trash fs-24 text-danger" />
                                </span>
                                <h4 className="fs-20 fw-bold mb-2 mt-1">Delete Circle</h4>
                                <p className="mb-0 fs-16">
                                    Are you sure you want to delete circle?
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

export default Circles;
