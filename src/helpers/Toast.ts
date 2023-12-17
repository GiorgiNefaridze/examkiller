import { toast } from "sonner";

const Toast = (err: string, succ: string | undefined) => {
  Boolean(err) ? toast.error(err) : toast.success(succ);
};

export { Toast };
