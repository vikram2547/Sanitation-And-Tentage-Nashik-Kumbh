import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { addVehicle, clearMessages } from "../../redux/vehicleSlice";

const AddVehicle = () => {
    const dispatch = useDispatch();

    const { success, error, loading } = useSelector(
        (state) => state.vehicles
    );

    const [formData, setFormData] = useState({
        vehicle_name: "",
        vehicle_type: "",
        vehicle_number: "",
        rc_number: "",
        vendor_id: "",
        imei_number: "",
        chassis_number: "",
        gps_device_id: "",
        registration_date: "",
        status: "Active",
    });

    /* ================= HANDLE CHANGE ================= */
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    /* ================= SUBMIT ================= */
    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(addVehicle(formData));
    };

    /* ================= SUCCESS FLOW ================= */
    useEffect(() => {
        if (!success) return;

        const modalEl = document.getElementById("add-vehicle");

        if (modalEl) {
            const modalInstance =
                Modal.getInstance(modalEl) || new Modal(modalEl);
            modalInstance.hide();
        }

        setTimeout(() => {
            document.body.classList.remove("modal-open");
            document.body.style.paddingRight = "";
            document
                .querySelectorAll(".modal-backdrop")
                .forEach((bd) => bd.remove());
        }, 300);

        // reset form
        setFormData({
            vehicle_name: "",
            vehicle_type: "",
            vehicle_number: "",
            rc_number: "",
            vendor_id: "",
            imei_number: "",
            chassis_number: "",
            gps_device_id: "",
            registration_date: "",
            status: "Active",
        });
    }, [success]);

    /* ================= AUTO CLEAR MESSAGE ================= */
    useEffect(() => {
        if (!success && !error) return;

        const timer = setTimeout(() => {
            dispatch(clearMessages());
        }, 5000);

        return () => clearTimeout(timer);
    }, [success, error, dispatch]);

    return (
        <div className="modal fade" id="add-vehicle" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered custom-modal-two">
                <div className="modal-content">
                    <div className="page-wrapper-new p-0">
                        <div className="content">

                            {/* ================= HEADER ================= */}
                            <div className="modal-header border-0 custom-modal-header">
                                <div className="page-title">
                                    <h4>Add Vehicle</h4>
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

                                {error && <div className="alert alert-danger">{error}</div>}
                                {success && (
                                    <div className="alert alert-success">
                                        Vehicle created successfully
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="row">

                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>Vehicle Name</label>
                                                <input
                                                    type="text"
                                                    name="vehicle_name"
                                                    value={formData.vehicle_name}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Enter vehicle name"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>Vehicle Type</label>
                                                <select
                                                    name="vehicle_type"
                                                    value={formData.vehicle_type}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    required
                                                >
                                                    <option value="">Select Vehicle Type</option>
                                                    <option value="Compactor">Compactor</option>
                                                    <option value="Dumper">Dumper</option>
                                                    <option value="Loader">Loader</option>
                                                    <option value="Mini-truck">Mini-truck</option>
                                                    <option value="Tipper">Tipper</option>
                                                </select>
                                            </div>
                                        </div>


                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>Vehicle Number</label>
                                                <input
                                                    type="text"
                                                    name="vehicle_number"
                                                    value={formData.vehicle_number}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Enter vehicle number"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>RC Number</label>
                                                <input
                                                    type="text"
                                                    name="rc_number"
                                                    value={formData.rc_number}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Enter RC number"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>Vendor ID</label>
                                                <input
                                                    type="number"
                                                    name="vendor_id"
                                                    value={formData.vendor_id}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Enter vendor id"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>IMEI Number</label>
                                                <input
                                                    type="text"
                                                    name="imei_number"
                                                    value={formData.imei_number}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Enter IMEI number"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>Chassis Number</label>
                                                <input
                                                    type="text"
                                                    name="chassis_number"
                                                    value={formData.chassis_number}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Enter chassis number"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>GPS Device ID</label>
                                                <input
                                                    type="text"
                                                    name="gps_device_id"
                                                    value={formData.gps_device_id}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Enter GPS device ID"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="input-blocks">
                                                <label>Registration Date</label>
                                                <input
                                                    type="date"
                                                    name="registration_date"
                                                    value={formData.registration_date}
                                                    onChange={handleChange}
                                                    className="form-control"
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
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
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

export default AddVehicle;
