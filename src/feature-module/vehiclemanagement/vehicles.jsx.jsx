import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import PrimeDataTable from "../../components/data-table";

import { useDispatch, useSelector } from "react-redux";
import { clearMessages, deleteVehicle, getVehicles } from "../../core/redux/vehicleSlice";
import AddVehicle from "../../core/modals/vehiclemanagement/addvehicle";
import EditVehicle from "../../core/modals/vehiclemanagement/editvehicle";
import ViewVehicle from "../../core/modals/vehiclemanagement/viewvehicle";

const Vehicles = () => {
  const dispatch = useDispatch();

  const { vehicles, loading, success, error } = useSelector(
    (state) => state.vehicles
  );

  const [rows, setRows] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [viewVehicleData, setViewVehicleData] = useState(null);
  const [editVehicleData, setEditVehicleData] = useState(null);

  // ============================
  // FETCH VEHICLES
  // ============================
  useEffect(() => {
    dispatch(getVehicles({ page: currentPage, per_page: rows }));
  }, [dispatch, currentPage, rows]);

  // ============================
  // AUTO CLEAR SUCCESS / ERROR
  // ============================
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  // ============================
  // DELETE VEHICLE
  // ============================
  const handleDelete = async () => {
    if (!deleteId) return;

    const res = await dispatch(deleteVehicle(deleteId));

    if (res.meta.requestStatus === "fulfilled") {
      dispatch(getVehicles({ page: currentPage, per_page: rows }));
    }

    setDeleteId(null);
  };

  // ============================
  // TABLE COLUMNS
  // ============================
  const columns = [
    {
      header: "Name",
      field: "vehicle_name",
      sortable: true,
      body: (rowData) => rowData?.vehicle_name || "-",
    },
    {
      header: "Type",
      field: "vehicle_type",
      sortable: true,
      body: (rowData) => rowData?.vehicle_type || "-",
    },
    {
      header: "Number",
      field: "vehicle_number",
      sortable: true,
      body: (rowData) => rowData?.vehicle_number || "-",
    },
    {
      header: "Vendor",
      field: "vendor_id",
      sortable: true,
      body: (rowData) => rowData?.vendor_id || "-",
    },
    {
      header: "Status",
      field: "status",
      sortable: true,
      body: (rowData) =>
        rowData?.status === "Active" ? "Active" : "Inactive",
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
              data-bs-target="#view-vehicle"
              onClick={() => setViewVehicleData(rowData)}
            >
              <i className="feather feather-eye action-eye"></i>
            </Link>

            {/* EDIT */}
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-vehicle"
              onClick={() => setEditVehicleData(rowData)}
            >
              <i className="feather-edit"></i>
            </Link>

            {/* DELETE */}
            <Link
              className="confirm-text p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete-vehicle-modal"
              onClick={() => setDeleteId(rowData.vehicle_id)}
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
                <h4>Vehicles</h4>
                <h6>Manage Vehicles</h6>
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
                data-bs-target="#add-vehicle"
              >
                <i className="ti ti-circle-plus me-1"></i>
                Add Vehicle
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
                  data={Array.isArray(vehicles) ? vehicles : []}
                  totalRecords={vehicles?.length || 0}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  rows={rows}
                  setRows={setRows}
                  selectionMode="checkbox"
                  selection={selectedVehicle}
                  onSelectionChange={(e) => setSelectedVehicle(e.value)}
                  dataKey="vehicle_id"
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
      <AddVehicle />
      <EditVehicle selectedVehicle={editVehicleData} />
      <ViewVehicle selectedVehicle={viewVehicleData} />

      {/* DELETE MODAL */}
      <div className="modal fade" id="delete-vehicle-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content p-5 px-3 text-center">
                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                  <i className="ti ti-trash fs-24 text-danger" />
                </span>
                <h4 className="fs-20 fw-bold mb-2 mt-1">
                  Delete Vehicle
                </h4>
                <p className="mb-0 fs-16">
                  Are you sure you want to delete this vehicle?
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

export default Vehicles;
