import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { addSanitationAssetTagging } from "../../redux/sanitationAssetTaggingSlice";
import { useTranslation } from "react-i18next";


const AddSanitationAssetTagging = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    

    const { loading, success, error } = useSelector(
        (state) => state.sanitationAssetsTagging
    );

    const [formData, setFormData] = useState({
        asset_type_id: "",
        qr_code: "",
        asset_name: "",
        gender: "",
        description: "",
        vendor_id: "",
        vendor_asset_code: "",
        sector_id: "",
        circle_id: "",
        latitude: "",
        longitude: "",
        photo: "",
        created_by: "",
        status: "ACTIVE",
    });

    /* ================= HANDLE CHANGE ================= */
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    /* ================= SUBMIT ================= */
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();

        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        dispatch(addSanitationAssetTagging(data));
    };

    /* ================= SUCCESS FLOW ================= */
    useEffect(() => {
        if (!success) return;

        const modalEl = document.getElementById("add-sanitation-asset-tagging");
        if (modalEl) {
            const modal =
                Modal.getInstance(modalEl) || new Modal(modalEl);
            modal.hide();
        }

        setFormData({
            asset_type_id: "",
            qr_code: "",
            asset_name: "",
            gender: "",
            description: "",
            vendor_id: "",
            vendor_asset_code: "",
            sector_id: "",
            circle_id: "",
            latitude: "",
            longitude: "",
            photo: "",
            created_by: "",
            status: "ACTIVE",
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
        <div className="modal fade" id="add-sanitation-asset-tagging" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered custom-modal-two">
                <div className="modal-content">
                    <div className="page-wrapper-new p-0">
                        <div className="content">

                            {/* ================= HEADER ================= */}
                            <div className="modal-header border-0 custom-modal-header">
                                <div className="page-title">
                                    <h4>{t("add_sanitation_asset_tagging")}</h4>
                                </div>
                                <button
                                    type="button"
                                    className="close"
                                    data-bs-dismiss="modal"
                                >
                                    <span>×</span>
                                </button>
                            </div>

                            {/* ================= BODY ================= */}
                            <div className="modal-body custom-modal-body">

                                {error && (
                                    <div className="alert alert-danger">{error}</div>
                                )}
                                {success && (
                                    <div className="alert alert-success">
                                        {t("created_successfully")}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="row">

                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>{t("asset_type_id")}</label>
                                                <input
                                                    type="text"
                                                    name="asset_type_id"
                                                    className="form-control"
                                                    value={formData.asset_type_id}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>{t("qr_code")}</label>
                                                <input
                                                    type="text"
                                                    name="qr_code"
                                                    className="form-control"
                                                    value={formData.qr_code}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>{t("asset_name")}</label>
                                                <input
                                                    type="text"
                                                    name="asset_name"
                                                    value={formData.asset_name}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>{t("gender")}</label>
                                                <input
                                                    type="text"
                                                    name="gender"
                                                    value={formData.gender}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>{t("description")}</label>
                                                <input
                                                    type="text"
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>{t("vendor_id")}</label>
                                                <input
                                                    type="text"
                                                    name="vendor_id"
                                                    value={formData.vendor_id}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>{t("vendor_asset_code")}</label>
                                                <input
                                                    type="text"
                                                    name="vendor_asset_code"
                                                    value={formData.vendor_asset_code}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>{t("sector_id")}</label>
                                                <input
                                                    type="text"
                                                    name="sector_id"
                                                    value={formData.sector_id}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>{t("circle_id")}</label>
                                                <input
                                                    type="text"
                                                    name="circle_id"
                                                    value={formData.circle_id}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>{t("latitude")}</label>
                                                <input
                                                    type="text"
                                                    name="latitude"
                                                    value={formData.latitude}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>{t("longitude")}</label>
                                                <input
                                                    type="text"
                                                    name="longitude"
                                                    value={formData.longitude}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>{t("photo")}</label>
                                                <input
                                                    type="file"
                                                    name="photo"
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    accept="image/*"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>{t("created_by")}</label>
                                                <input
                                                    type="text"
                                                    name="created_by"
                                                    value={formData.created_by}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>{t("status")}</label>
                                                <select
                                                    name="status"
                                                    value={formData.status}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                >
                                                    <option value="ACTIVE">ACTIVE</option>
                                                    <option value="INACTIVE">INACTIVE</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ================= FOOTER ================= */}
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

export default AddSanitationAssetTagging;
