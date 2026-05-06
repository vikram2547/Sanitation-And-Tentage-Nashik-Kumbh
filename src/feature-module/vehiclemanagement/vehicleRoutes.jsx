import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import PrimeDataTable from "../../components/data-table";

import { useDispatch, useSelector } from "react-redux";
import { clearMessages, deleteVehicleRoute, getVehicleRoutes } from "../../core/redux/vehicleRouteSlice";
import AddRoute from "../../core/modals/vehiclemanagement/addroute";
import EditRoute from "../../core/modals/vehiclemanagement/editroute";
import ViewRoute from "../../core/modals/vehiclemanagement/viewroute";
import { Modal } from "bootstrap";
import { useTranslation } from "react-i18next";
import { formatDateTime } from "../../utils/dateFormat";


const VehicleRoutes = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
      }, 3000);
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
      header: t("route_id"),
      field: "route_id",
      sortable: true,
      body: (rowData) => rowData?.route_id || "-",
    },
    {
      header: t("route_code"),
      field: "route_code",
      sortable: true,
      body: (rowData) => rowData?.route_code || "-",
    },
    {
      header: t("route_name"),
      field: "route_name",
      sortable: true,
      body: (rowData) => rowData?.route_name || "-",
    },
    {
      header: t("zone"),
      field: "zone",
      sortable: true,
      body: (rowData) => rowData?.zone || "-",
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
      header: t("created_at"),
      field: "created_at",
      sortable: true,
      body: (rowData) => formatDateTime(rowData.created_at),
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
              data-bs-target="#view-route-modal"
              onClick={() => setViewRouteData(rowData)}
            >
              <i className="feather feather-eye action-eye"></i>
            </Link>

            {/* EDIT */}
            <Link
              className="me-2 p-2"
              to="#"
              onClick={() => {
                setEditRouteData(rowData);

                const modalEl = document.getElementById("edit-route-modal");
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
                <h4>{t("vehicle_routes_list")}</h4>
                <h6>{t("manage_your_vehicle_routes")}</h6>
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
                  const modalEl = document.getElementById("add-route-modal");
                  if (!modalEl) return;

                  const modal =
                    Modal.getInstance(modalEl) || new Modal(modalEl);
                  modal.show();
                }}
              >
                <i className="ti ti-circle-plus me-1"></i>
                {t("add_new_vehicle_route")}
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
                  {t("delete_vehicle_route")}
                </h4>
                <p className="mb-0 fs-16">
                  {t("Are_you_sure_you_want_to_delete_vehicle_route?")}
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

export default VehicleRoutes;
