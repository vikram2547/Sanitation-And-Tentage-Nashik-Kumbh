
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddUsers from "../../core/modals/usermanagement/addusers";
import EditUser from "../../core/modals/usermanagement/edituser";
import ViewUser from "../../core/modals/usermanagement/viewuser";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import RefreshIcon from "../../components/tooltip-content/refresh";
import CollapesIcon from "../../components/tooltip-content/collapes";
import PrimeDataTable from "../../components/data-table";
import { clearMessages, deleteUser, getUsers } from "../../core/redux/usersSlice";



const Users = () => {
  const dispatch = useDispatch();

  const { users, totalRecords, loading, error, success } = useSelector(
    (state) => state.users
  );

  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [editUserData, setEditUserData] = useState(null);
  const [viewUserData, setViewUserData] = useState(null);

  // ============================
  // FETCH USERS
  // ============================
  useEffect(() => {
    dispatch(getUsers({ page: currentPage, per_page: rows }));
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
  // DELETE USER
  // ============================
  const handleDelete = async () => {
    if (!deleteId) return;

    await dispatch(deleteUser(deleteId));
    setDeleteId(null);
  };


  // ============================
  // TABLE COLUMNS
  // ============================
  const columns = [
    {
      header: "User Name",
      field: "full_name",
      sortable: true,
    },
    {
      header: "Phone",
      field: "phone",
      sortable: true,
    },
    {
      header: "Email",
      field: "email",
      sortable: true,
    },
    {
      header: "Created On",
      field: "created_at",
      sortable: true,
    },
    {
      header: "Status",
      field: "is_active",
      body: (rowData) => (
        <div>
          {rowData.is_active === 1 ? (
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
      header: "Actions",
      field: "actions",
      body: (rowData) => (
        <div className="action-table-data">
          <div className="edit-delete-action">
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#view-user-modal"
              onClick={() => setViewUserData(rowData)}
            >
              <i className="feather feather-eye action-eye"></i>
            </Link>

            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-units"
              // onClick={() => setEditUserData(rowData)}
              onClick={() => {
                console.log("EDIT CLICK ROW:", rowData);
                setEditUserData(rowData);
              }}
            >
              <i className="feather-edit"></i>
            </Link>


            <Link
              className="confirm-text p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete-modal"
              onClick={() => setDeleteId(Number(rowData.user_id))}
            >
              <i className="feather-trash-2"></i>
            </Link>
          </div>
        </div>
      ),
      sortable: false,
    },
  ];

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>User List</h4>
                <h6>Manage Your Users</h6>
              </div>
            </div>

            <ul className="table-top-head">
              <TooltipIcons />
              <RefreshIcon />
              <CollapesIcon />
            </ul>

            <div className="page-btn">
              <Link
                to="#"
                className="btn btn-added"
                data-bs-toggle="modal"
                data-bs-target="#add-units"
              >
                <i className="ti ti-circle-plus me-1"></i>
                Add New User
              </Link>
            </div>
          </div>

          <div className="card table-list-card">
            <div className="card-body">

              {/* SUCCESS MESSAGE */}
              {success && (
                <div className="alert alert-success">{success}</div>
              )}

              {/* ERROR MESSAGE */}
              {error && (
                <div className="alert alert-danger">{error}</div>
              )}

              <div className="table-responsive">
                <PrimeDataTable
                  column={columns}
                  data={Array.isArray(users) ? users : []}
                  totalRecords={totalRecords}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  rows={rows}
                  setRows={setRows}
                  selectionMode="checkbox"
                  selection={selectedUsers}
                  onSelectionChange={(e) => setSelectedUsers(e.value)}
                  dataKey="user_id"
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

      <AddUsers />
      <EditUser selectedUser={editUserData} />
      <ViewUser selectedUser={viewUserData} />

      {/* DELETE MODAL */}
      <div className="modal fade" id="delete-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content p-5 px-3 text-center">
                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                  <i className="ti ti-trash fs-24 text-danger" />
                </span>
                <h4 className="fs-20 fw-bold mb-2 mt-1">Delete User</h4>
                <p className="mb-0 fs-16">
                  Are you sure you want to delete user?
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

export default Users;
