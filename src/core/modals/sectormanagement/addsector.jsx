import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { addSector } from "../../redux/sectorSlice";

const AddSector = () => {
    const dispatch = useDispatch();

    const { success, error, loading } = useSelector(
        (state) => state.sectors
    );

    const [formData, setFormData] = useState({
        sector_name: "",
        sector_code: "",
        boundary_coordinates: null,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /* ================= SUBMIT ================= */
    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(addSector(formData));

        if (createSector.fulfilled.match(resultAction)) {
            // Close modal
            const modal = window.bootstrap.Modal.getInstance(
                document.getElementById("add-sector")
            );
            modal?.hide();
        }
    };

    /* ================= SUCCESS FLOW ================= */
    useEffect(() => {
        if (success) {

            const modalEl = document.getElementById("add-sector");

            if (modalEl) {
                const modalInstance =
                    Modal.getInstance(modalEl) || new Modal(modalEl);

                modalInstance.hide();
            }

            setTimeout(() => {
                document.body.classList.remove("modal-open");
                document.body.style.paddingRight = "";

                const backdrops = document.querySelectorAll(".modal-backdrop");
                backdrops.forEach((bd) => bd.remove());
            }, 500);

        }
    }, [success]);

    /* ================= ERROR CLEAR ================= */
    useEffect(() => {
        if (success || error) return;

        const timer = setTimeout(() => {
            dispatch(clearMessages());
        }, 5000);

        return () => clearTimeout(timer);
    }, [success, error, dispatch]);

    useEffect(() => {
        if (success) {
            setFormData({
                sector_name: "",
                sector_code: "",
                boundary_coordinates: null,
            });
        }
    }, [success]);

    return (
        <div className="modal fade" id="add-sector" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered custom-modal-two">
                <div className="modal-content">
                    <div className="page-wrapper-new p-0">
                        <div className="content">

                            <div className="modal-header border-0 custom-modal-header">
                                <div className="page-title">
                                    <h4>Add Sector</h4>
                                </div>
                                <button
                                    type="button"
                                    className="close"
                                    data-bs-dismiss="modal"
                                >
                                    <span>×</span>
                                </button>
                            </div>

                            <div className="modal-body custom-modal-body">

                                {error && (
                                    <div className="alert alert-danger">{error}</div>
                                )}

                                {success && (
                                    <div className="alert alert-success">
                                        Sector created successfully
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="row">

                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>Sector Name</label>
                                                <input
                                                    type="text"
                                                    name="sector_name"
                                                    value={formData.sector_name}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>Sector Code</label>
                                                <input
                                                    type="text"
                                                    name="sector_code"
                                                    value={formData.sector_code}
                                                    onChange={handleChange}
                                                    className="form-control"
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

export default AddSector;
