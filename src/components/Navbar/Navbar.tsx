import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Navbar as Nav } from "flowbite-react";
import { MdAddBox } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";
import { IoMdMenu } from "react-icons/io";

import Drawer from "../Drawer/Drawer";

import { useLogout } from "../../hooks/Auth/useLogout";
import { getCookie } from "../../helpers/cookie";
import { Routes } from "../../../Routes";

import Logo from "../../assets/examkillerlogo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const user = getCookie("user");
  const navigate = useNavigate();

  const isLead = user?.role === "Lead";

  const handleOpen = () => {
    setOpenModal(true);
  };

  return (
    <Nav className="w-full flex items-center justify-between relative">
      <Nav.Brand
        onClick={() => navigate(Routes.Dashboard.path)}
        className="cursor-pointer"
      >
        <img src={Logo} className="mr-3 sm:h-9 w-[250px] !h-[70px]" />
      </Nav.Brand>

      {/* Menu */}
      <div
        className="cursor-pointer rounded-xl p-2 z-10 border-blue-400 border-2 hidden max-md:block"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <IoMdMenu className="text-blue-400" size={20} />
        {isMenuOpen && (
          <div className="w-full flex-1 absolute !h-[100vh] bg-white p-5 px-5 !top-20 !left-0 flex flex-col gap-y-3">
            <Button
              className="flex p-[5px] items-center bg-blue-500 hover:!bg-blue-700 !ring-0"
              onClick={handleOpen}
            >
              <MdAddBox />
              <span className="pl-2">Create Room</span>
            </Button>
            <Button
              className="flex p-[5px] items-center bg-blue-500 hover:!bg-blue-700 !ring-0"
              onClick={useLogout}
            >
              <CgLogOut />
              <span className="pl-2">Logout</span>
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-x-5 max-md:hidden">
        {isLead && (
          <Button
            className="flex items-center bg-blue-500 hover:!bg-blue-700 !ring-0"
            onClick={handleOpen}
          >
            <MdAddBox />
            <span className="pl-2">Create Room</span>
          </Button>
        )}
        <Button
          className="flex items-center bg-blue-500 hover:!bg-blue-700 !ring-0"
          onClick={useLogout}
        >
          <CgLogOut />
          <span className="pl-2">Logout</span>
        </Button>
      </div>

      {openModal && (
        <Drawer setOpenModal={setOpenModal} openModal={openModal} />
      )}
    </Nav>
  );
};

export default memo(Navbar);
