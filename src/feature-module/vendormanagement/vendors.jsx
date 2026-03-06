import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import PrimeDataTable from "../../components/data-table";

import {
    clearMessages,
    deleteVendor,
    getVendors,
} from "../../core/redux/vendorsSlice";
import AddVendor from "../../core/modals/vendormanagement/addvendor";
import EditVendor from "../../core/modals/vendormanagement/editvendor";
import ViewVendor from "../../core/modals/vendormanagement/viewvendor";
import { Modal } from "bootstrap";

const Vendors = () => {
    const dispatch = useDispatch();

    const { vendors, totalRecords, loading, error, success } = useSelector(
        (state) => state.vendors
    );

    const [rows, setRows] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteId, setDeleteId] = useState(null);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [viewVendorData, setViewVendorData] = useState(null);
    const [editVendorData, setEditVendorData] = useState(null);

    // ============================
    // FETCH VENDORS
    // ============================
    useEffect(() => {
        dispatch(getVendors({ page: currentPage, per_page: rows }));
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

        await dispatch(deleteVendor(deleteId));
        setDeleteId(null);
    };

    // ============================
    // TABLE COLUMNS
    // ============================
    const columns = [
        {
            header: "Vendor Code",
            field: "vendor_code",
            sortable: true,
        },
        {
            header: "Contact Person",
            field: "contact_person",
            sortable: true,
        },
        {
            header: "Email",
            field: "contact_email",
            sortable: true,
        },
        {
            header: "Phone",
            field: "contact_phone",
            sortable: true,
        },
         {
            header: "Address",
            field: "address",
            sortable: true,
        },
        {
            header: "Status",
            field: "status",
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
                            data-bs-target="#view-vendor-modal"
                            onClick={() => setViewVendorData(rowData)}
                        >
                            <i className="feather feather-eye action-eye"></i>
                        </Link>

                        {/* EDIT */}
                        <Link
                            className="me-2 p-2"
                            to="#"
                            onClick={() => {
                                setEditVendorData(rowData);
                                const modalEl = document.getElementById("edit-vendor");
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
                            data-bs-target="#delete-vendor-modal"
                            onClick={() => setDeleteId(Number(rowData.vendor_id))}
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
                                <h4>Vendor List</h4>
                                <h6>Manage Your Vendors</h6>
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
                                    const modalEl = document.getElementById("add-vendor");
                                    if (!modalEl) return;

                                    const modal =
                                        Modal.getInstance(modalEl) || new Modal(modalEl);
                                    modal.show();
                                }}
                            >
                                <i className="ti ti-circle-plus me-1"></i>
                                Add New Vendor
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
                                    data={Array.isArray(vendors) ? vendors : []}
                                    totalRecords={totalRecords}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    rows={rows}
                                    setRows={setRows}
                                    selectionMode="checkbox"
                                    selection={selectedVendor}
                                    onSelectionChange={(e) => setSelectedVendor(e.value)}
                                    dataKey="vendor_id"
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

            <AddVendor />
            <EditVendor selectedVendor={editVendorData} />
            <ViewVendor selectedVendor={viewVendorData} />

            {/* DELETE MODAL */}
            <div className="modal fade" id="delete-vendor-modal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content p-5 px-3 text-center">
                                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                                    <i className="ti ti-trash fs-24 text-danger" />
                                </span>
                                <h4 className="fs-20 fw-bold mb-2 mt-1">Delete Vendor</h4>
                                <p className="mb-0 fs-16">
                                    Are you sure you want to delete vendor?
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

export default Vendors;
