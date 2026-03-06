import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import PrimeDataTable from "../../components/data-table";

import { Modal } from "bootstrap";
import AddSanitationAssetTagging from "../../core/modals/assettypemanagement/addSanitationAssetTagging";
import { getSanitationAssetsTagging } from "../../core/redux/sanitationAssetTaggingSlice";


const SanitationAssetTagging = () => {
  const dispatch = useDispatch();
 const {
    sanitationAssetsTagging,
    totalRecords,
    loading,
    error,
    success,
  } = useSelector((state) => state.sanitationAssetsTagging);

  const [rows, setRows] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
//   const [deleteId, setDeleteId] = useState(null);
  const [selectedAssets, setSelectedAssets] = useState(null);
//   const [viewAssetData, setViewAssetData] = useState(null);
//   const [editAssetData, setEditAssetData] = useState(null);

  // ============================
  // FETCH SANITATION ASSETS
  // ============================
  useEffect(() => {
    dispatch(getSanitationAssetsTagging({ page: currentPage, per_page: rows }));
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
  // DELETE SANITATION ASSET
  // ============================
//   const handleDelete = async () => {
//     if (!deleteId) return;

//     const res = await dispatch(deleteSanitationAssetAllocation(deleteId));

//     if (res.meta.requestStatus === "fulfilled") {
//       dispatch(getSanitationAssetsAllocation({ page: currentPage, per_page: rows }));
//     }

//     setDeleteId(null);
//   };

  // ============================
  // TABLE COLUMNS
  // ============================
  const columns = [
    {
      header: "Asset Type ID",
      field: "asset_type_id",
      sortable: true,
      body: (rowData) => rowData?.asset_type_id || "-",
    },
    {
      header: "QR Code",
      field: "qr_code",
      sortable: true,
      body: (rowData) => rowData?.qr_code || "-",
    },
    {
      header: "Asset Name",
      field: "asset_name",
      sortable: true,
      body: (rowData) => rowData?.asset_name || "-",
    },
     {
      header: "Gender",
      field: "gender",
      sortable: true,
      body: (rowData) => rowData?.gender || "-",
    },
     {
      header: "Vendor ID",
      field: "vendor_id",
      sortable: true,
      body: (rowData) => rowData?.vendor_id || "-",
    },
    {
      header: "Sector ID",
      field: "sector_id",
      sortable: true,
      body: (rowData) => rowData?.sector_id || "-",
    },
    {
      header: "Circle ID",
      field: "circle_id",
      sortable: true,
      body: (rowData) => rowData?.circle_id || "-",
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
    // {
    //   header: "Actions",
    //   field: "actions",
    //   sortable: false,
    //   body: (rowData) => (
    //     <div className="action-table-data">
    //       <div className="edit-delete-action">

    //         {/* VIEW */}
    //         <Link
    //           className="me-2 p-2"
    //           to="#"
    //           data-bs-toggle="modal"
    //           data-bs-target="#view-sanitation-asset-allocation"
    //           onClick={() => setViewAssetData(rowData)}
    //         >
    //           <i className="feather feather-eye action-eye"></i>
    //         </Link>

    //         {/* EDIT */}
    //         <Link
    //           className="me-2 p-2"
    //           to="#"
    //           onClick={() => {
    //             setEditAssetData(rowData);

    //             const modalEl = document.getElementById("edit-sanitation-asset-allocation");
    //             if (!modalEl) return;

    //             const modal =
    //               Modal.getInstance(modalEl) || new Modal(modalEl);
    //             modal.show();
    //           }}
    //         >
    //           <i className="feather-edit"></i>
    //         </Link>

    //         {/* DELETE */}
    //         <Link
    //           className="confirm-text p-2"
    //           to="#"
    //           data-bs-toggle="modal"
    //           data-bs-target="#delete-sanitation-asset-allocation"
    //           onClick={() =>
    //             setDeleteId(Number(rowData.allocation_id))
    //           }
    //         >
    //           <i className="feather-trash-2"></i>
    //         </Link>

    //       </div>
    //     </div>
    //   ),
    // },
  ];

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">

          {/* ================= HEADER ================= */}
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Sanitation Assets Tagging</h4>
                <h6>Manage Sanitation Assets Tagging</h6>
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
                  const modalEl = document.getElementById("add-sanitation-asset-tagging");
                  if (!modalEl) return;

                  const modal =
                    Modal.getInstance(modalEl) || new Modal(modalEl);
                  modal.show();
                }}
              >
                <i className="ti ti-circle-plus me-1"></i>
                Add Sanitation Asset Tagging
              </Link>
            </div>
          </div>

          {/* ================= TABLE ================= */}
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
                  data={Array.isArray(sanitationAssetsTagging) ? sanitationAssetsTagging : []}
                  totalRecords={totalRecords}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  rows={rows}
                  setRows={setRows}
                  selectionMode="checkbox"
                  selection={selectedAssets}
                  onSelectionChange={(e) =>
                    setSelectedAssets(e.value)
                  }
                  dataKey="tagging_id"
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

      {/* ================= MODALS ================= */}
      <AddSanitationAssetTagging />
      {/* <EditSanitationAssetTagging selectedAsset={editAssetData} />
      <ViewSanitationAssetTagging selectedAsset={viewAssetData} /> */}

      {/* ================= DELETE MODAL ================= */}
      {/* <div className="modal fade" id="delete-sanitation-asset-tagging">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content p-5 px-3 text-center">
                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                  <i className="ti ti-trash fs-24 text-danger" />
                </span>
                <h4 className="fs-20 fw-bold mb-2 mt-1">
                  Delete Sanitation Asset Tagging
                </h4>
                <p className="mb-0 fs-16">
                  Are you sure you want to delete this sanitation asset tagging?
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
      </div> */}

    </div>
  );
};

export default SanitationAssetTagging;
