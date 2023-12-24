import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CreateRoomDrawer from "../CreateRoomDrawer";
import { NavWrapper } from "./Navbar.style";
import { deleteCookie } from "../../helpers/cookie";

import Logo from "../../assets/examkillerlogo.png";
import { Routes } from "../../../Routes";

import { ButtonGroup, Button } from "./Navbar.style";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleLogout = () => {
    deleteCookie("user");
    navigate(Routes.Login.path);
  };

  return (
    <NavWrapper>
      <img src={Logo} />
      <ButtonGroup>
        <Button onClick={handleOpen}>Create Room</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </ButtonGroup>
      {isDrawerOpen && <CreateRoomDrawer setIsDrawerOpen={setIsDrawerOpen} />}
    </NavWrapper>
  );
};

export default Navbar;
