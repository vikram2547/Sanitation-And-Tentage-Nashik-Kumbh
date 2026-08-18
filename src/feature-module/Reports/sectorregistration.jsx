import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TooltipIcons from "../../components/tooltip-content/tooltipIcons";
import PrimeDataTable from "../../components/data-table";
import { useTranslation } from "react-i18next";
import CommonDateRangePicker from "../../components/date-range-picker/common-date-range-picker";
import CommonSelect from "../../components/select/common-select";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
    clearMessages,
    getSanitationRegistrationSectorWise,
} from "../../core/redux/sanitationRegistrationSectorWiseSlice";

const SectorRegistration = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const {
        sanitationRegistrationSectorWise,
        totalRecords,
        loading,
        error,
        success,
    } = useSelector((state) => state.sanitationRegistrationSectorWise);

    const [rows, setRows] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedSector, setSelectedSector] = useState(null);

    // ============================
    // FETCH DATA (same as Sectors)
    // ============================
    useEffect(() => {
        dispatch(
            getSanitationRegistrationSectorWise({
                page: currentPage,
                per_page: rows,
            })
        );
    }, [dispatch, currentPage, rows]);

    // ============================
    // CLEAR MESSAGES
    // ============================
    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => {
                dispatch(clearMessages());
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [success, error, dispatch]);

    // ============================
    // TABLE COLUMNS
    // ============================
    const columns = [
        {
            header: t("sector_id"),
            field: "sector_id",
            sortable: true,
        },
        {
            header: t("sector_name"),
            field: "sector_name",
            sortable: true,
        },
        {
            header: t("registration_count"),
            field: "registration_count",
            sortable: true,
        },
    ];

    // ============================
            // EXPORT TO EXCEL
            // ============================
            const exportToExcel = () => {
                if (!sanitationRegistrationSectorWise?.length) return;
        
                const worksheet = XLSX.utils.json_to_sheet(sanitationRegistrationSectorWise);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Sector Report");
        
                const excelBuffer = XLSX.write(workbook, {
                    bookType: "xlsx",
                    type: "array",
                });
        
                const fileData = new Blob([excelBuffer], {
                    type: "application/octet-stream",
                });
        
                saveAs(fileData, "Sector_Registration_Report.xlsx");
            };
        
            // ============================
            // EXPORT TO PDF
            // ============================
            const exportToPDF = () => {
                if (!sanitationRegistrationSectorWise?.length) return;
        
                const doc = new jsPDF();
        
                const tableColumn = ["Sector ID", "Sector Name", "Registration Count"];
        
                const tableRows = sanitationRegistrationSectorWise.map((item) => [
                    item.sector_id,
                    item.sector_name,
                    item.registration_count,
                ]);
        
                autoTable(doc, {
                    head: [tableColumn],
                    body: tableRows,
                });
        
                doc.save("Sector_Registration_Report.pdf");
            };
        

    return (
        <div>
            <div className="page-wrapper">
                <div className="content">

                    <div className="page-header">
                        <div className="add-item d-flex">
                            <div className="page-title">
                                <h4>{t("sector_wise_sanitation_registration_report")}</h4>
                                <h6>{t("manage_your_registration_report")}</h6>
                            </div>
                        </div>
                    </div>
                    <ul className="table-top-head">
                        <TooltipIcons />
                    </ul>

  <div className="card border-0">
                        <div className="card-body pb-1">
                            <form>
                                <div className="row align-items-end">
                                    <div className="col-lg-10">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Choose Date</label>
                                                    <div className="input-icon-start position-relative">
                                                        <CommonDateRangePicker />
                                                        <span className="input-icon-left">
                                                            <i className="ti ti-calendar" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Sector</label>
                                                    <CommonSelect
                                                        className="w-100"
                                                        // options={Store}
                                                        // value={selectedStore}
                                                        // onChange={(e) => setSelectedStore(e.value)}
                                                        placeholder="Choose"
                                                        filter={false} />
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="mb-3 d-flex flex-column gap-2">

                                            {/* <button className="btn btn-primary w-100" type="submit">
                                                Generate Report
                                            </button> */}

                                            <button
                                                type="button"
                                                className="btn btn-success w-100"
                                                onClick={exportToExcel}
                                            >
                                                {t("download_excel")}
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-orange w-100"
                                                onClick={exportToPDF}
                                            >
                                                {t("download_pdf")}
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="card table-list-card">
                        <div className="card-body">

                            {success && (
                                <div className="alert alert-success">{success}</div>
                            )}

                            {error && (
                                <div className="alert alert-danger">{error}</div>
                            )}

                            <div className="table-responsive">
                                <PrimeDataTable
                                    column={columns}
                                    data={Array.isArray(sanitationRegistrationSectorWise)
                                        ? sanitationRegistrationSectorWise
                                        : []}
                                    totalRecords={totalRecords}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    rows={rows}
                                    setRows={setRows}
                                    selectionMode="checkbox"
                                    selection={selectedSector}
                                    onSelectionChange={(e) => setSelectedSector(e.value)}
                                    dataKey="sector_id"
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
        </div>
    );
};

export default SectorRegistration;