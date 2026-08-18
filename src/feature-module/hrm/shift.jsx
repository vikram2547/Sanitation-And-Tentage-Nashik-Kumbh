import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import PrimeDataTable from "../../components/data-table";
import AddShift from "../../core/modals/hrm/addshift";
import EditShift from "../../core/modals/hrm/editshift";
import { deleteShift, getShifts } from "../../core/redux/shiftSlice";
import ViewShift from "../../core/modals/hrm/viewshift";
import { useTranslation } from "react-i18next";


const Shift = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { shifts, totalRecords, loading, error, success } = useSelector(
    (state) => state.shifts
  );

  const [rows, setRows] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);
  const [viewShiftData, setViewShiftData] = useState(null);
  const [editShiftData, setEditShiftData] = useState(null);

  // ============================
  // FETCH SHIFTS
  // ============================
  useEffect(() => {
    dispatch(getShifts({ page: currentPage, per_page: rows }));
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
  // DELETE SHIFT
  // ============================
  const handleDelete = async () => {
    if (!deleteId) return;
    await dispatch(deleteShift(deleteId));
    setDeleteId(null);
  };

  // ============================
  // TABLE COLUMNS
  // ============================
  const columns = [
    {
       header: t("shift_name"),
      field: "shift_name",
      sortable: true,
      body: (rowData) => rowData?.shift_name || "-"
    },
    {
       header: t("start_time"),
      field: "start_time",
      sortable: true,
      body: (rowData) => rowData?.start_time || "-"
    },
    {
       header: t("end_time"),
      field: "end_time",
      sortable: true,
      body: (rowData) => rowData?.end_time || "-"
    },
    {
       header: t("status"),
      field: "is_active",
      body: (rowData) => (
        <div>
          {Number(rowData.is_active) === 1 ? (
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
              data-bs-target="#view-shift-modal"
              onClick={() => setViewShiftData(rowData)}
            >
              <i className="feather feather-eye action-eye view-icon"></i>
            </Link>

            {/* EDIT */}
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-shift"
              onClick={() => setEditShiftData(rowData)}
            >
              <i className="feather-edit edit-icon"></i>
            </Link>

            {/* DELETE */}
            <Link
              className="confirm-text p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete-shift-modal"
              onClick={() => setDeleteId(Number(rowData.shift_id))}
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
                <h4>{t("shifts_list")}</h4>
                <h6>{t("manage_your_shifts")}</h6>
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
                data-bs-target="#add-shift"
              >
                <i className="ti ti-circle-plus me-1"></i>
                {t("add_new_shift")}
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
                  data={Array.isArray(shifts) ? shifts : []}
                  totalRecords={totalRecords}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  rows={rows}
                  setRows={setRows}
                  selectionMode="checkbox"
                  selection={selectedShift}
                  onSelectionChange={(e) => setSelectedShift(e.value)}
                  dataKey="shift_id"
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

      <AddShift />
      <EditShift selectedShift={editShiftData} />
      <ViewShift selectedShift={viewShiftData} />

      {/* DELETE MODAL */}
      <div className="modal fade" id="delete-shift-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content p-5 px-3 text-center">
                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                  <i className="ti ti-trash fs-24 text-danger" />
                </span>
                <h4 className="fs-20 fw-bold mb-2 mt-1">{t("delete_shift")}</h4>
                <p className="mb-0 fs-16">
                  {t("Are_you_sure_you_want_to_delete_shift?")}
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

export default Shift;
