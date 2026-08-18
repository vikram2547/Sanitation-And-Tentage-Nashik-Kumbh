import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import PrimeDataTable from "../../components/data-table";

import { useDispatch, useSelector } from "react-redux";
import { clearMessages, deleteVehicleRoutePoint, getVehicleRoutePoints } from "../../core/redux/vehicleRoutePointsSlice";
import AddRoutePoints from "../../core/modals/vehiclemanagement/addroutepoints";
import EditRoutePoints from "../../core/modals/vehiclemanagement/editroutepoints";
import ViewRoutePoints from "../../core/modals/vehiclemanagement/viewroutepoints";
import { Modal } from "bootstrap";
import { useTranslation } from "react-i18next";


const VehicleRoutePoints = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { routePoints, loading, success, error } = useSelector(
    (state) => state.vehicleRoutePoints
  );

  const [rows, setRows] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedRoutePoint, setSelectedRoutePoint] = useState(null);
  const [viewRoutePointData, setViewRoutePointData] = useState(null);
  const [editRoutePointData, setEditRoutePointData] = useState(null);


  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(getVehicleRoutePoints({ page: currentPage, per_page: rows }));
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

    const res = await dispatch(deleteVehicleRoutePoint(deleteId));
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(getVehicleRoutePoints({ page: currentPage, per_page: rows }));
    }
    setDeleteId(null);
  };

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    {
      header: t("route_point_id"),
      field: "route_point_id",
      sortable: true,
      body: (rowData) => rowData?.route_point_id || "-",
    },
    {
      header: t("route_id"),
      field: "route_id",
      sortable: true,
      body: (rowData) => rowData?.route_id || "-",
    },
    {
      header: t("point_id"),
      field: "point_id",
      sortable: true,
      body: (rowData) => rowData?.point_id || "-",
    },
    {
      header: t("sequence_number"),
      field: "sequence_number",
      sortable: true,
      body: (rowData) => rowData?.sequence_number || "-",
    },
    {
      header: t("arrival_time"),
      field: "estimated_arrival_time",
      sortable: true,
      body: (rowData) => rowData?.estimated_arrival_time || "-",
    },
    {
      header: t("stay_duration"),
      field: "expected_stay_duration",
      sortable: true,
      body: (rowData) => rowData?.expected_stay_duration || "-",
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
              data-bs-target="#view-route-point-modal"
              onClick={() => setViewRoutePointData(rowData)}
            >
              <i className="feather feather-eye action-eye view-icon"></i>
            </Link>

            {/* EDIT */}
            <Link
              className="me-2 p-2"
              to="#"
              onClick={() => {
                setEditRoutePointData(rowData);

                const modalEl = document.getElementById("edit-route-point-modal");
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
              data-bs-target="#delete-route-point-modal"
              onClick={() => setDeleteId(rowData.route_point_id)}
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
                <h4>{t("vehicle_route_point_list")}</h4>
                <h6>{t("manage_your_vehicle_route_points")}</h6>
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
                  const modalEl = document.getElementById("add-route-point-modal");
                  if (!modalEl) return;

                  const modal =
                    Modal.getInstance(modalEl) || new Modal(modalEl);
                  modal.show();
                }}
              >
                <i className="ti ti-circle-plus me-1"></i>
                {t("add_new_vehicle_route_point")}
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
                  data={Array.isArray(routePoints) ? routePoints : []}
                  totalRecords={routePoints?.length || 0}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  rows={rows}
                  setRows={setRows}
                  selectionMode="checkbox"
                  selection={selectedRoutePoint}
                  onSelectionChange={(e) => setSelectedRoutePoint(e.value)}
                  dataKey="route_point_id"
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

      <AddRoutePoints />
      <EditRoutePoints selectedRoutePoint={editRoutePointData} />
      <ViewRoutePoints selectedRoutePoint={viewRoutePointData} />

      {/* DELETE MODAL */}
      <div className="modal fade" id="delete-route-point-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content p-5 px-3 text-center">
                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                  <i className="ti ti-trash fs-24 text-danger" />
                </span>
                <h4 className="fs-20 fw-bold mb-2 mt-1">
                 {t("delete_vehicle_route_point")}
                </h4>
                <p className="mb-0 fs-16">
                  {t("Are_you_sure_you_want_to_delete_vehicle_route_point?")}
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

export default VehicleRoutePoints;
