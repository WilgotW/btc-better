import Bet from "./Bet";

interface IProps {
  betData: any;
}

export default function BetsBoard({ betData }: IProps) {
  return (
    <div className="h-[350px] mobile:h-[195px] p-[50px] mobile:pb-0 mobile:p-[25px]">
      <div className="bg-g1 h-[100%] w-[500px] mobile:w-[100%] rounded-[10px] mobile:rounded-[5px] flex flex-col">
        <div className="flex justify-center p-[10px] mobile:p-[5px] bg-nvb rounded">
          <h1 className="text-[20px] mobile:text-[10px] text-g1 tracking-wide">
            BETS
          </h1>
        </div>
        <div className="flex flex-col max-h-[200px] mobile:max-h-[100%] gap-[25px] mobile:gap-[12px] overflow-y-scroll pt-3 mobile:pt-2 pb-3 mobile:pb-2">
          {betData?.map((bet: any, i) => (
            <Bet
              key={i}
              amount={bet.amount}
              startDate={bet.startdate}
              duration={bet.duration}
              profit={bet.profit}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
