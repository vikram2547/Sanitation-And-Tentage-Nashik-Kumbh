import React from "react";
import { useTranslation } from "react-i18next";

const ViewInspection = ({ selectedInspection }) => {
    const { t } = useTranslation();

    return (
        <div className="modal fade" id="view-inspection-modal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-md">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">{t("inspection_details")}</h5>
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
                                <strong>{t("allocation_id")}:</strong>
                                <div>{selectedInspection?.allocation_id}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>{t("asset_id")}:</strong>
                                <div>{selectedInspection?.asset_id}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>{t("shift_id")}:</strong>
                                <div>{selectedInspection?.shift_id}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>{t("compliance_score")}:</strong>
                                <div>{selectedInspection?.compliance_score}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>{t("latitude")}:</strong>
                                <div>{selectedInspection?.latitude}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>:{t("longitude")}:</strong>
                                <div>{selectedInspection?.longitude}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>{t("status")}:</strong>
                                <div>{selectedInspection?.overall_status}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>{t("notes")}:</strong>
                                <div>{selectedInspection?.notes || "-"}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>{t("data")}:</strong>
                                <div>{selectedInspection?.questions_answers_data}</div>
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

export default ViewInspection;