import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { addSanitationAssetAllocation, clearMessages } from "../../redux/sanitationAssetAllocationSlice";


const AddSanitationAssetAllocation = () => {
    const dispatch = useDispatch();

    const { loading, success, error } = useSelector(
        (state) => state.sanitationAssetsAllocation
    );

    const [formData, setFormData] = useState({
        asset_id: "",
        swachhagrahi_id: "",
        shift_id: "",
        allocation_date: "",
        status: "ACTIVE",
    });

    /* ================= HANDLE CHANGE ================= */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    /* ================= SUBMIT ================= */
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addSanitationAssetAllocation(formData));
    };

    /* ================= SUCCESS FLOW ================= */
    useEffect(() => {
        if (!success) return;

        const modalEl = document.getElementById("add-sanitation-asset-allocation");
        if (modalEl) {
            const modal =
                Modal.getInstance(modalEl) || new Modal(modalEl);
            modal.hide();
        }

        setFormData({
            asset_id: "",
            swachhagrahi_id: "",
            shift_id: "",
            allocation_date: "",
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
        <div className="modal fade" id="add-sanitation-asset-allocation" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered custom-modal-two">
                <div className="modal-content">
                    <div className="page-wrapper-new p-0">
                        <div className="content">

                            {/* ================= HEADER ================= */}
                            <div className="modal-header border-0 custom-modal-header">
                                <div className="page-title">
                                    <h4>Add Sanitation Asset Allocation</h4>
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
                                        Sanitation Asset Allocation created successfully
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="row">

                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>Asset ID</label>
                                                <input
                                                    type="text"
                                                    name="asset_id"
                                                    className="form-control"
                                                    value={formData.asset_id}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>Swachhagrahi ID</label>
                                                <input
                                                    type="text"
                                                    name="swachhagrahi_id"
                                                    className="form-control"
                                                    value={formData.swachhagrahi_id}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>Shift ID</label>
                                                <input
                                                    type="text"
                                                    name="shift_id"
                                                    value={formData.shift_id}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>Allocation Date</label>
                                                <input
                                                    type="date"
                                                    name="allocation_date"
                                                    value={formData.allocation_date}
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

export default AddSanitationAssetAllocation;
