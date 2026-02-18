import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import PrimeDataTable from "../../components/data-table";

import { useDispatch, useSelector } from "react-redux";
import { clearMessages, deleteVehicleDailyTripSummary, getVehicleDailyTripSummaries } from "../../core/redux/vehicleDailyTripSummarySlice";
import AddDailyTripSummaries from "../../core/modals/vehiclemanagement/adddailytripsummaries";
import EditDailyTripSummaries from "../../core/modals/vehiclemanagement/editdailytripsummaries";
import ViewDailyTripSummaries from "../../core/modals/vehiclemanagement/viewdailytripsummaries";



const VehicleDailyTripSummaries = () => {
  const dispatch = useDispatch();

  const { trips, loading, success, error } = useSelector(
    (state) => state.dailyTripSummaries
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
      }, 5000);
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
      header: "Trip Date",
      field: "trip_date",
      sortable: true,
      body: (row) => row?.trip_date || "-",
    },
    {
      header: "Vehicle ID",
      field: "vehicle_id",
      sortable: true,
      body: (row) => row?.vehicle_id || "-",
    },
    {
      header: "Route ID",
      field: "route_id",
      sortable: true,
      body: (row) => row?.route_id || "-",
    },
    {
      header: "Start Time",
      field: "start_time",
      body: (row) => row?.start_time || "-",
    },
    {
      header: "End Time",
      field: "end_time",
      body: (row) => row?.end_time || "-",
    },
    {
      header: "Distance (km)",
      field: "total_distance",
      sortable: true,
      body: (row) => row?.total_distance || "-",
    },
    {
      header: "Completion %",
      field: "completion_percentage",
      sortable: true,
      body: (row) => `${row?.completion_percentage || 0}%`,
    },
    {
      header: "Status",
      field: "trip_status",
      sortable: true,
      body: (row) => row?.trip_status || "-",
    },
    {
      header: "Actions",
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
              <i className="feather feather-eye action-eye"></i>
            </Link>

            {/* EDIT */}
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-daily-trip-summary"
              onClick={() => setEditTripData(rowData)}
            >
              <i className="feather-edit"></i>
            </Link>


            {/* DELETE */}
            <Link
              className="confirm-text p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete-trip-modal"
              onClick={() => setDeleteId(row.assignment_id)}
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
            <div className="page-title">
              <h4>Daily Trip Summaries</h4>
              <h6>Vehicle Trip Performance</h6>
            </div>
            <ul className="table-top-head">
              <TooltipIcons />
            </ul>
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
              <h4>Delete Trip Summary</h4>
              <p>Are you sure you want to delete this trip?</p>
              <button
                className="btn btn-secondary me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
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
  );
};

export default VehicleDailyTripSummaries;
