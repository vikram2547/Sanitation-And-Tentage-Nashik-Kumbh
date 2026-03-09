import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import PrimeDataTable from "../../components/data-table";

import { Modal } from "bootstrap";
import { useTranslation } from "react-i18next";
import { clearMessages, deleteSanitationAssetAllocation, getSanitationAssetsAllocation } from "../../core/redux/sanitationAssetAllocationSlice";
import AddSanitationAssetAllocation from "../../core/modals/assettypemanagement/addSanitationAssetAllocation";
import EditSanitationAssetAllocation from "../../core/modals/assettypemanagement/editSanitationAssetAllocation";
import ViewSanitationAssetAllocation from "../../core/modals/assettypemanagement/viewSanitationAssetAllocation";

const SanitationAssetAllocation = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

 const {
    sanitationAssetsAllocation,
    totalRecords,
    loading,
    error,
    success,
  } = useSelector((state) => state.sanitationAssetsAllocation);

  const [rows, setRows] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedAssets, setSelectedAssets] = useState(null);
  const [viewAssetData, setViewAssetData] = useState(null);
  const [editAssetData, setEditAssetData] = useState(null);

  // ============================
  // FETCH SANITATION ASSETS
  // ============================
  useEffect(() => {
    dispatch(getSanitationAssetsAllocation({ page: currentPage, per_page: rows }));
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
  const handleDelete = async () => {
    if (!deleteId) return;

    const res = await dispatch(deleteSanitationAssetAllocation(deleteId));

    if (res.meta.requestStatus === "fulfilled") {
      dispatch(getSanitationAssetsAllocation({ page: currentPage, per_page: rows }));
    }

    setDeleteId(null);
  };

  // ============================
  // TABLE COLUMNS
  // ============================
  const columns = [
    {
      header: t("allocation_id"),
      field: "allocation_id",
      sortable: true,
      body: (rowData) => rowData?.allocation_id || "-",
    },
    {
      header: t("asset_id"),
      field: "asset_id",
      sortable: true,
      body: (rowData) => rowData?.asset_id || "-",
    },
    {
      header: t("swachhagrahi_id"),
      field: "swachhagrahi_id",
      sortable: true,
      body: (rowData) => rowData?.swachhagrahi_id || "-",
    },
     {
      header: t("allocated_by"),
      field: "allocated_by",
      sortable: true,
      body: (rowData) => rowData?.allocated_by || "-",
    },
     {
      header: t("allocated_date"),
      field: "allocation_date",
      sortable: true,
      body: (rowData) => rowData?.allocation_date || "-",
    },
    {
      header: t("status"),
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
              data-bs-target="#view-sanitation-asset-allocation"
              onClick={() => setViewAssetData(rowData)}
            >
              <i className="feather feather-eye action-eye"></i>
            </Link>

            {/* EDIT */}
            <Link
              className="me-2 p-2"
              to="#"
              onClick={() => {
                setEditAssetData(rowData);

                const modalEl = document.getElementById("edit-sanitation-asset-allocation");
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
              data-bs-target="#delete-sanitation-asset-allocation"
              onClick={() =>
                setDeleteId(Number(rowData.allocation_id))
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

          {/* ================= HEADER ================= */}
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>{t("sanitation_assets_allocation")}</h4>
                <h6>{t("manage_your_sanitation_assets_allocation")}</h6>
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
                  const modalEl = document.getElementById("add-sanitation-asset-allocation");
                  if (!modalEl) return;

                  const modal =
                    Modal.getInstance(modalEl) || new Modal(modalEl);
                  modal.show();
                }}
              >
                <i className="ti ti-circle-plus me-1"></i>
                {t("add_sanitation_asset_allocation")}
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
                  data={Array.isArray(sanitationAssetsAllocation) ? sanitationAssetsAllocation : []}
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
                  dataKey="allocation_id"
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
      <AddSanitationAssetAllocation />
      <EditSanitationAssetAllocation selectedAsset={editAssetData} />
      <ViewSanitationAssetAllocation selectedAsset={viewAssetData} />

      {/* ================= DELETE MODAL ================= */}
      <div className="modal fade" id="delete-sanitation-asset-allocation">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content p-5 px-3 text-center">
                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                  <i className="ti ti-trash fs-24 text-danger" />
                </span>
                <h4 className="fs-20 fw-bold mb-2 mt-1">
                  {t("delete_sanitation_asset_allocation")}
                </h4>
                <p className="mb-0 fs-16">
                  {t("Are_you_sure_you_want_to_delete_sanitation_asset_allocation?")}
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

export default SanitationAssetAllocation;
