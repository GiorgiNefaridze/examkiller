import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";

import { QueryClientWrapper } from "../QueryClientWrapper.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientWrapper>
    <Router>
      <App />
    </Router>
  </QueryClientWrapper>
);
