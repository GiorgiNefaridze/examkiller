import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";

// import CreateRoomDrawer from "../CreateRoomDrawer";
import { deleteCookie, getCookie } from "../../helpers/cookie";

import { Routes } from "../../../Routes";

import Logo from "../../assets/examkillerlogo.png";
import { NavWrapper } from "./Navbar.style";
import { ButtonGroup, Button } from "./Navbar.style";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const user = getCookie("user");
  const isLead = user?.role === "Lead";

  const navigate = useNavigate();

  const handleOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleLogout = () => {
    deleteCookie("user");
    navigate(Routes.Login.path);
  };

  return (
    null
    // <NavWrapper>
    //   <img src={Logo} onClick={() => navigate(Routes.Dashboard.path)} />
    //   <ButtonGroup>
    //     {isLead && <Button onClick={handleOpen}>Create Room</Button>}
    //     <Button onClick={handleLogout}>Logout</Button>
    //   </ButtonGroup>
    //   {/* {isDrawerOpen && <CreateRoomDrawer setIsDrawerOpen={setIsDrawerOpen} />} */}
    // </NavWrapper>
  );
};

export default memo(Navbar);
