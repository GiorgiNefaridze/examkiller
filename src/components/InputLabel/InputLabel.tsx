import { ReactNode } from "react";
import { type UseFormRegisterReturn } from "react-hook-form";

import { LabelContainer } from "./InputLabel.style";

type PropsType = {
  label: string;
  type: string;
  register: UseFormRegisterReturn;
};

type InputLabelType = (props: PropsType) => ReactNode;

const InputLabel: InputLabelType = ({ label, type, register }) => {
  const inputPlaceholder = "Enter your " + label.toLowerCase();

  return (
    <LabelContainer>
      <input type={type} {...register} placeholder={inputPlaceholder} />
    </LabelContainer>
  );
};

export default InputLabel;
