import React from "react";

const ViewInspection = ({ selectedInspection }) => {

    return (
        <div className="modal fade" id="view-inspection-modal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-md">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Inspection Details</h5>
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
                                <strong>Allocation ID:</strong>
                                <div>{selectedInspection?.allocation_id}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Asset ID:</strong>
                                <div>{selectedInspection?.asset_id}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Shift ID:</strong>
                                <div>{selectedInspection?.shift_id}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Compliance Score:</strong>
                                <div>{selectedInspection?.compliance_score}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Latitude:</strong>
                                <div>{selectedInspection?.latitude}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>:Longitude:</strong>
                                <div>{selectedInspection?.longitude}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Status:</strong>
                                <div>{selectedInspection?.overall_status}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Notes:</strong>
                                <div>{selectedInspection?.notes || "-"}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Data:</strong>
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
                            Close
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ViewInspection;