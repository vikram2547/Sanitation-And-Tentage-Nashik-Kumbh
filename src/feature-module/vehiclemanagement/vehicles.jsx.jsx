import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import PrimeDataTable from "../../components/data-table";

import { useDispatch, useSelector } from "react-redux";
import { clearMessages, deleteVehicle, getVehicles } from "../../core/redux/vehicleSlice";
import AddVehicle from "../../core/modals/vehiclemanagement/addvehicle";
import EditVehicle from "../../core/modals/vehiclemanagement/editvehicle";
import ViewVehicle from "../../core/modals/vehiclemanagement/viewvehicle";
import { Modal } from "bootstrap";
import { useTranslation } from "react-i18next";


const Vehicles = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
    dispatch(clearMessages());
  }, [dispatch]);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);

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
      header: t("vehicle_name"),
      field: "vehicle_name",
      sortable: true,
      body: (rowData) => rowData?.vehicle_name || "-",
    },
    {
      header: t("vehicle_type"),
      field: "vehicle_type",
      sortable: true,
      body: (rowData) => rowData?.vehicle_type || "-",
    },
    {
      header: t("vehicle_number"),
      field: "vehicle_number",
      sortable: true,
      body: (rowData) => rowData?.vehicle_number || "-",
    },
    {
      header: t("vendor_id"),
      field: "vendor_id",
      sortable: true,
      body: (rowData) => rowData?.vendor_id || "-",
    },
    {
      header: t("status"),
      field: "status",
      body: (rowData) => (
        <div>
          {rowData.status === "Active" ? (
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
              data-bs-target="#view-vehicle-modal"
              onClick={() => setViewVehicleData(rowData)}
            >
              <i className="feather feather-eye action-eye view-icon"></i>
            </Link>

            {/* EDIT */}
            <Link
              className="me-2 p-2"
              to="#"
              onClick={() => {
                setEditVehicleData(rowData);

                const modalEl = document.getElementById("edit-vehicle");
                if (!modalEl) return;

                const modal =
                  Modal.getInstance(modalEl) || new Modal(modalEl);
                modal.show();
              }}
            >
              <i className="feather-edit edit-icon"></i>
            </Link>

            {/* DELETE */}
            <Link
              className="confirm-text p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete-vehicle-modal"
              onClick={() => setDeleteId(rowData.vehicle_id)}
            >
              <i className="feather-trash-2 delete-icon"></i>
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
                <h4>{t("vehicles_list")}</h4>
                <h6>{t("manage_your_vehicles")}</h6>
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
                  const modalEl = document.getElementById("add-vehicle");
                  if (!modalEl) return;

                  const modal =
                    Modal.getInstance(modalEl) || new Modal(modalEl);
                  modal.show();
                }}
              >
                <i className="ti ti-circle-plus me-1"></i>
                {t("add_new_vehicle")}
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
                  {t("delete_vehicle")}
                </h4>
                <p className="mb-0 fs-16">
                  {t("Are_you_sure_you_want_to_delete_vehicle?")}
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
                    className="btn btn-danger"
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

export default Vehicles;
