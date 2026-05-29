import { Link, Route, Routes } from "react-router-dom";
import { SongsPage } from "../pages/songs-page";
import { LoginPage } from "../pages/login-page";
import { AdminPage } from "../pages/admin-page";

export function App() {
  return (
    <div>
      <nav>
        <Link to="/">Songs</Link>
        {'|'}
        <Link to="/login">Login</Link>
        {'|'}
        <Link to="/Admin">Admin </Link>
      </nav>

    <Routes>
      <Route path="/" element={<SongsPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/admin" element={<AdminPage/>}/>

    </Routes>
    </div>
  );
}

export default App;
