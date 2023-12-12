import Lead from "./src/assets/Professor-pana.png";
import Student from "./src/assets/Student stress-rafiki.png";

export type RoleType = {
  name: string;
  img: ReturnType<typeof Lead>;
};

const roles: RoleType[] = [
  { name: "Student", img: Student },
  { name: "Lead", img: Lead },
] as const;

export { roles };
