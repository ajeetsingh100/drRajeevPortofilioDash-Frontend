import React from 'react';
import { Link} from 'react-router-dom';


const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [openMenu, setOpenMenu] = React.useState(null);


  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <aside
      className={`sidebar bg-body-tertiary border-end ${
        isOpen ? 'open' : ''
      }`}
    >
      {/* Header */}
      <div
        className="sidebar-header d-flex align-items-center justify-content-between p-3 border-bottom"
        style={{ height: 'var(--header-height)' }}
      >
        <Link
          to="/"
          className="text-decoration-none d-flex align-items-center gap-2 text-body"
        >
          {/* <img src={logo} alt="Examyug24" height={50} width={50} /> */}

          <span className="fs-5 fw-bold">
            Dr. Rajeev Singh
          </span>
        </Link>

        <button
          className="btn d-md-none border-0 p-1"
          onClick={toggleSidebar}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      {/* Body */}
      <div className="sidebar-body overflow-y-auto p-3">
        {/* Overview */}

       {/* <h6
          className="sidebar-heading text-uppercase text-muted fw-bold mb-2 mt-2"
          style={{ fontSize: '0.75rem' }}
        >
          Overview
        </h6> */}

      <ul className="nav flex-column mb-3 gap-1 ">
          <li className="nav-item">
            <Link
              to="/"
              className="nav-link text-dark d-flex align-items-center gap-3 rounded hover-bg py-2 px-3"
            >
              <i className="bi bi-images fs-5"></i>
              <span>Manage Slider</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/manage-video-testimonial"
              className="nav-link text-dark d-flex align-items-center gap-3 rounded hover-bg py-2 px-3"
            >
              <i className="bi bi-collection-play fs-5"></i>
              <span>Video Testimonials</span>
            </Link>
          </li>
           <li className="nav-item">
            <Link
              to="/create-blog"
              className="nav-link text-dark d-flex align-items-center gap-3 rounded hover-bg py-2 px-3"
            >
              <i className="bi bi-file-earmark-text fs-5"></i>
              <span>Create Blog</span>
            </Link>
          </li>
        </ul>
        {/* User Managment */}
        {/* <h6
          className="sidebar-heading text-uppercase text-muted fw-bold mb-2 mt-4"
          style={{ fontSize: '0.75rem' }}
        >
          User Management
        </h6>
     <div
          className="accordion accordion-flush bg-transparent"
         
        >
            <div className="accordion-item bg-transparent border-0 mb-1">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button shadow-none bg-transparent text-body rounded hover-bg py-2 px-3 ${
                    openMenu === 'user' ? '' : 'collapsed'
                  }`}
                  type="button"
                  onClick={() => toggleMenu('user')}
                  aria-expanded={openMenu === 'user'}
                
                >
                  <div className="d-flex align-items-center gap-3 w-100">
                    <i class="bi bi-people fs-5"></i>
                    <span>User</span>
                  </div>
                </button>
              </h2>

              <div
               
                className={`accordion-collapse collapse ${openMenu === 'user' ? 'show' : ''}`}
              >
                <div className="accordion-body p-0 pt-1">
                  <ul className="nav flex-column ms-4 border-start ps-2 gap-1">
                    <li className="nav-item">
                      <Link
                        to="/user/add-user"
                        className="nav-link text-body py-1 px-3 rounded hover-bg small"
                      >
                        Create User
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        to="/user/view-all-users"
                        className="nav-link text-body py-1 px-3 rounded hover-bg small"
                      >
                        View All Users
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
        </div> */}
        {/* accordion body */}
      </div>
      {/* sidebar body */}
    </aside>
  );
};

export default Sidebar;