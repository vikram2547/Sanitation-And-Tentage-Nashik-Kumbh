
import { Link } from "react-router-dom";

const CommonFooter = () => {
  return (
    <div>
      <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
        <p className="mb-0">2026 © KASH IT. All Right Reserved</p>
        <p>
          Designed &amp; Developed by{" "}
          <Link to="#" className="text-primary">
            KASH IT
          </Link>
        </p>
      </div>
    </div>);

};

export default CommonFooter;