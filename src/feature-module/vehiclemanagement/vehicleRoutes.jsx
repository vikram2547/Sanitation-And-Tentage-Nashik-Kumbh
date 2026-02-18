import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import PrimeDataTable from "../../components/data-table";

import { useDispatch, useSelector } from "react-redux";
import { clearMessages, deleteVehicleRoute, getVehicleRoutes } from "../../core/redux/vehicleRouteSlice";
import AddRoute from "../../core/modals/vehiclemanagement/addroute";
import EditRoute from "../../core/modals/vehiclemanagement/editroute";
import ViewRoute from "../../core/modals/vehiclemanagement/viewroute";



const VehicleRoutes = () => {
  const dispatch = useDispatch();

  const { vehicleRoutes, loading, success, error, totalRecords } =
    useSelector((state) => state.vehicleRoutes);


  const [rows, setRows] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [viewRouteData, setViewRouteData] = useState(null);
  const [editRouteData, setEditRouteData] = useState(null);


  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(getVehicleRoutes({ page: currentPage, per_page: rows }));
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

    const res = await dispatch(deleteVehicleRoute(deleteId));
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(getVehicleRoutes({ page: currentPage, per_page: rows }));
    }
    setDeleteId(null);
  };

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    {
      header: "Route ID",
      field: "route_id",
      sortable: true,
      body: (rowData) => rowData?.route_id || "-",
    },
    {
      header: "Route Code",
      field: "route_code",
      sortable: true,
      body: (rowData) => rowData?.route_code || "-",
    },
    {
      header: "Route Name",
      field: "route_name",
      sortable: true,
      body: (rowData) => rowData?.route_name || "-",
    },
    {
      header: "Zone",
      field: "zone",
      sortable: true,
      body: (rowData) => rowData?.zone || "-",
    },
    {
      header: "Status",
      field: "status",
      sortable: true,
      body: (rowData) => rowData?.status || "-",
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
              data-bs-target="#view-route-modal"
              onClick={() => setViewRouteData(rowData)}
            >
              <i className="feather feather-eye action-eye"></i>
            </Link>

            {/* EDIT */}
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-route-modal"
              onClick={() => setEditRouteData(rowData)}
            >
              <i className="feather-edit"></i>
            </Link>

            {/* DELETE */}
            <Link
              className="confirm-text p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete-route-modal"
              onClick={() => setDeleteId(rowData.route_id)}
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
                <h4>Routes</h4>
                <h6>Manage Routes</h6>
              </div>
            </div>

            <ul className="table-top-head">
              <TooltipIcons />
            </ul>
            <div className="page-btn">
              <Link
                to="#"
                className="btn btn-added"
                data-bs-toggle="modal"
                data-bs-target="#add-route-modal"
              >
                <i className="ti ti-circle-plus me-1"></i>
                Add Vehicle Route
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
                  data={Array.isArray(vehicleRoutes) ? vehicleRoutes : []}
                  totalRecords={vehicleRoutes?.length || 0}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  rows={rows}
                  setRows={setRows}
                  selectionMode="checkbox"
                  selection={selectedRoute}
                  onSelectionChange={(e) => setSelectedRoute(e.value)}
                  dataKey="route_id"
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

      <AddRoute />
      <EditRoute selectedRoute={editRouteData} />
      <ViewRoute selectedRoute={viewRouteData} />

      {/* DELETE MODAL */}
      <div className="modal fade" id="delete-route-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content p-5 px-3 text-center">
                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                  <i className="ti ti-trash fs-24 text-danger" />
                </span>
                <h4 className="fs-20 fw-bold mb-2 mt-1">
                  Delete Route
                </h4>
                <p className="mb-0 fs-16">
                  Are you sure you want to delete this route?
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

export default VehicleRoutes;
