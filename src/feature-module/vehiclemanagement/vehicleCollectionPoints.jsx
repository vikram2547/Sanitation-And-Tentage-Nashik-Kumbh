import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import PrimeDataTable from "../../components/data-table";

import { useDispatch, useSelector } from "react-redux";
import { clearMessages, deleteVehicleCollectionPoint, getVehicleCollectionPoints } from "../../core/redux/vehicleCollectionPointSlice";
import ViewCollectionPoints from "../../core/modals/vehiclemanagement/viewcollectionpoints";
import AddCollectionPoint from "../../core/modals/vehiclemanagement/addcollectionpoint";
import EditCollectionPoint from "../../core/modals/vehiclemanagement/editcollectionpoint";


const VehicleCollectionPoints = () => {
  const dispatch = useDispatch();

  const { collectionPoints, loading, success, error } = useSelector(
    (state) => state.vehicleCollectionPoints
  );

  const [rows, setRows] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [viewPointData, setViewPointData] = useState(null);
  const [editPointData, seteditPointData] = useState(null);


  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(getVehicleCollectionPoints({ page: currentPage, per_page: rows }));
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

    const res = await dispatch(deleteVehicleCollectionPoint(deleteId));
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(getVehicleCollectionPoints({ page: currentPage, per_page: rows }));
    }
    setDeleteId(null);
  };

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    {
      header: "Point Code",
      field: "point_code",
      sortable: true,
      body: (rowData) => rowData?.point_code || "-",
    },
    {
      header: "Point Name",
      field: "point_name",
      sortable: true,
      body: (rowData) => rowData?.point_name || "-",
    },
    {
      header: "Latitude",
      field: "latitude",
      sortable: true,
      body: (rowData) => rowData?.latitude || "-",
    },
    {
      header: "Longitude",
      field: "longitude",
      sortable: true,
      body: (rowData) => rowData?.longitude || "-",
    },
    {
      header: "Point Type",
      field: "point_type",
      sortable: true,
      body: (rowData) => rowData?.point_type || "-",
    },
    {
      header: "Status",
      field: "status",
      sortable: true,
      body: (rowData) =>
        rowData?.status === "ACTIVE" ? "Active" : "Inactive",
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
              data-bs-target="#view-collection-point-modal"
              onClick={() => setViewPointData(rowData)}
            >
              <i className="feather feather-eye action-eye"></i>
            </Link>

            {/* EDIT */}
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-collection-point-modal"
              onClick={() => seteditPointData(rowData)}
            >
              <i className="feather-edit"></i>
            </Link>

            {/* DELETE */}
            <Link
              className="confirm-text p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete-collection-point-modal"
              onClick={() => setDeleteId(rowData.point_code)}
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
                <h4>Collection Points</h4>
                <h6>Manage Collection Points</h6>
              </div>
            </div>

            <ul className="table-top-head">
              <TooltipIcons />
               <div className="page-btn">
              <Link
                to="#"
                className="btn btn-added"
                data-bs-toggle="modal"
                data-bs-target="#add-collection-point-modal"
              >
                <i className="ti ti-circle-plus me-1"></i>
                Add Collection Point
              </Link>
            </div>
            </ul>
          </div>

          <div className="card table-list-card">
            <div className="card-body">

              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="table-responsive">
                <PrimeDataTable
                  column={columns}
                  data={Array.isArray(collectionPoints) ? collectionPoints : []}
                  totalRecords={collectionPoints?.length || 0}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  rows={rows}
                  setRows={setRows}
                  selectionMode="checkbox"
                  selection={selectedPoint}
                  onSelectionChange={(e) => setSelectedPoint(e.value)}
                  dataKey="point_code"
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

      {/* VIEW MODAL */}
      <AddCollectionPoint />
      <EditCollectionPoint selectedPoint={editPointData} />
      <ViewCollectionPoints selectedPoint={viewPointData} />

      {/* DELETE MODAL */}
      <div className="modal fade" id="delete-collection-point-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content p-5 px-3 text-center">
                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                  <i className="ti ti-trash fs-24 text-danger" />
                </span>
                <h4 className="fs-20 fw-bold mb-2 mt-1">
                  Delete Collection Point
                </h4>
                <p className="mb-0 fs-16">
                  Are you sure you want to delete this collection point?
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

export default VehicleCollectionPoints;
