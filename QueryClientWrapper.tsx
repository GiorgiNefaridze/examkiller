import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type QClientWrapperType<T> = (props: { children: T }) => T;

const client = new QueryClient();

const QueryClientWrapper: QClientWrapperType<JSX.Element> = ({ children }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export { QueryClientWrapper };
