import { CgSmileSad } from "react-icons/cg";

const NoContent = () => {
  return (
    <div className="w-full h-full flex items-center justify-center gap-5">
      <h1 className="text-2xl font-bold">Nothing is here</h1>
      <CgSmileSad size={40} />
    </div>
  );
};

export default NoContent;
