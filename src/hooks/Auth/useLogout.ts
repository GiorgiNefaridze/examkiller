import { useNavigate } from "react-router-dom";

import { deleteCookie } from "../../helpers/cookie";
import { Routes } from "../../../Routes";

const useLogout = () => {
  const navigate = useNavigate();

  deleteCookie("user");
  navigate(Routes.Login.path);
};

export { useLogout };
