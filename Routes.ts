import { type MemoExoticComponent, type ReactNode } from "react";

import Login from "./src/pages/Login/Login";
import Register from "./src/pages/Register/Register";
import Dashboard from "./src/pages/Dashboard/Dashboard";
import Group from "./src/pages/Group/Group";

type PathKeys = "Login" | "Register" | "Dashboard" | "Group";
type Paths = { path: string; component: MemoExoticComponent<() => ReactNode> };
type RoutesType = Record<PathKeys, Paths>;

const Routes: RoutesType = {
  Login: {
    path: "/Login",
    component: Login,
  },
  Register: {
    path: "/Register",
    component: Register,
  },
  Group: {
    path: "/Group",
    component: Group,
  },
  Dashboard: {
    path: "/",
    component: Dashboard,
  },
} as const;

export { Routes };
