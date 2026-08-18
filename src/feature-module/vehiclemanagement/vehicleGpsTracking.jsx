import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import PrimeDataTable from "../../components/data-table";

import { useDispatch, useSelector } from "react-redux";
import { clearMessages, deleteVehicleGpsTracking, getVehicleGpsTracking } from "../../core/redux/vehicleGpsTrackingSlice";
import AddGpsTracking from "../../core/modals/vehiclemanagement/addgpstracking";
import EditGpsTracking from "../../core/modals/vehiclemanagement/editgpstracking";
import ViewGpsTracking from "../../core/modals/vehiclemanagement/viewgpstracking";
import { Modal } from "bootstrap";
import { useTranslation } from "react-i18next";
import { formatDateTime } from "../../utils/dateFormat";


const VehicleGpsTracking = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();


  const { tracking, loading, success, error } = useSelector(
    (state) => state.vehicleGpsTracking
  );

  const [rows, setRows] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedGps, setSelectedGps] = useState(null);
  const [viewGpsData, setViewGpsData] = useState(null);
  const [editGpsData, setEditGpsData] = useState(null);


  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(clearMessages());
    dispatch(getVehicleGpsTracking({ page: currentPage, per_page: rows }));
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

    const res = await dispatch(deleteVehicleGpsTracking(deleteId));
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(getVehicleGpsTracking({ page: currentPage, per_page: rows }));
    }
    setDeleteId(null);
  };

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    {
      header: t("vehicle_id"),
      field: "vehicle_id",
      sortable: true,
      body: (rowData) => rowData?.vehicle_id || "-",
    },
    {
      header: t("assignment_id"),
      field: "assignment_id",
      sortable: true,
      body: (rowData) => rowData?.assignment_id || "-",
    },
    {
      header: t("latitude"),
      field: "latitude",
      sortable: true,
      body: (rowData) => rowData?.latitude || "-",
    },
    {
      header: t("longitude"),
      field: "longitude",
      sortable: true,
      body: (rowData) => rowData?.longitude || "-",
    },
    {
      header: t("speed"),
      field: "speed",
      sortable: true,
      body: (rowData) => rowData?.speed || "-",
    },
    {
      header: t("ignition"),
      field: "ignition_status",
      sortable: true,
      body: (rowData) => rowData?.ignition_status || "-",
    },
    {
      header: t("timestamp"),
      field: "timestamp",
      sortable: true,
      body: (rowData) => formatDateTime(rowData.timestamp) || "-",
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
              data-bs-target="#view-gps-modal"
              onClick={() => setViewGpsData(rowData)}
            >
              <i className="feather feather-eye action-eye view-icon"></i>
            </Link>

            {/* EDIT */}
            <Link
              className="me-2 p-2"
              to="#"
              onClick={() => {
                setEditGpsData(rowData);

                const modalEl = document.getElementById("edit-gps-modal");
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
              data-bs-target="#delete-gps-modal"
              onClick={() => setDeleteId(rowData.id)}
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
                <h4>{t("vehicle_gps_tracking_list")}</h4>
                <h6>{t("manage_your_vehicle_gps_trackings")}</h6>
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
                  const modalEl = document.getElementById("add-gps-modal");
                  if (!modalEl) return;

                  const modal =
                    Modal.getInstance(modalEl) || new Modal(modalEl);
                  modal.show();
                }}
              >
                <i className="ti ti-circle-plus me-1"></i>
                {t("add_new_vehicle_gps_tracking")}
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
                  data={Array.isArray(tracking) ? tracking : []}
                  totalRecords={tracking?.length || 0}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  rows={rows}
                  setRows={setRows}
                  selectionMode="checkbox"
                  selection={selectedGps}
                  onSelectionChange={(e) => setSelectedGps(e.value)}
                  dataKey="timestamp"
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

      <AddGpsTracking />
      <EditGpsTracking selectedGps={editGpsData} />
      <ViewGpsTracking selectedGps={viewGpsData} />

      {/* DELETE MODAL */}
      <div className="modal fade" id="delete-gps-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content p-5 px-3 text-center">
                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                  <i className="ti ti-trash fs-24 text-danger" />
                </span>
                <h4 className="fs-20 fw-bold mb-2 mt-1">
                  {t("delete_vehicle_gps_tracking")}
                </h4>
                <p className="mb-0 fs-16">
                  {t("Are_you_sure_you_want_to_delete_vehicle_gps_tracking?")}
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

export default VehicleGpsTracking;
