import { type MemoExoticComponent, type ReactNode } from "react";

import Login from "./src/pages/Login/Login";
import Register from "./src/pages/Register/Register";
import Dashboard from "./src/pages/Dashboard/Dashboard";

type PathKeys = "Login" | "Register" | "Dashboard";
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
  Dashboard: {
    path: "/Dashboard",
    component: Dashboard,
  },
} as const;

export { Routes };
