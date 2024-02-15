import { memo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

import InputLabel from "../../components/InputLabel/InputLabel";

import { ToastAlert } from "../../components/Toast/Toast";
import { Routes } from "../../../Routes";
import { emailPattern } from "../../../constants";
import { useLogin } from "../../hooks/Auth/useLogin";

type Field = "Email" | "Password";
export type LoginType = Record<Field, string>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();

  const navigate = useNavigate();
  const { error, mutateAsync: SignIn } = useLogin();

  const getFormFields = (field: Field) => ({
    ...register(field, {
      pattern: field === "Email" && {
        value: emailPattern.pattern,
        message: emailPattern.message,
      },
      required: { value: true, message: "Please fill the following field" },
    }),
  });

  const SubmitForm = handleSubmit(async (data) => {
    await SignIn(data);
  });

  return (
    <section className="w-full h-[100vh] flex items-center relative">
      <form
        className="w-1/2 h-full px-10 md:px-24 gap-y-10 flex flex-col justify-center max-md:w-full"
        onSubmit={SubmitForm}
      >
        <div className="flex flex-col justify-start gap-y-1">
          <h1 className="font-bold text-3xl md:text-4xl">
            Sign in to your account
          </h1>
          <p className="text-gray-500">
            Not a member?{" "}
            <span
              className="text-blue-500 font-bold cursor-pointer"
              onClick={() => navigate(Routes.Register.path)}
            >
              Register
            </span>
          </p>
        </div>

        <InputLabel
          label="Your email"
          type="email"
          register={getFormFields("Email")}
          placeholder="name@gmail.com"
          name="Email"
          error={errors}
        />
        <InputLabel
          label="Your password"
          type="password"
          register={getFormFields("Password")}
          placeholder="**********"
          name="Password"
          error={errors}
        />
        <Button type="submit" className="bg-blue-500 hover:!bg-blue-700">
          Submit
        </Button>
      </form>

      <div className="w-1/2 h-full block max-md:hidden">
        <img
          className="w-full h-full object-cover"
          src={
            "https://images.unsplash.com/photo-1484807352052-23338990c6c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
      </div>
      {error && <ToastAlert errorMessage={error?.message} />}
    </section>
  );
};

export default memo(Login);
