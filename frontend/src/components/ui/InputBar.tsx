import React from "react";

interface IProps {
  width: number;
  height: number;
  color: string;
  isPassword: boolean;
}

export default function InputBar({
  width,
  height,
  color = "bg-white",
  isPassword = false,
}: IProps) {
  return (
    <input
      type={isPassword ? "password" : "text"}
      className={`w-[${width}px] h-[${height}px] ${color}`}
    />
  );
}
