import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { addCircle, clearMessages } from "../../redux/circleSlice";
import { useTranslation } from "react-i18next";


const AddCircle = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { sectors } = useSelector(
    (state) => state.sectors
  );

  const { success, error, loading } = useSelector(
    (state) => state.circles
  );

  const [formData, setFormData] = useState({
    circle_name: "",
    circle_code: "",
    sector_id: "",
    boundary_coordinates: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(addCircle(formData));

    if (addCircle.fulfilled.match(resultAction)) {
      const modalEl = document.getElementById("add-circle");
      const modalInstance =
        window.bootstrap.Modal.getInstance(modalEl) ||
        new window.bootstrap.Modal(modalEl);

      modalInstance.hide();
    }
  };


  /* ================= SUCCESS FLOW ================= */
  useEffect(() => {
    if (!success) return;
    const modalEl = document.getElementById("add-circle");




    if (modalEl) {
      const modalInstance =
        Modal.getInstance(modalEl) || new Modal(modalEl);

      modalInstance.hide();
    }

    setFormData({
      circle_name: "",
      circle_code: "",
      sector_id: "",
      boundary_coordinates: null,
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
        circle_name: "",
        circle_code: "",
        sector_id: "",
        boundary_coordinates: null,
      });
    }
  }, [success]);

  return (
    <div className="modal fade" id="add-circle" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">

              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>{t("add_new_circle")}</h4>
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
                    {t("created_successfully")}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="input-blocks">
                        <label>{t("sector")}</label>
                        <select
                          name="sector_id"
                          value={formData.sector_id}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="">Select Sector</option>

                          {Array.isArray(sectors) &&
                            sectors.map((sector) => (
                              <option
                                key={sector.sector_id}
                                value={sector.sector_id}
                              >
                                {sector.sector_name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("circle_name")}</label>
                        <input
                          type="text"
                          name="circle_name"
                          value={formData.circle_name}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>{t("circle_code")}</label>
                        <input
                          type="text"
                          name="circle_code"
                          value={formData.circle_code}
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

export default AddCircle;
