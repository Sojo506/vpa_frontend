import { useState } from "react";
import axiosClient from "../config/axios";
import { Link } from "react-router-dom";
import { BsDoorClosed, BsDoorOpen } from "react-icons/bs";
import Toast from "../components/Toast";
import handleInput from "../utils/handleInput";

const Register = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [input, setInput] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [alert, setAlert] = useState("");
  //const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

    /* if (regex.test(email)) {
      setAlert({ msg: "That email is wrong, check it out", error: true });
      return setShowToast(true);
    } */

    if (input.password !== input.cpassword) {
      setAlert({ msg: "Both passwords must be the same", error: true });
      setShowToast(true);

      return;
    }

    if (input.password.length < 8) {
      setAlert({
        msg: "Your password must be at least 8 characters long",
        error: true,
      });
      setShowToast(true);
      return;
    }

    // Create user
    try {
      const url = "/veterinarian/register";

      await axiosClient.post(url, {
        name: input.name,
        lastName: input.lastName,
        email: input.email,
        password: input.password,
      });

      setAlert({ msg: "Account created, check your email", error: false });
      setShowToast(true);
    } catch (error) {
      setAlert({ msg: "There was an error", error: true });
      setShowToast(true);
    }
  }

  return (
    <>
      {showToast && <Toast payload={alert} open={setShowToast} />}
      <div>
        <h1 className="text-indigo-600 font-bold text-6xl text-center md:text-left select-none">
          Create an Account <span className="text-black"></span>
        </h1>
      </div>
      <div className="shadow-lg p-5 rounded bg-white w-full xl:w-[70%]">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="name" className="font-bold text-xl block">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={input.name}
              placeholder="Your name"
              className="border rounded p-2 mt-1 w-full xl:w-[90%] bg-gray-50"
              onChange={(event) => {
                handleInput(event, setInput);
              }}
            />
          </div>
          <div className="">
            <label htmlFor="lastName" className="font-bold text-xl block">
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              value={input.lastName}
              placeholder="Your last name"
              className="border rounded p-2 mt-1 w-full xl:w-[90%] bg-gray-50"
              onChange={(event) => {
                handleInput(event, setInput);
              }}
            />
          </div>
          <div className="">
            <label htmlFor="email" className="font-bold text-xl block">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={input.email}
              placeholder="example@example.com"
              className="border rounded p-2 mt-1 w-full xl:w-[90%] bg-gray-50"
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
                value={input.password}
                className="border rounded p-2 mt-1 w-full xl:w-[90%] bg-gray-50"
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
          <div className="">
            <label htmlFor="cpassword" className="font-bold text-xl block">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={viewPassword ? "text" : "password"}
                id="cpassword"
                value={input.cpassword}
                className="border rounded p-2 mt-1 w-full xl:w-[90%] bg-gray-50"
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
            value="Sign Up"
            className="bg-indigo-700 text-white rounded uppercase py-3 font-bold hover:cursor-pointer md:w-[50%] hover:bg-indigo-800"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            to="/"
            className="hover:text-indigo-800 text-sm block text-center"
          >
            Already have an account?{" "}
            <span className="font-bold text-indigo-800">Log In!</span>
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

export default Register;
