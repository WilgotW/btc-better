import { useRef, useState, useEffect } from "react";
import GraphPoint from "../GraphPoint";

interface IProps {
  canvasWidth: number;
  canvasHeight: number;
  points: GraphPoint[];
  setPoints: React.Dispatch<React.SetStateAction<GraphPoint[]>>;
  spacing: number;
  prevPointsAmount: number;
  setPrevPointsAmount: React.Dispatch<React.SetStateAction<number>>;
}

export default function LiveGraph({
  points,
  canvasWidth = 500,
  canvasHeight = 300,
  spacing,
  setPoints,
  prevPointsAmount,
  setPrevPointsAmount,
}: IProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [c, setC] = useState<CanvasRenderingContext2D | null>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (context) setC(context);

    draw();
  }, []);

  useEffect(() => {
    if (points) {
      drawPoints();
    }
  }, [points]);

  function getLastNumbers(number: number, amount: number) {
    const newNum = number % amount;
    return newNum;
  }

  function draw() {
    if (!c) return;

    c.clearRect(0, 0, canvasWidth, canvasHeight);
    c.fillRect(0, 0, canvasWidth, canvasHeight);
    c.fillStyle = "#F5F5F5";
    c.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
  }

  function drawPoints() {
    if (!points || !c || points.length < 3) return;

    const spacing = 15;
    const scalePrice = 10;

    c.clearRect(0, 0, canvasWidth, canvasHeight);
    c.fillStyle = "#F5F5F5";
    c.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

    for (let i = 0; i < points.length; i++) {
      c!.strokeStyle = "#001F3F";

      const prevPoint = points[i - 1];
      const newPoint = points[i];

      c.beginPath();
      c.lineWidth = 3;
      if (prevPoint) {
        const startX = spacing * (i - 1);
        const newX = spacing * i;

        const startY =
          canvasHeight * 0.75 -
          getLastNumbers(prevPoint.pointValue, 10) * scalePrice;
        const newY =
          canvasHeight * 0.75 -
          getLastNumbers(newPoint.pointValue, 10) * scalePrice;

        c.moveTo(startX, startY);
        c.lineTo(newX, newY);
        c.closePath();
      }

      c.stroke();
    }
  }

  return (
    <canvas width={canvasWidth} height={canvasHeight} ref={canvasRef}></canvas>
  );
}
