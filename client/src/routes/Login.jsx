import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DEMO_USERS = [
  { role: "student", username: "ehtesham", password: "naushabah" },
  { role: "teacher", username: "komal", password: "manoj" },
];

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const match = DEMO_USERS.find(u => u.username === username && u.password === password && u.role === role);
    if (match) {
      localStorage.setItem("gv_user", JSON.stringify({ username, role }));
      navigate("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container py-4" style={{maxWidth: 480}}>
      <h2 className="mb-3">Login</h2>
      <form onSubmit={onSubmit} className="vstack gap-3">
        <div className="btn-group" role="group">
          <input type="radio" className="btn-check" name="role" id="role-student" autoComplete="off" checked={role === 'student'} onChange={() => setRole('student')} />
          <label className="btn btn-outline-primary" htmlFor="role-student">Student</label>
          <input type="radio" className="btn-check" name="role" id="role-teacher" autoComplete="off" checked={role === 'teacher'} onChange={() => setRole('teacher')} />
          <label className="btn btn-outline-primary" htmlFor="role-teacher">Teacher</label>
        </div>
        <div>
          <label className="form-label">Username</label>
          <input className="form-control" value={username} onChange={e=>setUsername(e.target.value)} />
        </div>
        <div>
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <button className="btn btn-success" type="submit">Sign In</button>
      </form>
    </div>
  );
}
