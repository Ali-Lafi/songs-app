import { Link, Route, Routes } from 'react-router-dom';
import { SongsPage } from '../pages/songs-page';
import { LoginPage } from '../pages/login-page';
import { AdminPage } from '../pages/admin-page';
import { ProtectedRoute } from '../components/protected-route';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function App() {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('accessToken'),
  );
  const logout = () => {
    localStorage.removeItem('accessToken');
    window.location.reload();
  };
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <h1 className="text-xl font-bold">Songs App</h1>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium hover:underline">
              Songs
            </Link>
            {!token && (
              <Link to="/login" className="text-sm font-medium hover:underline">
                Login
              </Link>
            )}
            {token && (
              <>
                <Link
                  to="/Admin"
                  className="text-sm font-medium hover:underline"
                >
                  Admin{' '}
                </Link>
                <Button onClick={logout} variant="outline" size="sm">
                  Logout
                </Button>{' '}
              </>
            )}
          </div>
        </div>
      </nav>

<main className='mx-auto max-w-6xl px-4 py-8'>
      <Routes>
        <Route path="/" element={<SongsPage />} />
        <Route path="/login" element={<LoginPage onLogin={setToken} />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      </main>
    </div>
  );
}

export default App;
