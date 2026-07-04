import React from 'react';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="main-header d-flex align-items-center justify-content-between px-4 bg-body-tertiary border-bottom shadow-sm">
      <div className="d-flex align-items-center gap-3">
        <button className="btn border-0 p-2 toggle-btn d-flex align-items-center justify-content-center" onClick={toggleSidebar}>
          <i className="bi bi-list fs-4"></i>
        </button>
        <span className="d-none d-sm-inline fw-semibold text-dark">Welcome Dr. Rajeev Singh</span>
      </div>

      <div className="d-flex align-items-center gap-3">
        {/* Notifications Icon */}
        {/* <div className="dropdown">
          <button
            className="btn btn-sm text-body border-0 rounded-circle p-2 d-flex align-items-center justify-content-center position-relative hover-bg"
            style={{ width: '40px', height: '40px' }}
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fs-5 bi bi-bell-fill"></i>
            <span className="position-absolute top-0 start-100 translate-middle p-1 mt-1 ms-n1 bg-danger border border-light rounded-circle">
              <span className="visually-hidden">New alerts</span>
            </span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2 p-2" style={{ width: '300px' }}>
            <li><h6 className="dropdown-header fw-bold text-uppercase pb-2 border-bottom mb-2">Notifications</h6></li>
            <li>
              <a className="dropdown-item d-flex align-items-start gap-3 py-2 rounded" href="#!">
                <div className="bg-dark bg-opacity-10 text-primary rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px' }}>
                  <i className="bi bi-person-plus-fill"></i>
                </div>
                <div>
                  <div className="fw-semibold">New user registered</div>
                  <div className="text-muted small">5 minutes ago</div>
                </div>
              </a>
            </li>
            <li>
              <a className="dropdown-item d-flex align-items-start gap-3 py-2 rounded" href="#!">
                <div className="bg-success bg-opacity-10 text-danger rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px' }}>
                  <i className="bi bi-currency-rupee "></i>
                </div>
                <div>
                  <div className="fw-semibold">User Purchased a Book</div>
                  <div className="text-muted small">2 hours ago</div>
                </div>
              </a>
            </li>
            <li><hr className="dropdown-divider my-2" /></li>
            <li><a className="dropdown-item text-center small fw-semibold text-primary rounded py-2" href="#!">View all notifications</a></li>
          </ul>
        </div> */}

        {/* Profile Icon */}
        <div className="dropdown ms-1">
          <button className="btn border-0 p-0 d-flex align-items-center" data-bs-toggle="dropdown" aria-expanded="false">
            <img
              src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff&rounded=true"
              alt="Profile"
              width="40"
              height="40"
              className="rounded-circle shadow-sm"
            />
          </button>
          <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2 p-2" style={{ minWidth: '200px' }}>
            <li>
              <div className="dropdown-item-text px-3 py-2 mb-2 border-bottom">
                <div className="fw-bold">Admin User</div>
                <div className="text-muted small">example@gmail.com</div>
              </div>
            </li>
            <li><a className="dropdown-item rounded py-2" href="#!"><i className="bi bi-person me-2"></i>My Profile</a></li>
            <li><a className="dropdown-item rounded py-2" href="#!"><i className="bi bi-gear me-2"></i>Account Settings</a></li>
            <li><hr className="dropdown-divider my-2" /></li>
            <li><a className="dropdown-item rounded py-2 text-danger" href="#!"><i className="bi bi-box-arrow-right me-2"></i>Sign out</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
