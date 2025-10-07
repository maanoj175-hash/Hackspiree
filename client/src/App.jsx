import { Outlet, Link, useLocation } from "react-router-dom";
import "./App.css";

export default function App() {
  const { pathname } = useLocation();
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-xl">
          <Link className="navbar-brand fw-semibold" to="/">GramVidya</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nv" aria-controls="nv" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="nv">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className={`nav-link ${pathname==='/'?'active':''}`} to="/">Home</Link></li>
              <li className="nav-item"><a className="nav-link" href="#about">About Us</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">Contact Us</a></li>
              <li className="nav-item"><a className="nav-link" href="#mission">Our Mission</a></li>
            </ul>
            <div className="d-flex gap-2 align-items-center">
              <Link className="btn btn-outline-primary" to="/login">Login</Link>
              <select className="form-select form-select-sm" style={{width:120}} defaultValue="en">
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
              </select>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
      <footer className="py-4 mt-5 border-top">
        <div className="container small text-muted">© {new Date().getFullYear()} GramVidya</div>
      </footer>
    </div>
  );
}


