import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages, updateVendor } from "../../redux/vendorsSlice";

const EditVendor = ({ selectedVendor }) => {
  const dispatch = useDispatch();
  const { success, error, loading } = useSelector(
    (state) => state.vendors
  );

  const [formData, setFormData] = useState({
    vendor_name: "",
    vendor_code: "",
    contact_person: "",
    contact_email: "",
    contact_phone: "",
    address: "",
    status: "ACTIVE",
    user_id: 0,
  });

  // ✅ Prefill when selectedVendor changes
  useEffect(() => {
    if (selectedVendor) {
      setFormData({
        vendor_name: selectedVendor.vendor_name || "",
        vendor_code: selectedVendor.vendor_code || "",
        contact_person: selectedVendor.contact_person || "",
        contact_email: selectedVendor.contact_email || "",
        contact_phone: selectedVendor.contact_phone || "",
        address: selectedVendor.address || "",
        status: selectedVendor.status || "ACTIVE",
        user_id: selectedVendor.user_id || 0,
      });
    }
  }, [selectedVendor]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    console.log("MODAL RECEIVED:", selectedVendor);
  }, [selectedVendor]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vendorId = selectedVendor?.vendor_id || selectedVendor?.id;

    if (!vendorId) {
      console.log("No Vendor ID found");
      return;
    }

    const resultAction = await dispatch(
      updateVendor({
        id: vendorId,
        data: formData,
      })
    );

    console.log("Result Action:", resultAction);

    // ✅ Close modal on success
    if (updateVendor.fulfilled.match(resultAction)) {
      const modal = window.bootstrap.Modal.getInstance(
        document.getElementById("edit-vendor")
      );
      modal?.hide();
    }
  };

  // ✅ Auto clear messages after 5 sec
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  return (
    <div className="modal fade" id="edit-vendor">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>Edit Vendor</h4>
                </div>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>

              <div className="modal-body custom-modal-body">

                {error && (
                  <div className="alert alert-danger">{error}</div>
                )}
                {success && (
                  <div className="alert alert-success">{success}</div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Vendor Name</label>
                        <input
                          type="text"
                          name="vendor_name"
                          value={formData.vendor_name}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Vendor Code</label>
                        <input
                          type="text"
                          name="vendor_code"
                          value={formData.vendor_code}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Contact Person</label>
                        <input
                          type="text"
                          name="contact_person"
                          value={formData.contact_person}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Contact Email</label>
                        <input
                          type="email"
                          name="contact_email"
                          value={formData.contact_email}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Contact Phone</label>
                        <input
                          type="text"
                          name="contact_phone"
                          value={formData.contact_phone}
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
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="INACTIVE">INACTIVE</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="input-blocks">
                        <label>Address</label>
                        <textarea
                          name="address"
                          value={formData.address}
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
                      {loading ? "Updating..." : "Update"}
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

export default EditVendor;
