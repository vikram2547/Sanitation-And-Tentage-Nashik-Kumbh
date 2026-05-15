import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { all_routes } from "../../routes/all_routes";
import PrimeDataTable from "../../components/data-table";
import SearchFromApi from "../../components/data-table/search";

import {
  getRolePermission,
  deleteRolePermission,
} from "../../core/redux/rolespermissionSlice";
import { useTranslation } from "react-i18next";


const RolesPermissions = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { permissions = [], totalRecords, loading } = useSelector(
    (state) => state.rolespermission
  );

  const [rows, setRows] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    dispatch(
      getRolePermission({
        page: currentPage,
        per_page: rows,
      })
    );
  }, [dispatch, currentPage, rows]);

  /* ================= COLUMNS ================= */
  const columns = [
    {
      header: t("permission_id"),
      field: "permission_id",
    },
    {
      header: t("permission"),
      field: "permission",
    },
    {
      header: t("create"),
      body: (row) => (
        <i
          className={`ti ${row.can_create ? "ti-check text-success" : "ti-x text-danger"
            }`}
        />
      ),
    },
    {
      header: t("view"),
      body: (row) => (
        <i
          className={`ti ${row.can_view ? "ti-check text-success" : "ti-x text-danger"
            }`}
        />
      ),
    },
    {
      header: t("edit"),
      body: (row) => (
        <i
          className={`ti ${row.can_edit ? "ti-check text-success" : "ti-x text-danger"
            }`}
        />
      ),
    },
    {
      header: t("delete"),
      body: (row) => (
        <i
          className={`ti ${row.can_delete ? "ti-check text-success" : "ti-x text-danger"
            }`}
        />
      ),
    },
    {
      header: t("actions"),
      body: (rowData) => (
        <div className="action-table-data">
          <div className="edit-delete-action">

            <Link
              to={all_routes.permissions}
              state={{ editData: rowData }}
              className="me-2 d-flex align-items-center p-2 border rounded"
            >
              <i className="ti ti-edit"></i>
            </Link>
            <Link
              className="confirm-text p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete-modal"
              onClick={() => setDeleteId(rowData.permission_id)}
            >
              <i className="feather-trash-2"></i>
            </Link>

          </div>
        </div>
      ),
    },
  ];

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    if (!deleteId) return;

    setSuccessMessage("");
    setErrorMessage("");

    try {
      await dispatch(deleteRolePermission(deleteId)).unwrap();

      setSuccessMessage("Permission deleted successfully");

      // Refresh table
      dispatch(
        getRolePermission({
          page: currentPage,
          per_page: rows,
        })
      );

      setDeleteId(null);

    } catch (error) {
      console.error(error);

      setErrorMessage(
        typeof error === "string"
          ? error
          : "Failed to delete permission"
      );
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>{t("role_and_permission")}</h4>
                <h6>{t("manage_your_roles")}</h6>
              </div>
            </div>

            {/* <TableTopHead /> */}

            <div className="page-btn">
              <Link
                to={all_routes.permissions}
                className="btn btn-primary"
              >
                <i className="feather icon-plus-circle me-2" />
                {t("add_role")}
              </Link>
            </div>
          </div>
          {/* SUCCESS MESSAGE */}
          {successMessage && (
            <div className="alert alert-success">
              {successMessage}
            </div>
          )}

          {/* ERROR MESSAGE */}
          {errorMessage && (
            <div className="alert alert-danger">
              {errorMessage}
            </div>
          )}
          <div className="card table-list-card">
            {/* <div className="card-header">
              <SearchFromApi rows={rows} setRows={setRows} />
            </div> */}

            <div className="card-body p-0">
              <div className="table-responsive">
                <PrimeDataTable
                  column={columns}
                  data={
                    Array.isArray(permissions)
                      ? permissions.map((item) => ({
                        ...item,
                        permission_id: Number(item.permission_id),
                        can_create: Number(item.can_create),
                        can_view: Number(item.can_view),
                        can_edit: Number(item.can_edit),
                        can_delete: Number(item.can_delete),
                      }))
                      : []
                  }
                  totalRecords={Number(totalRecords) || 0}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  rows={rows}
                  setRows={setRows}
                  selectionMode="checkbox"
                  selection={selectedRows}
                  onSelectionChange={(e) => setSelectedRows(e.value)}
                  dataKey="permission_id"
                  lazy={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* DELETE MODAL */}
      <div className="modal fade" id="delete-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content p-5 px-3 text-center">
                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                  <i className="ti ti-trash fs-24 text-danger" />
                </span>
                <h4 className="fs-20 fw-bold mb-2 mt-1">{t("delete_permission")}</h4>
                <p className="mb-0 fs-16">
                  {t("Are_you_sure_you_want_to_delete_permission?")}
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

export default RolesPermissions;