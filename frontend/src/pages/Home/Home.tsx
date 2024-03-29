import { useEffect, useState } from "react";
import BetButton from "./ui/BetButton";
import GraphComponent from "./components/GraphComponent";
import BetDurationButton from "./ui/BetDurationButton";
import PlaceBetButton from "./ui/PlaceBetButton";
import DurationInput from "./ui/DurationInput";
import BetsBoard from "./components/BetsBoard";
import finnhubApi from "../../api/finnhub/FinnhubApi";
import hasToken from "../../utils/isLoggedIn";
import getUserData from "../../api/getUserData";
import { TradeDataProps, User } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import placeBet from "../../api/placeBet";
import checkBets from "../../api/checkBets";
import fetchEndValue from "../../api/alphavantage/fetchEndValue";
import getUserBets from "../../api/getUserBets";
import { BiRefresh } from "react-icons/bi";

export default function Home() {
  const [tradeData, setTradeData] = useState<TradeDataProps[] | undefined>(
    undefined
  );

  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [duration, setDuration] = useState<string>("1h");
  const [userData, setUserData] = useState<User>();
  const [allBets, setAllBets] = useState();

  const [noFetch, setNoFetch] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setNoFetch(false);
    async function socket() {
      finnhubApi(setTradeData, tradeData);
    }
    socket();
    fetchEndValue();
    if (!userData) {
      fetchUserData();
    }
  }, []);

  useEffect(() => {
    if (noFetch === true) {
      navigate("/login");
    }
  }, [noFetch]);

  async function fetchUserData() {
    if (hasToken()) {
      try {
        const fetchedData = await getUserData();

        if (fetchedData === undefined) {
          setNoFetch(true);
          return;
        }

        if (fetchedData.id !== undefined && fetchedData.balance !== undefined) {
          setUserData({
            userId: fetchedData.id,
            balance: fetchedData.balance,
          });
        }
      } catch (err) {
        setNoFetch(true);
        console.error(err);
      }

      const userBets = await getUserBets();

      if (!userBets) {
        console.log("no bets");
      } else {
        setAllBets(userBets);
      }
    } else {
      setNoFetch(true);
    }
  }

  async function bet(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    ev.preventDefault();

    if (tradeData && userData && selectedAmount) {
      const durationNum: number = parseInt(duration.slice(0, -1));

      const bet = await placeBet(
        userData?.userId,
        "BTC",
        durationNum,
        selectedAmount,
        tradeData[tradeData.length - 1].price
      );
      fetchUserData();
    }
  }

  async function sell(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    ev.preventDefault();
    if (tradeData) {
      const currentValue: number = tradeData[tradeData.length - 1].price;
      if (currentValue) {
        await checkBets(currentValue);
      } else {
        console.log("current value error");
      }
    }
    fetchUserData();
  }

  return (
    <div className="w-[100%] h-[100%] flex justify-center">
      <div className="w-[1500px] mobile:w-[1000px] h-[100%] bg-main flex-col relative mt-5">
        <div className="border-b">
          <GraphComponent tradeData={tradeData} />
        </div>
        <div className="mobile:flex mobile:w-[100%] mobile:justify-center">
          <div className="flex mobile:flex-col w-[100%] mobile:w-fit">
            <div className="h-[fit-content] flex flex-col mobile:flex-row mobile:w-fit gap-5 mobile:gap-3 p-[50px] mobile:p-[25px] mobile:pb-0">
              <BetButton
                amount={100}
                setSelectedAmount={setSelectedAmount}
                selectedAmount={selectedAmount}
              />
              <BetButton
                amount={1000}
                setSelectedAmount={setSelectedAmount}
                selectedAmount={selectedAmount}
              />
              <BetButton
                amount={10000}
                setSelectedAmount={setSelectedAmount}
                selectedAmount={selectedAmount}
              />
            </div>
            <div className="h-[100%] flex flex-col p-[50px] mobile:pb-0 mobile:p-[25px] gap-5 mobile:gap-3">
              <div className="flex justify-left mobile:justify-center w-[100%] gap-[30px] mobile:gap-[15px] tracking-wider h-[fit-content]">
                <div className="w-[200px] mobile:w-[125px] mobile:h-[35px] h-[70px] p-4 rounded-[10px] mobile:rounded-[5px] bg-g1 flex items-center">
                  <div className="text-[30px] mobile:text-[15px] text-g3 flex justify-between w-[100%]">
                    <div>BET:</div>
                    <div>{selectedAmount}$</div>
                  </div>
                </div>
                <div className="w-[300px] mobile:w-[175px] h-[70px] mobile:h-[35px] p-4 rounded-[10px] mobile:justify-center mobile:rounded-[5px] bg-g1 flex items-center">
                  {userData?.balance ? (
                    <h1 className="text-[25px] mobile:text-[11px] text-g3">
                      BALANCE: ${userData.balance}
                    </h1>
                  ) : (
                    <div className="flex w-[100%] items-center justify-left">
                      <h1 className="text-[25px] text-g3">
                        <div>BALANCE:</div>
                      </h1>
                      <div className="w-[40%] flex justify-center items-center">
                        <div className="loader"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* <div className="flex w-[100%] h-[70px] gap-[30px]">
              <BetDurationButton time={parseInt(duration)} />
              <DurationInput
                inputValue={duration}
                setInputValue={setDuration}
              />
              </div> */}
              <button
                onClick={(ev) => bet(ev)}
                className="select-none w-[100%]  mobile:rounded-[5px] rounded-[10px] bg-g1 h-[70px] mobile:h-[35px] flex justify-center items-center cursor-pointer hover:bg-background hover:border hover:text-black"
              >
                <h1 className="text-g3 text-[20px] mobile:text-[10px] tracking-widest ">
                  PLACE BET
                </h1>
              </button>
              <button
                onClick={(ev) => sell(ev)}
                className="select-none w-[100%]  border mobile:text-[10px] rounded-[10px] mobile:rounded-[5px] bg-[#001F3F] h-[70px] mobile:h-[35px] flex justify-center items-center cursor-pointer"
              >
                <h1 className="text-white text-[20px] mobile:text-[10px] tracking-widest ">
                  SELL ALL
                </h1>
              </button>
            </div>
            <div className="relative">
              <BetsBoard betData={allBets} />
              {/* <div className="absolute flex justify-center w-[100%] bottom-7">
              <div className="w-[50px] h-[50px] flex justify-center items-center bg-nvb rounded-full p-1 cursor-pointer">
                <BiRefresh
                  className="w-[100%] h-[100%] "
                  style={{ fill: "white" }}
                  onClick={(ev: any) => getBetsDone(ev)}
                />
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
