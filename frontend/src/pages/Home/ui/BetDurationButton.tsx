import React from "react";
import clock from "../../../assets/clock.png";

interface IProps {
  time: number;
}

export default function BetDurationButton({ time = 2 }: IProps) {
  return (
    <div className="select-none w-[200px] h-[70px] bg-g1 rounded-[10px] flex justify-around items-center pl-1 pr-1">
      <div className="w-[40px] flex justify-around">
        <img src={clock} alt="clock-icon" />
      </div>
      <div className="w-[130px] flex justify-right">
        <h1 className="text-[20px]">from now: {time ? time : 0}h</h1>
      </div>
    </div>
  );
}
