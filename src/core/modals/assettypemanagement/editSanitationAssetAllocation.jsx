import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { updateSanitationAssetAllocation } from "../../redux/sanitationAssetAllocationSlice";
import { useTranslation } from "react-i18next";


const EditSanitationAssetAllocation = ({ selectedAsset }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { loading, success, error } = useSelector(
        (state) => state.sanitationAssetsAllocation
    );

    const [formData, setFormData] = useState({
        asset_id: "",
        swachhagrahi_id: "",
        shift_id: "",
        allocation_date: "",
        status: "",
    });

    /* ================= PREFILL DATA ================= */
    useEffect(() => {
        if (selectedAsset) {
            setFormData({
                asset_id: selectedAsset.asset_id || "",
                swachhagrahi_id: selectedAsset.swachhagrahi_id || "",
                shift_id: selectedAsset.shift_id || "",
                allocation_date: selectedAsset.allocation_date || "",
                status: selectedAsset.status || "",
            });
        }
    }, [selectedAsset]);

    /* ================= HANDLE CHANGE ================= */
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    /* ================= SUBMIT ================= */
    const handleSubmit = (e) => {
        e.preventDefault();

        const assetId = selectedAsset?.allocation_id;
        if (!assetId) return;

        dispatch(
            updateSanitationAssetAllocation({
                id: assetId,
                data: formData,
            })
        );
    };

    /* ================= CLOSE MODAL ON SUCCESS ================= */
    useEffect(() => {
        if (!success) return;

        const modalEl = document.getElementById("edit-sanitation-asset-allocation");
        if (!modalEl) return;

        const modal = Modal.getInstance(modalEl) || new Modal(modalEl);

        const handleHidden = () => {
            document.body.classList.remove("modal-open");
            document.body.style.paddingRight = "";
            document
                .querySelectorAll(".modal-backdrop")
                .forEach((bd) => bd.remove());

            modalEl.removeEventListener("hidden.bs.modal", handleHidden);
        };

        modalEl.addEventListener("hidden.bs.modal", handleHidden);
        modal.hide();
    }, [success, dispatch]);

    return (
        <div className="modal fade" id="edit-sanitation-asset-allocation">
            <div className="modal-dialog modal-dialog-centered custom-modal-two">
                <div className="modal-content">
                    <div className="page-wrapper-new p-0">
                        <div className="content">

                            {/* HEADER */}
                            <div className="modal-header border-0 custom-modal-header">
                                <div className="page-title">
                                    <h4>{t("edit_sanitation_asset_allocation")}</h4>
                                </div>

                                <button
                                    type="button"
                                    className="close"
                                    data-bs-dismiss="modal"
                                >
                                    <span>×</span>
                                </button>
                            </div>

                            {/* BODY */}
                            <div className="modal-body custom-modal-body">

                                {error && (
                                    <div className="alert alert-danger">{error}</div>
                                )}

                                {success && (
                                    <div className="alert alert-success">
                                        {t("updated_successfully")}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="row">

                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>{t("asset_id")}</label>
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
                                                <label>{t("swachhagrahi_id")}</label>
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
                                                <label>{t("shift_id")}</label>
                                                <input
                                                    type="text"
                                                    name="shift_id"
                                                    className="form-control"
                                                    value={formData.shift_id}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>{t("allocation_date")}</label>
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
                                            {loading ? t("updating") : t("update")}
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

export default EditSanitationAssetAllocation;