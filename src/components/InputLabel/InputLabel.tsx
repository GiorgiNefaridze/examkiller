import { ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

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
      <h3>{label}</h3>
      <input type={type} {...register} placeholder={inputPlaceholder} />
    </LabelContainer>
  );
};

export default InputLabel;
