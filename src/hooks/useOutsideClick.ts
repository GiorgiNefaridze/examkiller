import { Dispatch, RefObject, SetStateAction } from "react";

type OutsideClickType = (
  ref1: RefObject<HTMLDivElement>,
  ref2: RefObject<HTMLDivElement>,
  handleClose: Dispatch<SetStateAction<boolean>>
) => { outsideClick: (e) => void };

const useOutsideClick: OutsideClickType = (ref1, ref2, handleClose) => {
  const outsideClick = (e) => {
    const { target } = e;

    if (!ref1?.current?.contains(target) && !ref2?.current?.contains(target)) {
      handleClose(false);
    }
  };

  return { outsideClick };
};

export { useOutsideClick };
