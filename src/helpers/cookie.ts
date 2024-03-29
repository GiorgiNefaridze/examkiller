import { type UserType } from "../hooks/Auth/useLogin";

const setCookie = (name: string, payload: unknown) => {
  const serializedObject = JSON.stringify(payload);

  document.cookie = `${name}=${serializedObject}`;
};

const deleteCookie = (name: string) => {
  const date = new Date(0);

  document.cookie = `${name}=; expires=${date}`;
};

const getCookie = (name: string): UserType | undefined => {
  if (!document.cookie.length) return;
  const cookie = document.cookie
    ?.split("=")
    ?.map((item, idx, arr) => {
      if (arr[idx - 1] === name) {
        return item;
      }
    })
    ?.filter((el) => el)[0];

  return JSON.parse(cookie ?? "");
};

export { setCookie, deleteCookie, getCookie };
