import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import PrimeDataTable from "../../components/data-table";

import { useDispatch, useSelector } from "react-redux";
import { clearMessages, deleteVehiclePerformanceMetric, getVehiclePerformanceMetrics } from "../../core/redux/vehiclePerformanceMetricSlice";
import AddPerformanceMetrics from "../../core/modals/vehiclemanagement/addperformancemetrics";
import EditPerformanceMetrics from "../../core/modals/vehiclemanagement/editperformancemetrics";
import ViewPerformanceMetrics from "../../core/modals/vehiclemanagement/viewperformancemetrics";
import { Modal } from "bootstrap";
import { useTranslation } from "react-i18next";



const VehiclePerformanceMetrics = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { metrics, loading, success, error } = useSelector(
    (state) => state.vehiclePerformanceMetrics
  );

  const [rows, setRows] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [viewMetricData, setViewMetricData] = useState(null);
  const [editMetricData, setEditMetricData] = useState(null);


  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(getVehiclePerformanceMetrics({ page: currentPage, per_page: rows }));
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

    const res = await dispatch(deleteVehiclePerformanceMetric(deleteId));
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(getVehiclePerformanceMetrics({ page: currentPage, per_page: rows }));
    }
    setDeleteId(null);
  };

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    {
      header: t("point_id"),
      field: "metric_id",
      sortable: true,
      body: (rowData) => rowData?.metric_id || "-",
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
      header: t("metric_date"),
      field: "metric_date",
      sortable: true,
      body: (rowData) => rowData?.metric_date || "-",
    },
    {
      header: t("metric_type"),
      field: "metric_type",
      sortable: true,
      body: (rowData) => rowData?.metric_type || "-",
    },
    {
      header: t("metric_value"),
      field: "metric_value",
      sortable: true,
      body: (rowData) => rowData?.metric_value || "-",
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
              data-bs-target="#view-metric-modal"
              onClick={() => setViewMetricData(rowData)}
            >
              <i className="feather feather-eye action-eye"></i>
            </Link>

            {/* EDIT */}
            <Link
              className="me-2 p-2"
              to="#"
              onClick={() => {
                setEditMetricData(rowData);

                const modalEl = document.getElementById("edit-metric-modal");
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
              data-bs-target="#delete-metric-modal"
              onClick={() => setDeleteId(rowData.metric_id)}
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
                <h4>{t("vehicle_performance_metrics_list")}</h4>
                <h6>{t("manage_your_vehicle_performance_metrics")}</h6>
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
                  const modalEl = document.getElementById("add-metric-modal");
                  if (!modalEl) return;

                  const modal =
                    Modal.getInstance(modalEl) || new Modal(modalEl);
                  modal.show();
                }}
              >
                <i className="ti ti-circle-plus me-1"></i>
                {t("add_new_vehicle_performance_metric")}
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
                  data={Array.isArray(metrics) ? metrics : []}
                  totalRecords={metrics?.length || 0}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  rows={rows}
                  setRows={setRows}
                  selectionMode="checkbox"
                  selection={selectedMetric}
                  onSelectionChange={(e) => setSelectedMetric(e.value)}
                  dataKey="metric_id"
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

      <AddPerformanceMetrics />
      <EditPerformanceMetrics selectedMetric={editMetricData} />
      <ViewPerformanceMetrics selectedMetric={viewMetricData} />

      {/* DELETE MODAL */}
      <div className="modal fade" id="delete-metric-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content p-5 px-3 text-center">
                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                  <i className="ti ti-trash fs-24 text-danger" />
                </span>
                <h4 className="fs-20 fw-bold mb-2 mt-1">
                 {t("delete_vehicle_performance_metrics")}
                </h4>
                <p className="mb-0 fs-16">
                  {t("Are_you_sure_you_want_to_delete_vehicle_performance_metrics?")}
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

export default VehiclePerformanceMetrics;
