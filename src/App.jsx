import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Navbar from "./components/shared/Navbar/Navbar";
import Footer from "./components/shared/footer/footer";
import { Outlet } from "react-router-dom";

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

  // return (
  //   <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
  //     <div className="w-full block">
  //       <Navbar />
  //       <main>
  //         {/* todo: <Outlet/> */}
  //         {!loading ? (
  //           <Outlet />
  //         ) : (
  //           <>
  //             <p>Not working outlet</p>
  //           </>
  //         )}
  //       </main>
  //       <Footer />
  //     </div>
  //   </div>
  // );

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Navbar />
        <main>
          TODO: <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
