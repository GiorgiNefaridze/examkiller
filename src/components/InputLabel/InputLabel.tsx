import { Label, TextInput } from "flowbite-react";
import { type FieldErrors, type UseFormRegisterReturn } from "react-hook-form";

import { type FormType } from "../../pages/Register/Register";

type InputLabelProps = {
  label: string;
  type: string;
  register: UseFormRegisterReturn;
  error: FieldErrors<FormType>;
  placeholder: string;
  name: string;
};

const InputLabel = ({
  label,
  type,
  register,
  error,
  placeholder,
  name,
}: InputLabelProps) => {
  const errorMessage = error[name]?.message;

  return (
    <div>
      <div className="mb-2 block">
        <Label className="text-xl" htmlFor={type} value={label} />
      </div>
      <input
        id={type}
        type={type}
        placeholder={placeholder}
        {...register}
        className="w-full rounded-lg px-4 py-2 !ring-opacity-0 !ring-red-700"
        style={{ borderColor: errorMessage ? "red" : "grey" }}
      />
      {errorMessage && <p className="text-red-700 mt-2">{errorMessage}</p>}
    </div>
  );
};

export default InputLabel;
