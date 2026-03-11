import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { addInspections } from "../../redux/inspectionsSlice";
import { useTranslation } from "react-i18next";


const AddInspection = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { success, error, loading } = useSelector(
        (state) => state.inspections
    );

    /* ================= FORM STATE ================= */
    const [formData, setFormData] = useState({
        allocation_id: null,
        asset_id: null,
        shift_id: null,
        compliance_score: null,
        notes: "",
        latitude: null,
        longitude: null,
        overall_status: "",
        questions_answers_data: "",
    });

    /* ================= HANDLE CHANGE ================= */
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value === "" ? null : value,
        }));
    };

    /* ================= SUBMIT ================= */
    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
            addInspections({
                allocation_id: formData.allocation_id
                    ? Number(formData.allocation_id)
                    : null,
                asset_id: formData.asset_id
                    ? Number(formData.asset_id)
                    : null,
                shift_id: formData.shift_id
                    ? Number(formData.shift_id)
                    : null,
                compliance_score: formData.compliance_score
                    ? Number(formData.compliance_score)
                    : null,
                notes: formData.notes,
                latitude: formData.latitude
                    ? Number(formData.latitude)
                    : null,
                longitude: formData.longitude
                    ? Number(formData.longitude)
                    : null,
                overall_status: formData.overall_status,
                questions_answers_data: formData.questions_answers_data,
            })
        );
    };

    /* ================= SUCCESS FLOW ================= */
    useEffect(() => {
        if (!success) return;

        const modalEl = document.getElementById("add-inspection");
        if (modalEl) {
            const modalInstance =
                Modal.getInstance(modalEl) || new Modal(modalEl);
            modalInstance.hide();
        }

        setFormData({
            allocation_id: null,
            asset_id: null,
            shift_id: null,
            compliance_score: null,
            notes: "",
            latitude: null,
            longitude: null,
            overall_status: "",
            questions_answers_data: "",
        });
    }, [success]);

    /* ================= AUTO CLEAR MESSAGE ================= */
    useEffect(() => {
        if (!success && !error) return;

        const timer = setTimeout(() => {
            dispatch(clearMessages());
        }, 3000);

        return () => clearTimeout(timer);
    }, [success, error, dispatch]);

    return (
        <div className="modal fade" id="add-inspection" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered custom-modal-two">
                <div className="modal-content">
                    <div className="page-wrapper-new p-0">
                        <div className="content">

                            <div className="modal-header border-0 custom-modal-header">
                                <div className="page-title">
                                    <h4>{t("add_new_inspection")}</h4>
                                </div>
                                <button type="button" className="close" data-bs-dismiss="modal">
                                    <span>×</span>
                                </button>
                            </div>

                            <div className="modal-body custom-modal-body">

                                {error && <div className="alert alert-danger">{error}</div>}
                                {success && (
                                    <div className="alert alert-success">
                                        {t("created_successfully")}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="row">

                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>{t("allocation_id")}</label>
                                                <input
                                                    type="number"
                                                    name="allocation_id"
                                                    value={formData.allocation_id ?? ""}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>{t("asset_id")}</label>
                                                <input
                                                    type="number"
                                                    name="asset_id"
                                                    value={formData.asset_id ?? ""}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>{t("shift_id")}</label>
                                                <input
                                                    type="number"
                                                    name="shift_id"
                                                    value={formData.shift_id ?? ""}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>{t("compliance_score")}</label>
                                                <input
                                                    type="number"
                                                    name="compliance_score"
                                                    value={formData.compliance_score ?? ""}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>{t("latitude")}</label>
                                                <input
                                                    type="number"
                                                    name="latitude"
                                                    value={formData.latitude ?? ""}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>{t("longitude")}</label>
                                                <input
                                                    type="number"
                                                    name="longitude"
                                                    value={formData.longitude ?? ""}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="input-blocks">
                                                <label>{t("notes")}</label>
                                                <input
                                                    type="text"
                                                    name="notes"
                                                    value={formData.notes}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="input-blocks">
                                                <label>{t("status")}</label>
                                                <input
                                                    type="text"
                                                    name="overall_status"
                                                    value={formData.overall_status}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="input-blocks">
                                                <label>{t("questions_answers_data")}</label>
                                                <input
                                                    type="text"
                                                    name="questions_answers_data"
                                                    value={formData.questions_answers_data}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal-footer-btn">
                                        <button
                                            type="button"
                                            className="btn btn-cancel me-2"
                                            data-bs-dismiss="modal"
                                        >
                                            {t("cancel")}
                                        </button>

                                        <button
                                            type="submit"
                                            className="btn btn-submit"
                                            disabled={loading}
                                        >
                                            {loading ? t("adding") : t("submit")}
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddInspection;