import { createElement } from "react";
import { Routes, Route } from "react-router-dom";

import { Routes as RoutePaths } from "../Routes";

import { ResetCSS } from "./Index.style";

const App = () => {
  return (
    <>
      <ResetCSS />
      <Routes>
        {Object.values(RoutePaths)?.map(({ path, component }, idx) => {
          return (
            <Route path={path} element={createElement(component)} key={idx} />
          );
        })}
      </Routes>
    </>
  );
};

export default App;
