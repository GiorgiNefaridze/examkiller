import { Spinner } from "flowbite-react";

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner aria-label="Default status example" size="xl" />
    </div>
  );
};

export default Loader;
