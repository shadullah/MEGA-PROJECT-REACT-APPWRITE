import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Navbar from "./components/shared/Navbar/Navbar";
// import { Outlet } from "react-router-dom";
import Footer from "./components/shared/footer/footer";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div>
      <Navbar />
      <main>todo{/* todo: <Outlet/> */}</main>
      <Footer />
    </div>
  ) : null;
}

export default App;
