import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login'
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddNote from './pages/AddNote';
import { useEffect, useState } from 'react';
import { checkAuth } from './utils/api/authApi';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Nav from './components/Navbar';
import EditNote from './pages/EditNote';


function App() {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      try {
        await checkAuth();
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };
    verifySession();
  }, []);

  if (loading) return <p>Loading...</p>;

    return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute isAuth={isAuth}>
              <Login setIsAuth={setIsAuth} />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute isAuth={isAuth}>
              <Register />
            </PublicRoute>
          }
        />
      </Routes>
      
      {isAuth && <Nav setIsAuth={setIsAuth} />}
      <Routes>
        {/* Private Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute isAuth={isAuth}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRoute isAuth={isAuth}>
              <AddNote />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute isAuth={isAuth}>
              <EditNote />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App
