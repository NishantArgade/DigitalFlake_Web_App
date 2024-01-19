import AllInboxOutlinedIcon from "@mui/icons-material/AllInboxOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProtectedRoute = () => {
  const access_token = Cookies.get("access_token");
  const path = useLocation();
  console.log(path)
  const temp = async () => {
    if (!access_token) {
      const isAuth = await axios.post("/api/getAccessToken");
      console.log(isAuth);
    }
  };
  useEffect(() => {
    // console.log("protected route called");
    temp();
  }, [path]);

  return (
    <div className="md:h-screen">
      <Navbar />

      <div className="container mx-auto h-[90%] md:grid md:grid-cols-4 ">
        <div className="item1 md:col-span-1 hidden md:block col-span-4 bg-[#F4F4F4] h-full p-4 flex flex-col items-start justify-start">
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "text-gray-600 bg-[#ecdefb] flex gap-2 my-1 py-3 w-full px-2 rounded-md cursor-pointer font-semibold"
                : "text-gray-600 flex gap-2 my-1 w-full px-2 py-3 rounded-md  cursor-pointer hover:bg-[#e9d8fb]"
            }
          >
            <HomeOutlinedIcon />
            <p>Home</p>
          </NavLink>

          <NavLink
            to="/category"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "text-gray-600 bg-[#ecdefb] flex gap-2 my-1 w-full px-2 py-3 rounded-md cursor-pointer font-semibold"
                : "text-gray-600 flex gap-2 my-1 w-full px-2 py-3 rounded-md  cursor-pointer hover:bg-[#e9d8fb]"
            }
          >
            <CategoryOutlinedIcon />
            <p>Category</p>
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "text-gray-600 bg-[#ecdefb] flex gap-2 my-1 w-full px-2 py-3 rounded-md cursor-pointer font-semibold"
                : "text-gray-600 flex gap-2 my-1 w-full px-2 py-3 rounded-md  cursor-pointer hover:bg-[#e9d8fb]"
            }
          >
            <AllInboxOutlinedIcon />
            <p>Products</p>
          </NavLink>
        </div>
        <div className="item2 h-full md:col-span-3 w-full hscreen md:h-full  p-2 mb-2 ">
          <div className="md:h-full  rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute;
