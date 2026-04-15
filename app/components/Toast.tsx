"use client";

type ToastProps = {
  message: string;
  type: "success" | "error";
};

export default function Toast({ message, type }: ToastProps) {
  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg text-white animate-slide-down
      ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
    >
      {message}
    </div>
  );
}
