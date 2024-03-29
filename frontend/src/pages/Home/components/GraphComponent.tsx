import React, { useEffect, useState } from "react";
import LiveGraph from "./LiveGraph";
import GraphPoint from "../GraphPoint";
import randomInt from "../../../utils/randomInt";
import { TradeDataProps } from "../../../interfaces";

interface IProps {
  tradeData: TradeDataProps[] | undefined;
}

export default function GraphComponent({ tradeData }: IProps) {
  const [points, setPoints] = useState<GraphPoint[]>([]);
  const [valueColor, setValueColor] = useState<string>("#6cc54c");

  const [prevPointsAmount, setPrevPointsAmount] = useState<number>(0);

  const spacing = 3;
  const canvasHeight = 500;
  const [canvasWidth, setCanvasWidth] = useState<number>(500);

  useEffect(() => {
    const updateCanvasWidth = () => {
      const screenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

      if (screenWidth <= 600) {
        setCanvasWidth(500);
      } else {
        setCanvasWidth(1400);
      }
    };
    updateCanvasWidth();
    window.addEventListener("resize", updateCanvasWidth);
    return () => {
      window.removeEventListener("resize", updateCanvasWidth);
    };
  }, []);

  const maxPoints = 75;

  // useEffect(() => {
  //   setPoints([...points, new GraphPoint(currentPrice)]);
  // }, [currentPrice]);

  useEffect(() => {
    let tempPoints = [];
    for (let i = 0; i < 1; i++) {
      tempPoints.push(new GraphPoint(0));
    }
    setPoints(tempPoints);
  }, []);

  useEffect(() => {
    if (tradeData && tradeData[tradeData.length - 1].price) {
      addDataPoint(tradeData[tradeData.length - 1].price);
    }
  }, [tradeData]);

  function addDataPoint(val: number) {
    if (val) {
      if (points.length >= maxPoints) {
        const newArr = [...points.slice(1), new GraphPoint(val)];
        setPoints(newArr);
      } else {
        const newPoint = new GraphPoint(val);
        setPoints((prev) => [...prev, newPoint]);
      }
    }
  }

  useEffect(() => {
    if (!points || points.length <= 2) return;
    if (
      points[points.length - 1].pointValue ===
      points[points.length - 2].pointValue
    ) {
      return;
    }
    if (
      points[points.length - 1].pointValue <=
      points[points.length - 2].pointValue
    ) {
      setValueColor("#c54c4c");
    } else {
      setValueColor("#6cc54c");
    }
  }, [points]);

  return (
    <>
      <div className="w-[100%] flex justify-center absolute mobile:relative">
        <div className="flex items-center h-[200px]">
          <h1
            style={{
              color: valueColor,
            }}
            className="text-[70px] mobile:text-[40px]  tracking-wider text-outlined-decoration"
          >
            {tradeData && <>${tradeData[tradeData.length - 1].price}</>}
          </h1>
        </div>
      </div>
      {canvasWidth >= 900 && (
        <div className="border-text pb-[100px] flex justify-center underline">
          <LiveGraph
            canvasWidth={1400}
            canvasHeight={canvasHeight}
            points={points}
            setPoints={setPoints}
            spacing={spacing}
            prevPointsAmount={prevPointsAmount}
            setPrevPointsAmount={setPrevPointsAmount}
          />
        </div>
      )}
    </>
  );
}
