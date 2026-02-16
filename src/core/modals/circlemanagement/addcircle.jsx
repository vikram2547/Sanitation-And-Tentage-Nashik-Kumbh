import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import { addCircle, clearMessages } from "../../redux/circleSlice";

const AddCircle = ({sectorId}) => {
  const dispatch = useDispatch();
  console.log('aaaaaaaaaaaaaaaaaaaaaaaa',sectorId)

  const { success, error, loading } = useSelector(
    (state) => state.circles
  );

  const [formData, setFormData] = useState({
    circle_name: "",
    circle_code: "",
    sector_id: sectorId,
    boundary_coordinates: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(addCircle(formData));

    if (createCircle.fulfilled.match(resultAction)) {
      // Close modal
      const modal = window.bootstrap.Modal.getInstance(
        document.getElementById("add-circle")
      );
      modal?.hide();
    }
  };

  /* ================= SUCCESS FLOW ================= */
  useEffect(() => {
    if (success) {

      const modalEl = document.getElementById("add-circle");

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
  if (sectorId) {
    console.log('sectoriddddddddd',sectorId)
    setFormData((prev) => ({
      ...prev,
      sector_id: sectorId,
    }));
  }
}, [sectorId]);

  useEffect(() => {
    if (success) {
      setFormData({
        circle_name: "",
        circle_code: "",
        sector_id: sectorId,
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
                  <h4>Add Circle</h4>
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
                    Circle created successfully
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="input-blocks">
                        <label>Circle Name</label>
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
                        <label>Circle Code</label>
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

export default AddCircle;
