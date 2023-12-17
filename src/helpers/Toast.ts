import { toast } from "sonner";

const Toast = (err: string, succ: string) => {
  Boolean(err) ? toast.error(err) : toast.success(succ);
};

export { Toast };
