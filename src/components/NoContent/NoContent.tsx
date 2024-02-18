import NoContentImg from "../../assets/nocontent.svg";

const NoContent = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5">
      <img src={NoContentImg} className="w-1/2" />
    </div>
  );
};

export default NoContent;
