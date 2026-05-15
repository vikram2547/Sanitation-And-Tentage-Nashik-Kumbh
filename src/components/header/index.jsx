
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { all_routes } from "../../routes/all_routes";
import { useNavigate } from "react-router-dom";
import { usFlag } from "../../utils/imagepath";
import { logout } from "../../core/redux/signinSlice";
import { useTranslation } from "react-i18next";

const Header = () => {
  const route = all_routes;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggle, SetToggle] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [flagImage, _setFlagImage] = useState(usFlag);
  const { t, i18n } = useTranslation();

  const location = useLocation();

  const isElementVisible = (element) => {
    return element.offsetWidth > 0 || element.offsetHeight > 0;
  };

  useEffect(() => {
    const handleMouseover = (e) => {
      e.stopPropagation();

      const body = document.body;
      const toggleBtn = document.getElementById("toggle_btn");

      if (
        body.classList.contains("mini-sidebar") &&
        isElementVisible(toggleBtn)
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("mouseover", handleMouseover);

    return () => {
      document.removeEventListener("mouseover", handleMouseover);
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  useEffect(() => {
    document.querySelector(".main-wrapper")?.classList.remove("slide-nav");
    document.querySelector(".sidebar-overlay")?.classList.remove("opened");
    document.querySelector("html")?.classList.remove("menu-opened");
  }, [location.pathname]);

  const toggleFullscreen = (elem) => {
    const doc = document;
    elem = elem || document.documentElement;

    if (
      !doc.fullscreenElement &&
      !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement &&
      !doc.msFullscreenElement
    ) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(1);
      }
    } else {
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      }
    }
  };

  const { expandMenus } = useSelector(
    (state) => state.themeSetting.expandMenus
  );

  const dataLayout = useSelector(
    (state) => state.themeSetting.dataLayout
  );

  const expandMenu = () => {
    document.body.classList.remove("expand-menu");
  };

  const expandMenuOpen = () => {
    document.body.classList.add("expand-menu");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate(all_routes.signin);
  };

  const toggleMobileMenu = () => {
    document.querySelector(".main-wrapper")?.classList.toggle("slide-nav");
    document.querySelector(".sidebar-overlay")?.classList.toggle("opened");
    document.querySelector("html")?.classList.toggle("menu-opened");
  };

  return (
    <>
      <div className="header">
        <div className="main-header">

          {/* Mobile Toggle Button */}
          <Link
            to="#"
            id="mobile_btn"
            className="mobile-toggle"
            onClick={toggleMobileMenu}
          >
            <i className="ti ti-menu-2"></i>
          </Link>

          <div
            className={`header-left
             ${toggle ? "" : "active"}
             ${expandMenus || dataLayout === "layout-hovered" ? "expand-menu" : ""}
             `}
            onMouseLeave={expandMenu}
            onMouseOver={expandMenuOpen}
          >
          </div>

          <ul className="nav user-menu">

            {/* Search */}
            <li className="nav-item nav-searchinputs">
              <div className="top-nav-search">
                <Link to="#" className="responsive-search">
                  <i className="feather icon-search" />
                </Link>
                <form action="#" className="dropdown">
                  <div
                    className="searchinputs input-group dropdown-toggle"
                    id="dropdownMenuClickable"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                  >
                    <input type="text" placeholder={t("search")} />
                    <div className="search-addon">
                      <span>
                        <i className="ti ti-search" />
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </li>

            {/* Language */}
            <li className="nav-item nav-item-box">
              <select
                className="form-select form-select-sm btn btn-info"
                style={{ color: "white" }}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                defaultValue={i18n.language}
              >
                <option value="en" style={{ color: "black" }}>ENG</option>
                <option value="hi" style={{ color: "black" }}>HIN</option>
              </select>
            </li>

            {/* Fullscreen */}
            <li className="nav-item nav-item-box">
              <Link
                to="#"
                id="btnFullscreen"
                onClick={() => toggleFullscreen()}
              >
                <i className="ti ti-maximize"></i>
              </Link>
            </li>

            {/* Notification */}
            <li className="nav-item dropdown nav-item-box">
              <Link
                to="#"
                className="dropdown-toggle nav-link"
                data-bs-toggle="dropdown"
              >
                <i className="ti ti-bell"></i>
              </Link>
            </li>

            {/* Settings */}
            {/* <li className="nav-item nav-item-box">
              <Link to="/general-settings">
                <i className="feather icon-settings"></i>
              </Link>
            </li> */}

            {/* Logout */}
            <li className="nav-item nav-item-box">
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-primary"
              >
                {t("logout")}
              </button>
            </li>

          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;