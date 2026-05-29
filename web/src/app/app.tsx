import { Link, Route, Routes } from "react-router-dom";
import { SongsPage } from "../pages/songs-page";
import { LoginPage } from "../pages/login-page";
import { AdminPage } from "../pages/admin-page";
import { ProtectedRoute } from "../components/protected-route";
import { useState } from "react";

export function App() {
  const [token, setToken] = useState<string |null>(()=> localStorage.getItem('accessToken')
  )
  const logout = ()=>{
    localStorage.removeItem('accessToken');
    window.location.reload();
  }
  return (
    <div>
      <nav>
        <Link to="/">Songs</Link>
        {'|'}
        {!token && <Link to="/login">Login</Link>}
        {token && (<> {'|'}    <Link to="/Admin">Admin </Link> {'|'}  <button onClick={logout}>Logout</button> </>)}
     
      </nav>

    <Routes>
      <Route path="/" element={<SongsPage/>}/>
      <Route path="/login" element={<LoginPage onLogin={setToken}/>}/>
      <Route path="/admin" element={<ProtectedRoute><AdminPage/></ProtectedRoute>}/>

    </Routes>
    </div>
  );
}

export default App;
