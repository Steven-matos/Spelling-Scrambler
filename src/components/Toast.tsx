import React from "react";

export type ToastType = "success" | "warning" | "error";

interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  const toastStyles = {
    success: "bg-green-500 text-white",
    warning: "bg-orange-500 text-black",
    error: "bg-red-500 text-white",
  };

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded shadow-lg ${toastStyles[type]} transition-transform duration-1000 ease-in-out`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4">
          &times;
        </button>
      </div>
    </div>
  );
};
