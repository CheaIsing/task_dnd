import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const showToast = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warning":
      toast.warning(message);
      break;
    case "info":
      toast.info(message);
      break;
    case "default":
      toast(message);
      break;
    case "dark":
      toast.dark(message);
      break;
    default:
      toast('hi');
  }
};

// Export both the container and toast function
export { showToast };
