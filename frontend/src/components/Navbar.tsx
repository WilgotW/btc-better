import React from "react";
import icon from "../assets/goldbetter-icon.png";
import goToRoute from "../utils/goToRoute";
import { TypeOfRoutes } from "../utils/routeType";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  function goto(route: TypeOfRoutes) {
    navigate(route);
  }

  function logout() {
    localStorage.removeItem("authorization");
    window.location.reload();
  }
  return (
    <div className="relative w-[100%] h-[100px] bg-nvb flex justify-left items-center">
      <div
        onClick={() => goto("/")}
        className="flex justify-between w-[120px] h-[38px] z-10 bg-nvb ml-[30px] cursor-pointer"
      >
        <img className="white-image" src={icon} alt="icon" />
        <div className="h-[100%] flex items-center pl-[10px]">
          <h2 className="text-white tracking-wider">BTC BET</h2>
        </div>
      </div>
      <div className="w-[200px] h-[50px] absolute right-0 flex justify-around items-center text-white mr-[30px]">
        {localStorage.getItem("authorization")?.length ? (
          <div onClick={() => logout()} className="cursor-pointer">
            LOG OUT
          </div>
        ) : (
          <div onClick={() => goto("/login")} className="cursor-pointer">
            SIGN IN
          </div>
        )}

        <div onClick={() => goto("/about")} className="cursor-pointer">
          ABOUT
        </div>
      </div>
    </div>
  );
}
