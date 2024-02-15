import { createElement, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { Routes as RoutePaths } from "../Routes";
import { ProtectedRoute } from "./helpers/protectedRoute";
import { getCookie } from "./helpers/cookie";

import Navbar from "./components/Navbar/Navbar";

const App = () => {
  const [isShowNavbar, setIsShowNavbar] = useState<boolean>(false);

  const user = getCookie("user");

  const { pathname } = useLocation();

  useEffect(() => {
    setIsShowNavbar(user && Object.keys(user)?.length ? true : false);
  }, [pathname]);

  return (
    <div className="w-full h-[100vh] overflow-hidden">
      {isShowNavbar && <Navbar />}
      <Routes>
        {Object.values(RoutePaths)?.map(({ path, component }, idx) => {
          return (
            <Route
              path={path}
              element={
                <ProtectedRoute path={path}>
                  {createElement(component)}
                </ProtectedRoute>
              }
              key={idx}
            />
          );
        })}
      </Routes>
    </div>
  );
};

export default App;
