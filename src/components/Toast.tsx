import { Toast } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";

type ToastAlertType = {
  successMessage?: string;
  errorMessage?: string;
};

const ToastAlert = ({ successMessage, errorMessage }: ToastAlertType) => {
  return (
    <Toast className="absolute bottom-10 right-10">
      {errorMessage ? (
        <>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500">
            <HiX className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">{errorMessage}</div>
        </>
      ) : (
        <>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">{successMessage}</div>
        </>
      )}
      <Toast.Toggle />
    </Toast>
  );
};

export { ToastAlert };
