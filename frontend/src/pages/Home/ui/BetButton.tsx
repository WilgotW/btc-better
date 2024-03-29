import goldStack from "../../../assets/gold-stack.png";

interface IProps {
  amount: number;
  setSelectedAmount: React.Dispatch<React.SetStateAction<number>>;
  selectedAmount: number | undefined;
}
export default function BetButton({
  amount = 100,
  setSelectedAmount,
  selectedAmount,
}: IProps) {
  function handleButton(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    ev.preventDefault();

    if (selectedAmount === amount) {
      setSelectedAmount(0);
    } else {
      setSelectedAmount(amount);
    }
  }
  return (
    <div
      onClick={(ev) => handleButton(ev)}
      className={`flex bg-[${
        selectedAmount === amount ? "#F5F5F5" : "#001F3F"
      }] w-[200px] mobile:w-[100px] h-[100%] border rounded-[10px] mobile:rounded-[5px] justify-around cursor-pointer select-none`}
    >
      <div className="w-[70px] mobile:w-[30px] h-[70px] mobile:h-[30px]">
        <img
          className={`${selectedAmount === amount ? "black" : "white-image"}`}
          src={goldStack}
          alt=""
        />
      </div>
      <div
        className={`flex items-center w-[100px] mobile:w-[50px] text-[17px] mobile:text-[11px] gap-1`}
      >
        <span
          style={{
            color: selectedAmount === amount ? "gray" : "white",
          }}
          className="mobile:text-[0px]"
        >
          BET
        </span>
        <span
          style={{
            color: selectedAmount === amount ? "gray" : "white",
          }}
        >
          {amount}$
        </span>
      </div>
    </div>
  );
}
