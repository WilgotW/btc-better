import React, { useEffect, useState } from "react";

interface IProps {
  amount: number;
  startDate: number;
  duration: number;
  profit: number;
}

export default function Bet({ amount, startDate, duration, profit }: IProps) {
  const [date, setDate] = useState<string>("");
  useEffect(() => {
    console.log(startDate);
    const _date = new Date(startDate * 1000);
    setDate(
      `${_date.getFullYear()}-${_date.getMonth() + 1}-${_date.getDate()}`
    );
  }, []);
  return (
    <div className="flex justify-around items-center h-[70px] mobile:h-[35px] w-[100%] text-[16px] mobile:text-[8px]">
      <div>BET: {amount}$</div>
      <div>DATE: {date}</div>
      {/* <div>DURATION: {duration}min</div> */}

      <div
        style={{
          color: profit ? (profit > 0 ? "#6CC54C" : "#C54C4C") : "black",
        }}
      >
        PROFIT:
        {profit ? <>{profit}</> : <>[PENDING]</>}
      </div>
    </div>
  );
}
