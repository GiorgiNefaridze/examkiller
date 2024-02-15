import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

import InputLabel from "../../components/InputLabel/InputLabel";
import Role from "../../components/Role/Role";
import { ToastAlert } from "../../components/Toast/Toast";

import { Routes } from "../../../Routes";
import { roles, emailPattern, type RoleType } from "../../../constants";
import { useRegister } from "../../hooks/Auth/useRegister";

type Field = "Nickname" | "Email" | "Password" | "Role";
export type FormType = Record<Field, string>;

const BUTTON_STEPS = ["Next", "Sumbit"];

const Register = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<string>(roles[0].name); //Default role = Student

  const { data, error, mutateAsync: SignUp } = useRegister();

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: { Role: role },
  });

  const navigate = useNavigate();

  const getFormFields = (field: Field) => ({
    ...register(field, {
      pattern: field === "Email" && {
        value: emailPattern.pattern,
        message: emailPattern.message,
      },
      required: { value: true, message: "Please fill the following field" },
    }),
  });

  const SubmitClick = handleSubmit(async (data) => {
    if (step < 2) {
      setStep((step) => step + 1);
      return;
    }

    await SignUp(data);
    reset();
  });

  return (
    <section className="w-full h-[100vh] flex items-center relative">
      <div className="w-1/2 h-full block max-md:hidden">
        <img
          className="w-full h-full object-cover"
          src={
            "https://images.unsplash.com/photo-1484807352052-23338990c6c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
      </div>

      <form
        className="w-1/2 h-full px-10 md:px-24 gap-y-10 flex flex-col justify-center max-md:w-full"
        onSubmit={SubmitClick}
      >
        <div className="flex flex-col justify-start gap-y-1">
          <h1 className="font-bold text-3xl md:text-4xl">Create new account</h1>
          <p className="text-gray-500">
            Already have?{" "}
            <span
              className="text-blue-500 font-bold cursor-pointer"
              onClick={() => navigate(Routes.Login.path)}
            >
              Login
            </span>
          </p>
        </div>

        {step === 2 && (
          <div className="w-ful flex items-center gap-7">
            {roles.map((eachRole: RoleType) => {
              return (
                <Role
                  key={eachRole.name}
                  setRole={setRole}
                  role={role}
                  setValue={setValue}
                  {...eachRole}
                />
              );
            })}
          </div>
        )}

        {step === 1 && (
          <>
            <InputLabel
              label="Enter nickname"
              type="text"
              register={getFormFields("Nickname")}
              placeholder="Your nickname"
              name="Nickname"
              error={errors}
            />

            <InputLabel
              label="Your email"
              type="email"
              register={getFormFields("Email")}
              placeholder="name@gmail.com"
              name="Email"
              error={errors}
            />

            <InputLabel
              label="Enter password"
              type="password"
              register={getFormFields("Password")}
              placeholder="**********"
              name="Password"
              error={errors}
            />
          </>
        )}

        <Button type="submit" className="bg-blue-500 hover:!bg-blue-700">
          {BUTTON_STEPS[step - 1]}
        </Button>
      </form>

      {(error || data) && (
        <ToastAlert
          successMessage={data?.response}
          errorMessage={error?.message}
        />
      )}
    </section>
  );
};

export default memo(Register);
