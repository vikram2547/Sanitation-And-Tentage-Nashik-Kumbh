import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import PrimeDataTable from "../../components/data-table";
import { clearMessages, deleteAssetType, getAssetTypes } from "../../core/redux/assettypeSlice";
import AddAssetType from "../../core/modals/assettypemanagement/addassettype";
import EditAssetType from "../../core/modals/assettypemanagement/editassettype";
import ViewAssetType from "../../core/modals/assettypemanagement/viewassettype";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";


const AssetType = () => {
    const dispatch = useDispatch();

    const { assetTypes, totalRecords, loading, error, success } = useSelector(
        (state) => state.assetTypes
    );

    const [rows, setRows] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteId, setDeleteId] = useState(null);
    const [selectedAssetType, setSelectedAssetType] = useState(null);
    const [viewAssetTypeData, setViewAssetTypeData] = useState(null);
    const [editAssetTypeData, setEditAssetTypeData] = useState(null);

    // ============================
    // FETCH ASSET TYPES
    // ============================
    useEffect(() => {
        dispatch(getAssetTypes({ page: currentPage, per_page: rows }));
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
    // DELETE ASSET TYPE
    // ============================
    const handleDelete = async () => {
        if (!deleteId) return;

        const res = await dispatch(deleteAssetType(deleteId));

        if (res.meta.requestStatus === "fulfilled") {
            dispatch(getAssetTypes({ page: currentPage, per_page: rows }));
        }

        setDeleteId(null);
    };

    // ============================
    // TABLE COLUMNS
    // ============================
    const columns = [
        {
            header: "Asset Type",
            field: "type",
            sortable: true,
            body: (rowData) => rowData?.type || "-",
        },
        {
            header: "Name",
            field: "name",
            sortable: true,
            body: (rowData) => rowData?.name || "-",
        },
        {
            header: "Description",
            field: "description",
            sortable: false,
            body: (rowData) => rowData?.description || "-",
        },
        {
            header: "Questions",
            field: "questions",
            sortable: false,
            body: (rowData) => rowData?.questions || "0",
        },
        {
            header: "Status",
            field: "status",
            body: (rowData) => (
                <div>
                    {Number(rowData.status) === 1 ?(
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
                            data-bs-target="#view-assettype-modal"
                            onClick={() => setViewAssetTypeData(rowData)}
                        >
                            <i className="feather feather-eye action-eye"></i>
                        </Link>

                        {/* EDIT */}
                        <Link
                            className="me-2 p-2"
                            to="#"
                            onClick={() => {
                                setEditAssetTypeData(rowData);

                                const modalEl = document.getElementById("edit-assettype");
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
                            data-bs-target="#delete-assettype-modal"
                            onClick={() =>
                                setDeleteId(Number(rowData.asset_type_id))
                            }
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
                                <h4>Asset Types</h4>
                                <h6>Manage Asset Types</h6>
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
                                    const modalEl = document.getElementById("add-assettype");
                                    if (!modalEl) return;

                                    const modal =
                                        Modal.getInstance(modalEl) || new Modal(modalEl);
                                    modal.show();
                                }}
                            >
                                <i className="ti ti-circle-plus me-1"></i>
                                Add Asset Type
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
                                    data={Array.isArray(assetTypes) ? assetTypes : []}
                                    totalRecords={totalRecords}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    rows={rows}
                                    setRows={setRows}
                                    selectionMode="checkbox"
                                    selection={selectedAssetType}
                                    onSelectionChange={(e) =>
                                        setSelectedAssetType(e.value)
                                    }
                                    dataKey="asset_type_id"
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

            {/* MODALS */}
            <AddAssetType />
            <EditAssetType selectedAssetType={editAssetTypeData} />
            <ViewAssetType selectedAssetType={viewAssetTypeData} />

            {/* DELETE MODAL */}
            <div className="modal fade" id="delete-assettype-modal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content p-5 px-3 text-center">
                                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                                    <i className="ti ti-trash fs-24 text-danger" />
                                </span>
                                <h4 className="fs-20 fw-bold mb-2 mt-1">
                                    Delete Asset Type
                                </h4>
                                <p className="mb-0 fs-16">
                                    Are you sure you want to delete asset type?
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

export default AssetType;
