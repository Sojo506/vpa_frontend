import { useEffect } from "react";
import { useState } from "react";
import { BsDoorClosed, BsDoorOpen } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import Toast from "../components/Toast";
import axiosClient from "../config/axios";
import handleInput from "../utils/handleInput";

const ResetPassword = () => {
  const [input, setInput] = useState({
    password: "",
    cpassword: "",
  });
  const [viewPassword, setViewPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [passwordModified, setPasswordModified] = useState(false);
  const [alert, setAlert] = useState({
    msg: "",
    error: false,
  });
  const [showForm, setShowForm] = useState(true);
  const params = useParams();
  const { token } = params;

  function handleViewPassword() {
    setViewPassword(!viewPassword);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (input.password !== input.cpassword) {
      setAlert({ msg: "Both passwords must be the same", error: true });
      return setShowToast(true);
    }

    if (input.password.length < 8) {
      setAlert({ msg: "Your password must have 8 characters", error: true });
      return setShowToast(true);
    }

    const url = `/veterinarian/forgot-password/${token}`;

    try {
      const { data } = await axiosClient.post(url, {
        password: input.password,
      });
      setAlert({ msg: data.code, error: false });
      setPasswordModified(true);
    } catch (error) {
      setAlert({ msg: "There was an error", error: true });
      setShowForm(false);
    }

    setShowToast(true);
  }
  useEffect(() => {
    (async () => {
      const url = `/veterinarian/forgot-password/${token}`;

      try {
        await axiosClient(url);
        setAlert({ msg: "Change your password", error: false });
      } catch (error) {
        setAlert({ msg: "There was an error", error: true });
        setShowForm(false);
      }
      setShowToast(true);
    })();
  }, []);

  return (
    <>
      {showToast && <Toast payload={alert} open={setShowToast} />}
      <div>
        <h1 className="text-indigo-600 font-bold text-6xl text-center md:text-left select-none xl:p-10">
          Reset your Password and Don't{" "}
          <span className="text-black">Lose your Patiens</span>
        </h1>
      </div>
      <div className="shadow-lg p-5 rounded bg-white w-full xl:w-[70%]">
        {showForm && (
          <>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="">
                <label className="font-bold text-xl block">New password</label>
                <div className="relative">
                  <input
                    type={viewPassword ? "text" : "password"}
                    id="password"
                    className="text-black border rounded p-2 mt-1 w-full xl:w-[90%] bg-gray-50"
                    onChange={(event) => {
                      handleInput(event, setInput);
                    }}
                    value={input.password}
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
                <label className="font-bold text-xl block">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={viewPassword ? "text" : "password"}
                    className="text-black border rounded p-2 mt-1 w-full xl:w-[90%] bg-gray-50"
                    id="cpassword"
                    onChange={(event) => {
                      handleInput(event, setInput);
                    }}
                    value={input.cpassword}
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

              <div
                className={`relative ${
                  alert && alert.error && "cursor-not-allowed"
                }`}
              >
                <input
                  type="submit"
                  value="Confirm change"
                  className="bg-indigo-700 text-white rounded uppercase py-3 font-bold hover:cursor-pointer md:w-[50%] hover:bg-indigo-800"
                />
              </div>
            </form>

            {passwordModified && (
              <nav className="mt-10">
                <Link
                  to="/"
                  className="hover:text-indigo-800 text-sm block text-center font-bold"
                >
                  Log In!
                </Link>
              </nav>
            )}
          </>
        )}
        {!showForm && (
          <nav className={`${showForm ? "mt-10" : "mt-0"}`}>
            <Link
              to="/"
              className="hover:text-indigo-800 text-sm block text-center"
            >
              Already have an account?{" "}
              <span className="font-bold text-indigo-800">Log In!</span>
            </Link>
            <Link
              to="/register"
              className="hover:text-indigo-800 text-sm block text-center"
            >
              Don't you have an account yet?{" "}
              <span className="font-bold text-indigo-800">Sign Up!</span>
            </Link>
          </nav>
        )}
      </div>
    </>
  );
};

export default ResetPassword;
