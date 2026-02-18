import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import PrimeDataTable from "../../components/data-table";

import { useDispatch, useSelector } from "react-redux";
import { clearMessages, deleteVehicleMaintenanceLog, getVehicleMaintenanceLogs } from "../../core/redux/vehicleMaintenanceLogSlice";
import AddMaintenanceLogs from "../../core/modals/vehiclemanagement/addmaintenancelogs";
import ViewMaintenanceLogs from "../../core/modals/vehiclemanagement/viewmaintenancelogs";
import EditMaintenanceLogs from "../../core/modals/vehiclemanagement/editmaintenancelogs";


const VehicleMaintenanceLogs = () => {
  const dispatch = useDispatch();

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
      }, 5000);
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
      header: "Maintenance ID",
      field: "maintenance_id",
      sortable: true,
      body: (rowData) => rowData?.maintenance_id || "-",
    },
    {
      header: "Vehicle ID",
      field: "vehicle_id",
      sortable: true,
      body: (rowData) => rowData?.vehicle_id || "-",
    },
    {
      header: "Maintenance Date",
      field: "maintenance_date",
      sortable: true,
      body: (rowData) => rowData?.maintenance_date || "-",
    },
    {
      header: "Type",
      field: "maintenance_type",
      sortable: true,
      body: (rowData) => rowData?.maintenance_type || "-",
    },
    {
      header: "Cost",
      field: "cost",
      sortable: true,
      body: (rowData) => rowData?.cost || "-",
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
              data-bs-target="#view-maintenance-modal"
              onClick={() => setViewLogData(rowData)}
            >
              <i className="feather feather-eye action-eye"></i>
            </Link>

            {/* EDIT */}
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-maintenance-log"
              onClick={() => setEditLogData(rowData)}
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
                <h4>Vehicle Maintenance Logs</h4>
                <h6>Manage Vehicle Maintenance</h6>
              </div>
            </div>

            <ul className="table-top-head">
              <TooltipIcons />
            </ul>
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
                  Delete Maintenance Log
                </h4>
                <p className="mb-0 fs-16">
                  Are you sure you want to delete this maintenance log?
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

export default VehicleMaintenanceLogs;
