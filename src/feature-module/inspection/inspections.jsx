import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import PrimeDataTable from "../../components/data-table";
import { Modal } from "bootstrap";
import AddInspection from "../../core/modals/inspectionmanagement/addinspections";
import ViewInspection from "../../core/modals/inspectionmanagement/viewinspection";
import { clearMessages, deleteInspections, getInspections } from "../../core/redux/inspectionsSlice";
import { useTranslation } from "react-i18next";


const Inspections = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { inspections, totalRecords, loading, error, success } = useSelector(
        (state) => state.inspections
    );

    const [rows, setRows] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteId, setDeleteId] = useState(null);
    const [selectedInspection, setSelectedInspection] = useState(null);
    const [viewInspectionData, setViewInspectionData] = useState(null);
    // const [editInspectionData, setEditInspectionData] = useState(null);


    // ============================
    // FETCH INSPECTIONS
    // ============================
    useEffect(() => {
        dispatch(getInspections({ page: currentPage, per_page: rows }));
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

        await dispatch(deleteInspections(deleteId));
        setDeleteId(null);
    };

    // ============================
    // TABLE COLUMNS
    // ============================
    const columns = [
        {
            header: t("inspection_id"),
            field: "inspection_id",
            sortable: true,
            body: (rowData) => rowData?.inspection_id || "-"
        },
        {
            header: t("allocation_id"),
            field: "allocation_id",
            sortable: true,
            body: (rowData) => rowData?.allocation_id || "-"
        },
        {
            header: t("asset_id"),
            field: "asset_id",
            sortable: true,
            body: (rowData) => rowData?.asset_id || "-"
        },
        {
            header: t("shift_id"),
            field: "shift_id",
            sortable: true,
            body: (rowData) => rowData?.shift_id || "-"
        },
        {
            header: t("status"),
            field: "incident_status",
            body: (rowData) => (
                <div>
                    {rowData.status === "ACTIVE" ? (
                        <span className="d-inline-flex align-items-center p-1 pe-2 rounded-1 text-white bg-success fs-10">
                            <i className="ti ti-point-filled me-1 fs-11"></i>
                            Active
                        </span>
                    ) : (
                        <span className="d-inline-flex align-items-center p-1 pe-2 rounded-1 text-white bg-danger fs-10">
                            <i className="ti ti-point-filled me-1 fs-11"></i>
                            Inactive
                        </span>
                    )}
                </div>
            ),
            sortable: true,
        },
        // {
        //     header: "Actions",
        //     field: "actions",
        //     sortable: false,
        //     body: (rowData) => (
        //         <div className="action-table-data">
        //             <div className="edit-delete-action">

        //                 {/* VIEW */}
        //                 <Link
        //                     className="me-2 p-2"
        //                     to="#"
        //                     data-bs-toggle="modal"
        //                     data-bs-target="#view-inspection-modal"
        //                     onClick={() => setViewInspectionData(rowData)}
        //                 >
        //                     <i className="feather feather-eye action-eye"></i>
        //                 </Link>

        //                 {/* EDIT */}
        //                 <Link
        //                     className="me-2 p-2"
        //                     to="#"
        //                     onClick={() => {
        //                         setEditInspectionData(rowData);

        //                         const modalEl = document.getElementById("edit-inspection");
        //                         if (!modalEl) return;

        //                         const modal =
        //                             Modal.getInstance(modalEl) || new Modal(modalEl);
        //                         modal.show();
        //                     }}
        //                 >
        //                     <i className="feather-edit"></i>
        //                 </Link>

        //                 {/* DELETE */}
        //                 <Link
        //                     className="confirm-text p-2"
        //                     to="#"
        //                     data-bs-toggle="modal"
        //                     data-bs-target="#delete-inspection-modal"
        //                     onClick={() => setDeleteId(Number(rowData.inspection_id))}
        //                 >
        //                     <i className="feather-trash-2"></i>
        //                 </Link>

        //             </div>
        //         </div>
        //     ),
        // },
    ];

    return (
        <div>
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="add-item d-flex">
                            <div className="page-title">
                                <h4>{t("inspection_list")}</h4>
                                <h6>{t("manage_your_inspections")}</h6>
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
                                    const modalEl = document.getElementById("add-inspection");
                                    if (!modalEl) return;

                                    const modal =
                                        Modal.getInstance(modalEl) || new Modal(modalEl);
                                    modal.show();
                                }}
                            >
                                <i className="ti ti-circle-plus me-1"></i>
                               {t("add_new_inspection")}
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
                                    data={Array.isArray(inspections) ? inspections : []}
                                    totalRecords={totalRecords}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    rows={rows}
                                    setRows={setRows}
                                    selectionMode="checkbox"
                                    selection={selectedInspection}
                                    onSelectionChange={(e) => setSelectedInspection(e.value)}
                                    dataKey="inspection_id"
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

            <AddInspection />
            {/* <EditInspection selectedInspection={editInspectionData} /> */}
            <ViewInspection selectedInspection={viewInspectionData} />

            {/* DELETE MODAL */}
            <div className="modal fade" id="delete-inspection-modal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content p-5 px-3 text-center">
                                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                                    <i className="ti ti-trash fs-24 text-danger" />
                                </span>
                                <h4 className="fs-20 fw-bold mb-2 mt-1">{t("delete_inspection")}</h4>
                                <p className="mb-0 fs-16">
                                    {t("Are_you_sure_you_want_to_delete_inspection?")}
                                </p>
                                <div className="modal-footer-btn mt-3 d-flex justify-content-center">
                                    <button
                                        type="button"
                                        className="btn me-2 btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        {t("cancel")}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        data-bs-dismiss="modal"
                                        onClick={handleDelete}
                                    >
                                        {t("yes_delete")}
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

export default Inspections;
