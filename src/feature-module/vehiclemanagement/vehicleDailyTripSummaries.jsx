import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import PrimeDataTable from "../../components/data-table";

import { useDispatch, useSelector } from "react-redux";
import { clearMessages, deleteVehicleDailyTripSummary, getVehicleDailyTripSummaries } from "../../core/redux/vehicleDailyTripSummarySlice";
import AddDailyTripSummaries from "../../core/modals/vehiclemanagement/adddailytripsummaries";
import EditDailyTripSummaries from "../../core/modals/vehiclemanagement/editdailytripsummaries";
import ViewDailyTripSummaries from "../../core/modals/vehiclemanagement/viewdailytripsummaries";
import { Modal } from "bootstrap";
import { useTranslation } from "react-i18next";


const VehicleDailyTripSummaries = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { trips, loading, success, error } = useSelector(
    (state) => state.vehicleDailyTripSummaries
  );

  const [rows, setRows] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [viewTripData, setViewTripData] = useState(null);
  const [editTripData, setEditTripData] = useState(null);


  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(getVehicleDailyTripSummaries({ page: currentPage, per_page: rows }));
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

    const res = await dispatch(deleteVehicleDailyTripSummary(deleteId));
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(getVehicleDailyTripSummaries({ page: currentPage, per_page: rows }));
    }
    setDeleteId(null);
  };

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    {
      header: t("trip_date"),
      field: "trip_date",
      sortable: true,
      body: (row) => row?.trip_date || null,
    },
    {
      header: t("vehicle_id"),
      field: "vehicle_id",
      sortable: true,
      body: (row) => row?.vehicle_id || null,
    },
    {
      header: t("route_id"),
      field: "route_id",
      sortable: true,
      body: (row) => row?.route_id || null,
    },
    {
      header: t("start_time"),
      field: "start_time",
      body: (row) => row?.start_time || null,
    },
    {
      header: t("end_time"),
      field: "end_time",
      body: (row) => row?.end_time || null,
    },
    {
      header: t("distance"),
      field: "total_distance",
      sortable: true,
      body: (row) => row?.total_distance || null,
    },
    {
      header: t("completion"),
      field: "completion_percentage",
      sortable: true,
      body: (row) => `${row?.completion_percentage || 0}%`,
    },
    {
      header: t("status"),
      field: "trip_status",
      sortable: true,
      body: (row) => row?.trip_status || null,
    },
    {
      header: t("actions"),
      field: "actions",
      body: (row) => (
        <div className="action-table-data">
          <div className="edit-delete-action">

            {/* VIEW */}
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#view-daily-trip-summary"
              onClick={() => setViewTripData(row)}
            >
              <i className="feather feather-eye action-eye view-icon"></i>
            </Link>

            {/* EDIT */}
            <Link
              className="me-2 p-2"
              to="#"
              onClick={() => {
                setEditTripData(rowData);

                const modalEl = document.getElementById("edit-daily-trip-summary");
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
              data-bs-target="#delete-daily-trip-summary"
              onClick={() => setDeleteId(row.assignment_id)}
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
            <div className="page-title">
              <h4>{t("vehicle_daily_trip_summaries_list")}</h4>
              <h6>{t("manage_your_vehicle_daily_trip_summaries")}</h6>
            </div>
            <ul className="table-top-head">
              <TooltipIcons />
            </ul>
            <div className="page-btn">
              <Link
                to="#"
                className="btn btn-added"
                onClick={() => {
                  const modalEl = document.getElementById("add-daily-trip-summary");
                  if (!modalEl) return;

                  const modal =
                    Modal.getInstance(modalEl) || new Modal(modalEl);
                  modal.show();
                }}
              >
                <i className="ti ti-circle-plus me-1"></i>
                {t("add_new_vehicle_daily_trip_summary")}
              </Link>
            </div>
          </div>

          <div className="card table-list-card">
            <div className="card-body">

              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              <PrimeDataTable
                column={columns}
                data={Array.isArray(trips) ? trips : []}
                totalRecords={trips?.length || 0}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                rows={rows}
                setRows={setRows}
                selectionMode="checkbox"
                selection={selectedTrip}
                onSelectionChange={(e) => setSelectedTrip(e.value)}
                dataKey="assignment_id"
              />

              {loading && (
                <div className="text-center mt-3">
                  <div className="spinner-border text-primary"></div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      <AddDailyTripSummaries />
      <EditDailyTripSummaries selectedTrip={editTripData} />
      <ViewDailyTripSummaries selectedTrip={viewTripData} />

      {/* DELETE MODAL */}
      <div className="modal fade" id="delete-trip-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="content p-4 text-center">
              <h4>{t("delete_vehicle_daily_trip_summary")}</h4>
              <p>{t("Are_you_sure_you_want_to_delete_vehicle_daily_trip_summary?")}</p>
              <button
                className="btn btn-secondary me-2"
                data-bs-dismiss="modal"
              >
                {t("cancel")}
              </button>
              <button
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
  );
};

export default VehicleDailyTripSummaries;
