import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import MenuListComposition from "./AvatarOptions";
import SidebarDrawer from "./SidebarDrawer";
const Navbar = () => {
  const match = useLocation();
  const [open, setOpen] = React.useState(false);
  const { resetPasswordToken } = useParams();
  if (
    match?.pathname === "/login" ||
    match?.pathname === "/register" ||
    match?.pathname === "/register" ||
    match?.pathname === "/restore-password" ||
    match?.pathname === `/reset-password/${resetPasswordToken}`
  )
    return null;
  else
    return (
      <>
        <SidebarDrawer open={open} setOpen={setOpen} />
        <div className="container mx-auto bg-[#662671] w-full h-12 flex justify-between items-center p-4 text-white">
          <Link
            className="flex items-center justify-center gap-x-3 px-2 "
            to="/"
          >
            <span className="md:hidden">
              <MenuIcon onClick={() => setOpen(true)} />
            </span>
            <img
              src="/assets/brandSmallLogo.svg"
              className="md:w-[9.5rem] w-32"
              alt="logo"
            />
          </Link>

          <MenuListComposition />
        </div>
      </>
    );
};

export default Navbar;
