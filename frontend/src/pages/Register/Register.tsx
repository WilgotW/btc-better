import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [missingInputs, setMissingInputs] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  async function register(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    ev.preventDefault();

    if (!allInputs()) {
      setMissingInputs(true);
      return;
    }
    setMissingInputs(false);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      console.log(data);

      navigate("/login");
    } catch (err) {
      console.error(err);
    }
    resetInputs();
    setLoading(false);
  }

  function allInputs(): boolean {
    if (!username || !email || !password) return false;
    return true;
  }

  function resetInputs() {
    setUsername("");
    setEmail("");
    setPassword("");
  }

  return (
    <div className="w-[100%] h-[1000px] flex justify-center items-center rounded">
      <div className="flex flex-col">
        <div className="bg-nvb text-white p-[20px] flex justify-center rounded">
          <h1 className="text-[20px]">Register</h1>
        </div>
        <div className="flex flex-col w-[500px] h-[500px] bg-white relative pt-6">
          <div className="flex flex-col w-[100%] gap-3">
            <div className="pl-6 pt-4 pr-6 flex flex-col">
              <TextField
                label="name"
                type="text"
                variant="outlined"
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
              />
            </div>
            <div className="pl-6 pt-4 pr-6 flex flex-col">
              <TextField
                label="email"
                type="text"
                variant="outlined"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </div>
            <div className="pl-6 pt-4 pr-6 flex flex-col">
              <TextField
                label="password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </div>
          </div>
          <div className="h-8 flex pl-6 pt-4">
            {missingInputs && (
              <span className="text-[red]">Please fill in all inputs</span>
            )}
          </div>
          <div className="w-[100%] h-[100px] items-center flex pl-7">
            <Button
              onClick={(ev) => register(ev)}
              style={{ background: "#F5F5F5", color: "black", width: "130px" }}
              variant="contained"
              color="primary"
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Register"
              )}
            </Button>
          </div>
          <div className="w-[100%] flex p-6 absolute bottom-3">
            <span>
              Already have an account?{" "}
              <u>
                <Link to={"/login"}>SIGN IN</Link>
              </u>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
