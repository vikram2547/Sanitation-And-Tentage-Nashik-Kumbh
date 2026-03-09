import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import PrimeDataTable from "../../components/data-table";

import {
  getSanitationAssets,
  deleteSanitationAsset,
  clearMessages,
} from "../../core/redux/sanitationAssetSlice";

import AddSanitationAsset from "../../core/modals/assettypemanagement/addSanitationAsset";
import EditSanitationAsset from "../../core/modals/assettypemanagement/editSanitationAsset";
import ViewSanitationAsset from "../../core/modals/assettypemanagement/viewSanitationAsset";
import { Modal } from "bootstrap";
import { useTranslation } from "react-i18next";


const SanitationAsset = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    sanitationAssets,
    totalRecords,
    loading,
    error,
    success,
  } = useSelector((state) => state.sanitationAssets);

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
    dispatch(getSanitationAssets({ page: currentPage, per_page: rows }));
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

    const res = await dispatch(deleteSanitationAsset(deleteId));

    if (res.meta.requestStatus === "fulfilled") {
      dispatch(getSanitationAssets({ page: currentPage, per_page: rows }));
    }

    setDeleteId(null);
  };

  // ============================
  // TABLE COLUMNS
  // ============================
  const columns = [
    {
      header: t("qr_code"),
      field: "qr_code",
      sortable: true,
      body: (rowData) => rowData?.qr_code || "-",
    },
    {
      header: t("asset_name"),
      field: "asset_name",
      sortable: true,
      body: (rowData) => rowData?.asset_name || "-",
    },
    {
      header: t("gender"),
      field: "gender",
      sortable: true,
      body: (rowData) => rowData?.gender || "-",
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
              data-bs-target="#view-sanitation-asset"
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

                const modalEl = document.getElementById("edit-sanitation-asset");
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
              data-bs-target="#delete-sanitation-asset-modal"
              onClick={() =>
                setDeleteId(Number(rowData.sanitation_asset_id))
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
                <h4>{t("sanitation_assets")}</h4>
                <h6>{t("manage_your_sanitation_assets")}</h6>
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
                  const modalEl = document.getElementById("add-sanitation-asset");
                  if (!modalEl) return;

                  const modal =
                    Modal.getInstance(modalEl) || new Modal(modalEl);
                  modal.show();
                }}
              >
                <i className="ti ti-circle-plus me-1"></i>
                {t("add_sanitation_asset")}
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
                  data={Array.isArray(sanitationAssets) ? sanitationAssets : []}
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
                  dataKey="sanitation_asset_id"
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
      <AddSanitationAsset />
      <EditSanitationAsset selectedAsset={editAssetData} />
      <ViewSanitationAsset selectedAsset={viewAssetData} />

      {/* ================= DELETE MODAL ================= */}
      <div className="modal fade" id="delete-sanitation-asset-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content p-5 px-3 text-center">
                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                  <i className="ti ti-trash fs-24 text-danger" />
                </span>
                <h4 className="fs-20 fw-bold mb-2 mt-1">
                  {t("delete_sanitation_asset")}
                </h4>
                <p className="mb-0 fs-16">
                  {t("Are_you_sure_you_want_to_delete_sanitation_asset?")}
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

export default SanitationAsset;
