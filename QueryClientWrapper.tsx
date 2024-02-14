import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  type QueryClientConfig,
} from "@tanstack/react-query";

type QClientWrapperType<T> = (props: { children: T }) => T;

const QueryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
};

const QueryClientWrapper: QClientWrapperType<JSX.Element> = ({ children }) => {
  const [client] = useState(() => new QueryClient(QueryClientConfig));

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export { QueryClientWrapper };
