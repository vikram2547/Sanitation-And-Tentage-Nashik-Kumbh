import React from "react";

const ViewIncident = ({ selectedIncident }) => {

    return (
        <div className="modal fade" id="view-incident-modal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-md">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Incident Details</h5>
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
                                <strong>Incident ID:</strong>
                                <div>{selectedIncident?.incident_id}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Incident Code:</strong>
                                <div>{selectedIncident?.incident_code}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Inspection ID:</strong>
                                <div>{selectedIncident?.inspection_id}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Response ID:</strong>
                                <div>{selectedIncident?.response_id}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Asset ID:</strong>
                                <div>{selectedIncident?.asset_id}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Question ID:</strong>
                                <div>{selectedIncident?.question_id}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Reported By:</strong>
                                <div>{selectedIncident?.reported_by}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Resolved By:</strong>
                                <div>{selectedIncident?.resolved_by || "-"}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Vendor ID:</strong>
                                <div>{selectedIncident?.vendor_id}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Severity:</strong>
                                <div>{selectedIncident?.severity}</div>
                            </div>

                            <div className="col-md-12 mb-3">
                                <strong>Description:</strong>
                                <div>{selectedIncident?.description}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Incident Status:</strong>
                                <div>{selectedIncident?.incident_status}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Due Date:</strong>
                                <div>{selectedIncident?.due_date || "-"}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Resolved Date:</strong>
                                <div>{selectedIncident?.resolved_date || "-"}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Closed Date:</strong>
                                <div>{selectedIncident?.closed_date || "-"}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Created At:</strong>
                                <div>{selectedIncident?.created_at}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Updated At:</strong>
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
                            Close
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ViewIncident;