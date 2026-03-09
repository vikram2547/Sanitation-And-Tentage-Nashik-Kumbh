import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import PrimeDataTable from "../../components/data-table";
import { Modal } from "bootstrap";
import { clearMessages, deleteIncidents, getIncidents } from "../../core/redux/incidentsSlice";
import AddIncident from "../../core/modals/incidentmanagement/addincidents";
import EditIncident from "../../core/modals/incidentmanagement/editincident";
import ViewIncident from "../../core/modals/incidentmanagement/viewincident";
import { useTranslation } from "react-i18next";

const Incidents = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { incidents, totalRecords, loading, error, success } = useSelector(
        (state) => state.incidents
    );

    const [rows, setRows] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteId, setDeleteId] = useState(null);
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [viewIncidentData, setViewIncidentData] = useState(null);
    const [editIncidentData, setEditIncidentData] = useState(null);


    // ============================
    // FETCH INCIDENTS
    // ============================
    useEffect(() => {
        dispatch(getIncidents({ page: currentPage, per_page: rows }));
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

        await dispatch(deleteIncidents(deleteId));
        setDeleteId(null);
    };

    // ============================
    // TABLE COLUMNS
    // ============================
    const columns = [
        {
            header: t("incident_id"),
            field: "incident_id",
            sortable: true,
            body: (rowData) => rowData?.incident_id || "-"
        },
        {
            header: t("incident_code"),
            field: "incident_code",
            sortable: true,
            body: (rowData) => rowData?.incident_code || "-"
        },
        {
            header: t("description"),
            field: "description",
            sortable: true,
            body: (rowData) => rowData?.description || "-"
        },
        {
            header: t("severity"),
            field: "severity",
            sortable: true,
            body: (rowData) => rowData?.severity || "-"
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
        {
            header: t("actions"),
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
                            data-bs-target="#view-incident-modal"
                            onClick={() => setViewIncidentData(rowData)}
                        >
                            <i className="feather feather-eye action-eye"></i>
                        </Link>

                        {/* EDIT */}
                        <Link
                            className="me-2 p-2"
                            to="#"
                            onClick={() => {
                                setEditIncidentData(rowData);

                                const modalEl = document.getElementById("edit-incident");
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
                            data-bs-target="#delete-incident-modal"
                            onClick={() => setDeleteId(Number(rowData.incident_id))}
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
                                <h4>{t("incidents_list")}</h4>
                                <h6>{t("manage_your_incidents")}</h6>
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
                                    const modalEl = document.getElementById("add-incident");
                                    if (!modalEl) return;

                                    const modal =
                                        Modal.getInstance(modalEl) || new Modal(modalEl);
                                    modal.show();
                                }}
                            >
                                <i className="ti ti-circle-plus me-1"></i>
                                {t("add_new_incident")}
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
                                    data={Array.isArray(incidents) ? incidents : []}
                                    totalRecords={totalRecords}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    rows={rows}
                                    setRows={setRows}
                                    selectionMode="checkbox"
                                    selection={selectedIncident}
                                    onSelectionChange={(e) => setSelectedIncident(e.value)}
                                    dataKey="incident_id"
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

            <AddIncident />
            <EditIncident selectedIncident={editIncidentData} />
            <ViewIncident selectedIncident={viewIncidentData} />

            {/* DELETE MODAL */}
            <div className="modal fade" id="delete-incident-modal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content p-5 px-3 text-center">
                                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                                    <i className="ti ti-trash fs-24 text-danger" />
                                </span>
                                <h4 className="fs-20 fw-bold mb-2 mt-1">{t("delete_incident")}</h4>
                                <p className="mb-0 fs-16">
                                    {t("Are_you_sure_you_want_to_delete_incident?")}
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
                                        className="btn btn-primary"
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

export default Incidents;
