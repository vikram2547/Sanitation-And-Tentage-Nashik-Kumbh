import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import SearchFromApi from "../../components/data-table/search";
import PrimeDataTable from "../../components/data-table";

import { all_routes } from "../../routes/all_routes";
import {
  addRolePermission,
  updateRolePermission,
} from "../../core/redux/rolespermissionSlice";
/* ===========================
   FIXED MODULES
=========================== */
const MODULES = [
  "incident",
  "asset-tagging",
  "inspection",
  "allocation",
  "vendor",
  "asset",
  "asset-type",
  "question",
  "sector",
  "circle",
  "shift",
  "users",
  "user-permissions",
];

const buildInitialData = () =>
  MODULES.map((module) => ({
    module,
    read: false,
    create: false,
    write: false,
    delete: false,
  }));

const Permissions = () => {
  const dispatch = useDispatch();

  const [userTypeId, setUserTypeId] = useState("");
  const [listData, setListData] = useState(buildInitialData());
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const editData = location.state?.editData;
  const isEditMode = Boolean(editData);

  /* ===========================
     ✅ FIXED CHECKBOX HANDLER
     (IMMUTABLE UPDATE)
  =========================== */
  const handleCheckboxChange = (rowIndex, field, checked) => {
    setListData((prev) =>
      prev.map((row, index) =>
        index === rowIndex ? { ...row, [field]: checked } : row
      )
    );
  };

  /* ===========================
     SUBMIT HANDLER
  =========================== */
  const handleSubmit = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    if (!userTypeId) {
      setErrorMessage("Please enter User Type ID");
      return;
    }

    try {

      /* ================= EDIT ================= */
      if (isEditMode) {

        const selectedPermission = listData.find(
          (item) => item.module === editData.permission
        );

        const payload = {
          user_type_id: Number(userTypeId),
          permission: selectedPermission.module,
          can_create: selectedPermission.create ? 1 : 0,
          can_view: selectedPermission.read ? 1 : 0,
          can_edit: selectedPermission.write ? 1 : 0,
          can_delete: selectedPermission.delete ? 1 : 0,
        };

        await dispatch(
          updateRolePermission({
            permission_id: editData.permission_id,
            data: payload,
          })
        ).unwrap();

        setSuccessMessage("Permission updated successfully");

      }

      /* ================= ADD ================= */
      else {

        for (const row of listData) {

          const payload = {
            user_type_id: Number(userTypeId),
            permission: row.module,
            can_create: row.create ? 1 : 0,
            can_view: row.read ? 1 : 0,
            can_edit: row.write ? 1 : 0,
            can_delete: row.delete ? 1 : 0,
          };

          await dispatch(addRolePermission(payload)).unwrap();
        }

        setSuccessMessage("Permissions saved successfully");

        setListData(buildInitialData());
        setUserTypeId("");
      }

    } catch (error) {

      console.error(error);

      setErrorMessage(
        typeof error === "string"
          ? error
          : isEditMode
            ? "Failed to update permission"
            : "Failed to save permissions"
      );
    }
  };

  /* ===========================
     TABLE COLUMNS (UNCHANGED UI)
  =========================== */
  const columns = [
    {
      header: "Modules",
      field: "module",
      key: "module",
      body: (row) => <span className="text-gray-9">{row.module}</span>,
    },
    {
      header: "Read",
      body: (row, options) => (
        <input
          className="form-check-input"
          type="checkbox"
          checked={row.read}
          onChange={(e) =>
            handleCheckboxChange(options.rowIndex, "read", e.target.checked)
          }
        />
      ),
    },
    {
      header: "Create",
      body: (row, options) => (
        <input
          className="form-check-input"
          type="checkbox"
          checked={row.create}
          onChange={(e) =>
            handleCheckboxChange(options.rowIndex, "create", e.target.checked)
          }
        />
      ),
    },
    {
      header: "Edit",
      body: (row, options) => (
        <input
          className="form-check-input"
          type="checkbox"
          checked={row.write}
          onChange={(e) =>
            handleCheckboxChange(options.rowIndex, "write", e.target.checked)
          }
        />
      ),
    },
    {
      header: "Delete",
      body: (row, options) => (
        <input
          className="form-check-input"
          type="checkbox"
          checked={row.delete}
          onChange={(e) =>
            handleCheckboxChange(options.rowIndex, "delete", e.target.checked)
          }
        />
      ),
    },
  ];

  useEffect(() => {
    if (editData) {
      setUserTypeId(editData.user_type_id);

      setListData(
        MODULES.map((module) => {
          if (module === editData.permission) {
            return {
              module,
              read: Number(editData.can_view) === 1,
              create: Number(editData.can_create) === 1,
              write: Number(editData.can_edit) === 1,
              delete: Number(editData.can_delete) === 1,
            };
          }

          return {
            module,
            read: false,
            create: false,
            write: false,
            delete: false,
          };
        })
      );
    }
  }, [editData]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>
              {isEditMode ? "Edit Permission" : "Permission"}
            </h4>

            <h6>
              {isEditMode
                ? "Update permission"
                : "Manage your permissions"}
            </h6>
          </div>

          <div className="page-btn">
            <Link to={all_routes.rolespermission} className="btn btn-primary">
              Back to Roles
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            {/* SUCCESS MESSAGE */}
            {successMessage && (
              <div className="alert alert-success mb-3">
                {successMessage}
              </div>
            )}

            {/* ERROR MESSAGE */}
            {errorMessage && (
              <div className="alert alert-danger mb-3">
                {errorMessage}
              </div>
            )}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              {/* <SearchFromApi rows={rows} setRows={setRows} /> */}

              <div className="d-flex align-items-center gap-2">
                <label className="fw-medium mb-0">User Type ID:</label>
                <input
                  type="number"
                  className="form-control"
                  style={{ width: "120px" }}
                  value={userTypeId}
                  onChange={(e) => setUserTypeId(e.target.value)}
                  placeholder="Enter ID"
                />
              </div>
            </div>
          </div>

          <div className="card-body p-0">
            <PrimeDataTable
              column={columns}
              data={listData}
              rows={rows}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              dataKey="module"
            />
          </div>

          <div className="card-footer text-end">
            <button className="btn btn-success" onClick={handleSubmit}>
              {isEditMode ? "Update Permission" : "Save Permissions"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Permissions;