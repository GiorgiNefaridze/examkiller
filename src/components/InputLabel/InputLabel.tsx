import { ReactNode } from "react";
import { type FieldErrors, type UseFormRegisterReturn } from "react-hook-form";

import { type FormType } from "../../pages/Register/Register";
import { LabelContainer } from "./InputLabel.style";

type PropsType = {
  label: string;
  type: string;
  register: UseFormRegisterReturn;
  errors: FieldErrors<FormType>;
};

type InputLabelType = (props: PropsType) => ReactNode;

const InputLabel: InputLabelType = ({ label, type, register, errors }) => {
  const inputPlaceholder = "Enter your " + label.toLowerCase();
  const isError = errors[label]?.message;

  return (
    <LabelContainer isError={isError}>
      <input type={type} {...register} placeholder={inputPlaceholder} />
      {isError && <p>{isError}</p>}
    </LabelContainer>
  );
};

export default InputLabel;
