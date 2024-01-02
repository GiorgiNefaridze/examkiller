import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { getCookie } from "./cookie";
import { Routes } from "../../Routes";

type PropType = {
  children: ReactNode;
  path: string;
};
type ProtectedRouteType = (prop: PropType) => ReactNode;

const ProtectedRoute: ProtectedRouteType = ({ children, path }) => {
  const user = getCookie("user");

  if (path === Routes.Dashboard.path && !user) {
    return <Navigate to={Routes.Login.path} />;
  }

  if (user && path !== Routes.Dashboard.path && path !== Routes.Group.path) {
    return <Navigate to={Routes.Dashboard.path} />;
  }

  return children;
};

export { ProtectedRoute };
