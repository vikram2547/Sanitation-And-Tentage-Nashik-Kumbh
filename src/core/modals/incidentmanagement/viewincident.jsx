import React from "react";
import { useTranslation } from "react-i18next";

const ViewIncident = ({ selectedIncident }) => {
    const { t } = useTranslation();

    return (
        <div className="modal fade" id="view-incident-modal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-md">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">{t("incident_details")}</h5>
                        <button
                            type="button"
                            className="close"
                            data-bs-dismiss="modal"
                        >
                            <span>×</span>
                        </button>

                    </div>

                    <div className="modal-body">
                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <strong>{t("incident_id")}:</strong>
                                <div>{selectedIncident?.incident_id}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>{t("incident_code")}:</strong>
                                <div>{selectedIncident?.incident_code}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>{t("inspection_id")}:</strong>
                                <div>{selectedIncident?.inspection_id}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>{t("response_id")}:</strong>
                                <div>{selectedIncident?.response_id}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>{t("asset_id")}:</strong>
                                <div>{selectedIncident?.asset_id}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>{t("question_id")}:</strong>
                                <div>{selectedIncident?.question_id}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>{t("reported_by")}:</strong>
                                <div>{selectedIncident?.reported_by}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>{t("resolved_by")}:</strong>
                                <div>{selectedIncident?.resolved_by || "-"}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>{t("vendor_id")}:</strong>
                                <div>{selectedIncident?.vendor_id}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>{t("severity")}:</strong>
                                <div>{selectedIncident?.severity}</div>
                            </div>

                            <div className="col-md-12 mb-3">
                                <strong>{t("description")}:</strong>
                                <div>{selectedIncident?.description}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>{t("status")}:</strong>
                                <div>{selectedIncident?.incident_status}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>{t("due_date")}:</strong>
                                <div>{selectedIncident?.due_date || "-"}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>{t("resolved_date")}:</strong>
                                <div>{selectedIncident?.resolved_date || "-"}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>{t("closed_date")}:</strong>
                                <div>{selectedIncident?.closed_date || "-"}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>{t("created_at")}:</strong>
                                <div>{selectedIncident?.created_at}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>{t("updated_at")}:</strong>
                                <div>{selectedIncident?.updated_at}</div>
                            </div>

                        </div>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            {t("cancel")}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ViewIncident;