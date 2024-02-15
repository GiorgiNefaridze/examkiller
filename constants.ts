import Lead from "./src/assets/Professor-pana.png";
import Student from "./src/assets/student.png";

type RoleOptionType = "Student" | "Lead";

type RoleType = {
  name: RoleOptionType;
  img: ReturnType<typeof Lead>;
};

const roles: RoleType[] = [
  { name: "Student", img: Student },
  { name: "Lead", img: Lead },
] as const;

const emailPattern = {
  pattern: new RegExp(
    /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/
  ),
  message: "invalid email address",
};

const examTypes = ["Midterm", "Quiz"];

export { roles, emailPattern, type RoleOptionType, type RoleType, examTypes };
