import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import PrimeDataTable from "../../components/data-table";

import { useDispatch, useSelector } from "react-redux";
import { clearMessages, deleteVehicleGeofence, getVehicleGeofences } from "../../core/redux/vehicleGeofenceSlice";
import EditGeofences from "../../core/modals/vehiclemanagement/editgeofences";
import ViewGeofences from "../../core/modals/vehiclemanagement/viewgeofences";
import AddGeofences from "../../core/modals/vehiclemanagement/addgeofences";


const VehicleGeofences = () => {
  const dispatch = useDispatch();

  const { geofences, loading, success, error } = useSelector(
    (state) => state.vehicleGeofences
  );

  const [rows, setRows] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedGeofence, setSelectedGeofence] = useState(null);
  const [viewGeofenceData, setViewGeofenceData] = useState(null);
  const [editGeofenceData, setEditGeofenceData] = useState(null);


  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(getVehicleGeofences({ page: currentPage, per_page: rows }));
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

    const res = await dispatch(deleteVehicleGeofence(deleteId));
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(getVehicleGeofences({ page: currentPage, per_page: rows }));
    }
    setDeleteId(null);
  };

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    {
      header: "Geofence ID",
      field: "geofence_id",
      sortable: true,
      body: (rowData) => rowData?.geofence_id || "-",
    },
    {
      header: "Point ID",
      field: "point_id",
      sortable: true,
      body: (rowData) => rowData?.point_id || "-",
    },
    {
      header: "Radius (Meters)",
      field: "radius_meters",
      sortable: true,
      body: (rowData) => rowData?.radius_meters || "-",
    },
    {
      header: "Status",
      field: "is_active",
      sortable: true,
      body: (rowData) =>
        rowData?.is_active === "1" ? "Active" : "Inactive",
    },
    {
      header: "Created At",
      field: "created_at",
      sortable: true,
      body: (rowData) => rowData?.created_at || "-",
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
              data-bs-target="#view-geofence-modal"
              onClick={() => setViewGeofenceData(rowData)}
            >
              <i className="feather feather-eye action-eye"></i>
            </Link>

            {/* EDIT */}
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-geofences"
              onClick={() => setEditGeofenceData(rowData)}
            >
              <i className="feather-edit"></i>
            </Link>

            {/* DELETE */}
            <Link
              className="confirm-text p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete-geofence-modal"
              onClick={() => setDeleteId(rowData.geofence_id)}
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
                <h4>Vehicle Geofences</h4>
                <h6>Manage Vehicle Geofences</h6>
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
                  data={Array.isArray(geofences) ? geofences : []}
                  totalRecords={geofences?.length || 0}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  rows={rows}
                  setRows={setRows}
                  selectionMode="checkbox"
                  selection={selectedGeofence}
                  onSelectionChange={(e) => setSelectedGeofence(e.value)}
                  dataKey="geofence_id"
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

      <AddGeofences />
      <EditGeofences selectedGeofence={editGeofenceData} />
      <ViewGeofences selectedGeofence={viewGeofenceData} />

      {/* DELETE MODAL */}
      <div className="modal fade" id="delete-geofence-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content p-5 px-3 text-center">
                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                  <i className="ti ti-trash fs-24 text-danger" />
                </span>
                <h4 className="fs-20 fw-bold mb-2 mt-1">
                  Delete Geofence
                </h4>
                <p className="mb-0 fs-16">
                  Are you sure you want to delete this geofence?
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

export default VehicleGeofences;
