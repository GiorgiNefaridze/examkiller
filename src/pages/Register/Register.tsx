import { memo } from "react";
import { useForm } from "react-hook-form";

import InputLabel from "../../components/InputLabel/InputLabel";

import Laptop from "../../assets/laptop.png";
import { Wrapper, Form, SideBar, Button, HaveAccount } from "./Register.style";

type Field = "Nickname" | "Email" | "Password";
type FormType = {
  Nickname: string;
  Email: string;
  Password: string;
};

const Register = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormType>();

  const onSubmit = (data) => {
    console.log(data);
  };

  const getFormFields = (field: Field) => ({
    ...register(field),
  });

  return (
    <Wrapper>
      <Form>
        <h1>Register account 🚀</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputLabel
            label="Nickname"
            type="text"
            register={{ ...getFormFields("Nickname") }}
          />
          <InputLabel
            label="Email"
            type="email"
            register={{ ...getFormFields("Email") }}
          />
          <InputLabel
            label="Password"
            type="password"
            register={{ ...getFormFields("Password") }}
          />
          <Button type="submit">Submit</Button>
        </form>
        <HaveAccount>Already have an account?</HaveAccount>
      </Form>
      <SideBar>
        <img src={Laptop} />
      </SideBar>
    </Wrapper>
  );
};

export default memo(Register);
