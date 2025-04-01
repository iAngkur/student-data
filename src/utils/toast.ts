import { toast } from "react-toastify";

const commonOptions = {
  position: "top-right" as const,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  toastId: "",
};

export const showToast = {
  success: (message: string, autoClose: number = 3000) => {
    toast.success(message, { ...commonOptions, autoClose, toastId: message });
  },
  error: (message: string, autoClose: number = 4000) => {
    toast.error(message, { ...commonOptions, autoClose, toastId: message });
  },
  warning: (message: string, autoClose: number = 3500) => {
    toast.warning(message, { ...commonOptions, autoClose, toastId: message });
  },
  info: (message: string, autoClose: number = 2500) => {
    toast.info(message, { ...commonOptions, autoClose, toastId: message });
  },
};

export const showSuccessToast = showToast.success;
export const showErrorToast = showToast.error;
export const showWarningToast = showToast.warning;
export const showInfoToast = showToast.info;
