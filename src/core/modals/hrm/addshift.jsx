import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { addShift, clearMessages } from "../../redux/shiftSlice";
import { useTranslation } from "react-i18next";


const AddShift = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();


  const { success, error, loading } = useSelector(
    (state) => state.shifts
  );

  const [formData, setFormData] = useState({
    shift_name: "",
    start_time: "",
    end_time: "",
    is_active: 1,
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
    dispatch(addShift(formData));
  };

  /* ================= SUCCESS FLOW ================= */
  useEffect(() => {
    if (!success) return;

    const modalEl = document.getElementById("add-shift");

    if (modalEl) {
      const modalInstance =
        Modal.getInstance(modalEl) || new Modal(modalEl);
      modalInstance.hide();
    }

    setTimeout(() => {
      document.body.classList.remove("modal-open");
      document.body.style.paddingRight = "";
      document.querySelectorAll(".modal-backdrop").forEach((bd) => bd.remove());
    }, 300);

    // reset form
    setFormData({
      shift_name: "",
      start_time: "",
      end_time: "",
      is_active: 1,
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
    <div className="modal fade" id="add-shift" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>{t("add_new_shift")}</h4>
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

                    {/* ===== Shift Name ===== */}
                    <div className="col-lg-12">
                      <div className="input-blocks">
                        <label>{t("shift_name")}</label>
                        <input
                          type="text"
                          name="shift_name"
                          value={formData.shift_name}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter shift name"
                          required
                        />
                      </div>
                    </div>

                    {/* ===== Start Time ===== */}
                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("start_time")}</label>
                        <input
                          type="time"
                          name="start_time"
                          value={formData.start_time}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    {/* ===== End Time ===== */}
                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("end_time")}</label>
                        <input
                          type="time"
                          name="end_time"
                          value={formData.end_time}
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

export default AddShift;
