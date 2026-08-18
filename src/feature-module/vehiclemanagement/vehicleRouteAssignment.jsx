import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import PrimeDataTable from "../../components/data-table";

import { useDispatch, useSelector } from "react-redux";
import { clearMessages, deleteVehicleRouteAssignment, getVehicleRouteAssignments } from "../../core/redux/vehicleRouteAssignmentSlice";
import AddRouteAssignment from "../../core/modals/vehiclemanagement/addrouteassignment";
import EditRouteAssignment from "../../core/modals/vehiclemanagement/editrouteassignment";
import ViewRouteAssignment from "../../core/modals/vehiclemanagement/viewrouteassignment";
import { Modal } from "bootstrap";
import { useTranslation } from "react-i18next";
import { formatDateTime } from "../../utils/dateFormat";


const VehicleRouteAssignment = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { assignments, loading, success, error, totalRecords } = useSelector(
    (state) => state.vehicleRouteAssignments
  );

  const [rows, setRows] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [viewAssignmentData, setViewAssignmentData] = useState(null);
  const [editAssignmentData, setEditAssignmentData] = useState(null);


  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(getVehicleRouteAssignments({ page: currentPage, per_page: rows }));
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

    const res = await dispatch(deleteVehicleRouteAssignment(deleteId));
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(getVehicleRouteAssignments({ page: currentPage, per_page: rows }));
    }
    setDeleteId(null);
  };

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    {
      header: t("assignment_id"),
      field: "assignment_id",
      sortable: true,
      body: (rowData) => rowData?.assignment_id || "-",
    },
    {
      header: t("vehicle_id"),
      field: "vehicle_id",
      sortable: true,
      body: (rowData) => rowData?.vehicle_id || "-",
    },
    {
      header: t("route_id"),
      field: "route_id",
      sortable: true,
      body: (rowData) => rowData?.route_id || "-",
    },
    {
      header: t("assignment_date"),
      field: "assignment_date",
      sortable: true,
      body: (rowData) => formatDateTime(rowData.assignment_date) || "-",
    },
    {
      header: t("shift"),
      field: "shift",
      sortable: true,
      body: (rowData) => rowData?.shift || "-",
    },
    {
      header: t("assignment_status"),
      field: "assignment_status",
      sortable: true,
      body: (rowData) => rowData?.assignment_status || "-",
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
              data-bs-target="#view-assignment-modal"
              onClick={() => setViewAssignmentData(rowData)}
            >
              <i className="feather feather-eye action-eye view-icon"></i>
            </Link>

            {/* EDIT */}
            <Link
              className="me-2 p-2"
              to="#"
              onClick={() => {
                setEditAssignmentData(rowData);

                const modalEl = document.getElementById("edit-assignment-modal");
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
              data-bs-target="#delete-assignment-modal"
              onClick={() => setDeleteId(rowData.assignment_id)}
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
                <h4>{t("vehicle_route_assignment_list")}</h4>
                <h6>{t("manage_your_vehicle_routes_assignments")}</h6>
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
                  const modalEl = document.getElementById("add-assignment-modal");
                  if (!modalEl) return;

                  const modal =
                    Modal.getInstance(modalEl) || new Modal(modalEl);
                  modal.show();
                }}
              >
                <i className="ti ti-circle-plus me-1"></i>
                {t("add_new_vehicle_route_assignment")}
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
                  data={Array.isArray(assignments) ? assignments : []}
                  totalRecords={assignments?.length || 0}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  rows={rows}
                  setRows={setRows}
                  selectionMode="checkbox"
                  selection={selectedAssignment}
                  onSelectionChange={(e) => setSelectedAssignment(e.value)}
                  dataKey="assignment_id"
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

      <AddRouteAssignment />
      <EditRouteAssignment selectedAssignment={editAssignmentData} />
      <ViewRouteAssignment selectedAssignment={viewAssignmentData} />

      {/* DELETE MODAL */}
      <div className="modal fade" id="delete-assignment-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content p-5 px-3 text-center">
                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                  <i className="ti ti-trash fs-24 text-danger" />
                </span>
                <h4 className="fs-20 fw-bold mb-2 mt-1">
                  {t("delete_vehicle_route-assignment")}
                </h4>
                <p className="mb-0 fs-16">
                  {t("Are_you_sure_you_want_to_delete_vehicle_route_assignment?")}
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

export default VehicleRouteAssignment;
