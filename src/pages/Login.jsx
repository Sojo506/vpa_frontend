import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsDoorClosed, BsDoorOpen } from "react-icons/bs";
import useAuth from "../hooks/useAuth";
import axiosClient from "../config/axios";
import handleInput from "../utils/handleInput";
import Toast from "../components/Toast";

const Login = () => {
  const { setAuth } = useAuth();
  const [viewPassword, setViewPassword] = useState(false);
  const [alert, setAlert] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleViewPassword() {
    setViewPassword(!viewPassword);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (Object.values(input).includes("")) {
      setAlert({ msg: "All fields are required", error: true });
      setShowToast(true);

      return;
    }

    if (input.password.length < 8) {
      setAlert({ msg: "Your password must have 8 characters", error: true });
      setShowToast(true);
      return;
    }

    // Create user
    try {
      const url = "/veterinarian/login";

      const { data } = await axiosClient.post(url, {
        email: input.email,
        password: input.password,
      });

      const { profile } = data;

      setAlert({ msg: "Logged In", error: false });
      localStorage.setItem("vpa_token", profile.token);
      setAuth(profile);
      navigate("/admin");
    } catch (error) {
      setAlert({ msg: error.response.data.code, error: true });
    }

    setShowToast(true);
  }

  return (
    <>
      {showToast && <Toast payload={alert} open={setShowToast} />}
      <div>
        <h1 className="text-indigo-600 font-bold text-6xl text-center md:text-left select-none xl:p-10">
          Log In and Admin your <span className="text-black">Patiens</span>
        </h1>
      </div>
      <div className="shadow-lg p-5 rounded bg-white w-full xl:w-[70%]">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="email" className="font-bold text-xl block">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@example.com"
              className="text-black outline-none border rounded p-2 mt-1 w-full xl:w-[90%] bg-gray-50"
              value={input.email}
              onChange={(event) => {
                handleInput(event, setInput);
              }}
            />
          </div>
          <div className="">
            <label htmlFor="password" className="font-bold text-xl block">
              Password
            </label>
            <div className="relative">
              <input
                type={viewPassword ? "text" : "password"}
                id="password"
                className="text-black outline-none border rounded p-2 mt-1 w-full xl:w-[90%] bg-gray-50"
                value={input.password}
                onChange={(event) => {
                  handleInput(event, setInput);
                }}
              />
              {viewPassword ? (
                <BsDoorOpen
                  className="absolute top-[40%] right-2 cursor-pointer text-xl"
                  onClick={handleViewPassword}
                />
              ) : (
                <BsDoorClosed
                  className="absolute top-[40%] right-2 cursor-pointer text-xl"
                  onClick={handleViewPassword}
                />
              )}
            </div>
          </div>

          <input
            type="submit"
            value="Log In"
            className="bg-indigo-700 text-white rounded uppercase py-3 font-bold hover:cursor-pointer md:w-[50%] hover:bg-indigo-800"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            to="/register"
            className="hover:text-indigo-800 text-sm block text-center"
          >
            Don't you have an account yet?{" "}
            <span className="font-bold text-indigo-800">Sign Up!</span>
          </Link>
          <Link
            to="/forgot-password"
            className="hover:text-indigo-800 text-sm block text-center mt-1 lg:mt-0"
          >
            Did you forget your password?{" "}
            <span className="font-bold text-indigo-800">Get it back!</span>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;
