import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVendor, clearMessages } from "../../redux/vendorsSlice";
import { Modal } from "bootstrap";
import { useTranslation } from "react-i18next";


const AddVendors = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(addVendor(formData));

    if (createVendor.fulfilled.match(resultAction)) {
      // Close modal
      const modal = window.bootstrap.Modal.getInstance(
        document.getElementById("add-vendor")
      );
      modal?.hide();
    }
  };

  /* ================= SUCCESS FLOW ================= */
  useEffect(() => {
    if (!success) return;
    const modalEl = document.getElementById("add-vendor");



    if (modalEl) {
      const modalInstance =
        Modal.getInstance(modalEl) || new Modal(modalEl);

      modalInstance.hide();
    }
    setFormData({
      vendor_name: "",
      vendor_code: "",
      contact_person: "",
      contact_email: "",
      contact_phone: "",
      address: "",
      status: "ACTIVE",
      user_id: 0,
    })
  }, [success]);

  /* ================= ERROR CLEAR ================= */
  useEffect(() => {
    if (success || error) return;

    const timer = setTimeout(() => {
      dispatch(clearMessages());
    }, 3000);

    return () => clearTimeout(timer);
  }, [success, error, dispatch]);

  useEffect(() => {
    if (success) {
      setFormData({
        vendor_name: "",
        vendor_code: "",
        contact_person: "",
        contact_email: "",
        contact_phone: "",
        address: "",
        status: "ACTIVE",
        user_id: 0,
      });
    }
  }, [success]);

  return (
    <div className="modal fade" id="add-vendor" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>{t("add_new_vendor")}</h4>
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
                    Vendor created successfully
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("vendor_name")}</label>
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
                        <label>{t("vendor_code")}</label>
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
                        <label>{t("contact_person")}</label>
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
                        <label>{t("email")}</label>
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
                        <label>{t("phone")}</label>
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

                    <div className="col-lg-12">
                      <div className="input-blocks">
                        <label>{t("address")}</label>
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
                      {t("cancel")}
                    </button>

                    <button
                      type="submit"
                      className="btn btn-success"
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

export default AddVendors;
