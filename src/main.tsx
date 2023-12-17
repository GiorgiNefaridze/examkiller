import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { QueryClientWrapper } from "../QueryClientWrapper.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <QueryClientWrapper>
      <Router>
        <App />
      </Router>
    </QueryClientWrapper>
  </ChakraProvider>
);
