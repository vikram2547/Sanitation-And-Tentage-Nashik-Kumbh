import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import PrimeDataTable from "../../components/data-table";
import { clearMessages, deleteSector, getSectors } from "../../core/redux/sectorSlice";
import AddSector from "../../core/modals/sectormanagement/addsector";
import EditSector from "../../core/modals/sectormanagement/editsector";
import ViewSector from "../../core/modals/sectormanagement/viewsector";
import { Modal } from "bootstrap";
import { useTranslation } from "react-i18next";
import { formatDateTime } from "../../utils/dateFormat";


const Sectors = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { sectors, totalRecords, loading, error, success } = useSelector(
        (state) => state.sectors
    );

    const [rows, setRows] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteId, setDeleteId] = useState(null);
    const [selectedSector, setSelectedSector] = useState(null);
    const [viewSectorData, setViewSectorData] = useState(null);
    const [editSectorData, setEditSectorData] = useState(null);

    // ============================
    // FETCH SECTORS
    // ============================
    useEffect(() => {
        dispatch(getSectors({ page: currentPage, per_page: rows }));
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

        await dispatch(deleteSector(deleteId));
        setDeleteId(null);
    };

    // ============================
    // TABLE COLUMNS
    // ============================
    const columns = [
        {
            header: t("sector_name"),
            field: "sector_name",
            sortable: true,
        },
        {
            header: t("sector_code"),
            field: "sector_code",
            sortable: true,
        },
        {
              header: t("created_at"),
              field: "created_at",
              sortable: true,
              body: (rowData) => formatDateTime(rowData.created_at),
            },
        {
            header: t("actions"),
            field: "actions",
            body: (rowData) => (
                <div className="action-table-data">
                    <div className="edit-delete-action">

                        {/* VIEW */}
                        <Link
                            className="me-2 p-2"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#view-sector-modal"
                            onClick={() => setViewSectorData(rowData)}
                        >
                            <i className="feather feather-eye action-eye"></i>
                        </Link>

                        {/* EDIT */}
                        <Link
                            className="me-2 p-2"
                            to="#"
                            onClick={() => {
                                setEditSectorData(rowData);
                                const modalEl = document.getElementById("edit-sector");
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
                            data-bs-target="#delete-sector-modal"
                            onClick={() => setDeleteId(Number(rowData.sector_id))}
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
                                <h4>{t("sector_list")}</h4>
                                <h6>{t("manage_your_sectors")}</h6>
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
                                    const modalEl = document.getElementById("add-sector");
                                    if (!modalEl) return;

                                    const modal =
                                        Modal.getInstance(modalEl) || new Modal(modalEl);
                                    modal.show();
                                }}
                            >
                                <i className="ti ti-circle-plus me-1"></i>
                                {t("add_new_sector")}
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
                                    data={Array.isArray(sectors) ? sectors : []}
                                    totalRecords={totalRecords}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    rows={rows}
                                    setRows={setRows}
                                    selectionMode="checkbox"
                                    selection={selectedSector}
                                    onSelectionChange={(e) => setSelectedSector(e.value)}
                                    dataKey="sector_id"
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

            <AddSector />
            <EditSector selectedSector={editSectorData} />
            <ViewSector selectedSector={viewSectorData} />

            {/* DELETE MODAL */}
            <div className="modal fade" id="delete-sector-modal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content p-5 px-3 text-center">
                                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                                    <i className="ti ti-trash fs-24 text-danger" />
                                </span>
                                <h4 className="fs-20 fw-bold mb-2 mt-1">{t("delete_sector")}</h4>
                                <p className="mb-0 fs-16">
                                    {t("Are_you_sure_you_want_to_delete_sector?")}
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

export default Sectors;
