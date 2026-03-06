import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { addSanitationAssetTagging } from "../../redux/sanitationAssetTaggingSlice";


const AddSanitationAssetTagging = () => {
    const dispatch = useDispatch();

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
                                    <h4>Add Sanitation Asset Tagging</h4>
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
                                        Sanitation Asset Tagging created successfully
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="row">

                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>Asset Type ID</label>
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
                                                <label>QR Code</label>
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
                                                <label>Asset Name</label>
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
                                                <label>Gender</label>
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
                                                <label>Description</label>
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
                                                <label>Vendor ID</label>
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
                                                <label>Vendor Asset Code</label>
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
                                                <label>Sector ID</label>
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
                                                <label>Circle ID</label>
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
                                                <label>Latitude</label>
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
                                                <label>Longitude</label>
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
                                                <label>Photo</label>
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
                                                <label>Created By</label>
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
                                                <label>Status</label>
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
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-submit"
                                            disabled={loading}
                                        >
                                            {loading ? "Adding..." : "Submit"}
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
