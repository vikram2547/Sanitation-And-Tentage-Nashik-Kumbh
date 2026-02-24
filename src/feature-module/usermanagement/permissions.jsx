import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import SearchFromApi from "../../components/data-table/search";
import PrimeDataTable from "../../components/data-table";

import { all_routes } from "../../routes/all_routes";
import { addRolePermission } from "../../core/redux/rolespermissionSlice";

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
  const handleSubmit = () => {
    if (!userTypeId) {
      alert("Please enter User Type ID");
      return;
    }

    const payload = listData.map((row) => ({
      user_type_id: Number(userTypeId),
      permission: row.module.toUpperCase(),
      can_create: row.create ? 1 : 0,
      can_view: row.read ? 1 : 0,
      can_edit: row.write ? 1 : 0,
      can_delete: row.delete ? 1 : 0,
    }));

    dispatch(addRolePermission(payload));
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

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Permission</h4>
            <h6>Manage your permissions</h6>
          </div>

          <div className="page-btn">
            <Link to={all_routes.rolespermission} className="btn btn-primary">
              Back to Roles
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <SearchFromApi rows={rows} setRows={setRows} />

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
            <button className="btn btn-primary" onClick={handleSubmit}>
              Save Permissions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Permissions;