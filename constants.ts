import Lead from "./src/assets/Professor-pana.png";
import Student from "./src/assets/Student stress-rafiki.png";

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

export { roles, emailPattern, type RoleOptionType, type RoleType };
