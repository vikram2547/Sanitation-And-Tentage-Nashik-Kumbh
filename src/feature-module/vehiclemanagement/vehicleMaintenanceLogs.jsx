import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import PrimeDataTable from "../../components/data-table";

import { useDispatch, useSelector } from "react-redux";
import { clearMessages, deleteVehicleMaintenanceLog, getVehicleMaintenanceLogs } from "../../core/redux/vehicleMaintenanceLogSlice";
import AddMaintenanceLogs from "../../core/modals/vehiclemanagement/addmaintenancelogs";
import ViewMaintenanceLogs from "../../core/modals/vehiclemanagement/viewmaintenancelogs";
import EditMaintenanceLogs from "../../core/modals/vehiclemanagement/editmaintenancelogs";
import { Modal } from "bootstrap";
import { useTranslation } from "react-i18next";


const VehicleMaintenanceLogs = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { maintenanceLogs, loading, success, error } = useSelector(
    (state) => state.vehicleMaintenanceLogs
  );

  const [rows, setRows] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedLog, setSelectedLog] = useState(null);
  const [viewLogData, setViewLogData] = useState(null);
  const [editLogData, setEditLogData] = useState(null);


  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(getVehicleMaintenanceLogs({ page: currentPage, per_page: rows }));
  }, [dispatch, currentPage, rows]);

  /* ================= AUTO CLEAR ================= */
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    if (!deleteId) return;

    const res = await dispatch(deleteVehicleMaintenanceLog(deleteId));
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(getVehicleMaintenanceLogs({ page: currentPage, per_page: rows }));
    }
    setDeleteId(null);
  };

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    {
      header: t("maintenance_id"),
      field: "maintenance_id",
      sortable: true,
      body: (rowData) => rowData?.maintenance_id || "-",
    },
    {
      header: t("vehicle_id"),
      field: "vehicle_id",
      sortable: true,
      body: (rowData) => rowData?.vehicle_id || "-",
    },
    {
      header: t("maintenance_date"),
      field: "maintenance_date",
      sortable: true,
      body: (rowData) => rowData?.maintenance_date || "-",
    },
    {
      header: t("maintenance_type"),
      field: "maintenance_type",
      sortable: true,
      body: (rowData) => rowData?.maintenance_type || "-",
    },
    {
      header: t("cost"),
      field: "cost",
      sortable: true,
      body: (rowData) => rowData?.cost || "-",
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
              data-bs-target="#view-maintenance-modal"
              onClick={() => setViewLogData(rowData)}
            >
              <i className="feather feather-eye action-eye"></i>
            </Link>

            {/* EDIT */}
            <Link
              className="me-2 p-2"
              to="#"
              onClick={() => {
                setEditLogData(rowData);

                const modalEl = document.getElementById("edit-maintenance-log");
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
              data-bs-target="#delete-maintenance-modal"
              onClick={() => setDeleteId(rowData.maintenance_id)}
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
                <h4>{t("vehicle_maintenance_logs_list")}</h4>
                <h6>{t("manage_your_vehicle_maintenance_logs")}</h6>
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
                  const modalEl = document.getElementById("add-maintenance-modal");
                  if (!modalEl) return;

                  const modal =
                    Modal.getInstance(modalEl) || new Modal(modalEl);
                  modal.show();
                }}
              >
                <i className="ti ti-circle-plus me-1"></i>
                {t("add_new_vehicle_maintenance_log")}
              </Link>
            </div>
          </div>

          <div className="card table-list-card">
            <div className="card-body">

              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="table-responsive">
                <PrimeDataTable
                  column={columns}
                  data={Array.isArray(maintenanceLogs) ? maintenanceLogs : []}
                  totalRecords={maintenanceLogs?.length || 0}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  rows={rows}
                  setRows={setRows}
                  selectionMode="checkbox"
                  selection={selectedLog}
                  onSelectionChange={(e) => setSelectedLog(e.value)}
                  dataKey="maintenance_id"
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

      <AddMaintenanceLogs />
      <EditMaintenanceLogs selectedLog={editLogData} />
      <ViewMaintenanceLogs selectedLog={viewLogData} />

      {/* DELETE MODAL */}
      <div className="modal fade" id="delete-maintenance-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content p-5 px-3 text-center">
                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                  <i className="ti ti-trash fs-24 text-danger" />
                </span>
                <h4 className="fs-20 fw-bold mb-2 mt-1">
                  {t("delete_vehicle_maintenance_log")}
                </h4>
                <p className="mb-0 fs-16">
                  {t("Are_you_sure_you_want_to_delete_vehicle_maintenance_log?")}
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

export default VehicleMaintenanceLogs;
