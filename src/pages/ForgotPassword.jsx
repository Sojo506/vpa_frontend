import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../config/axios";
import Toast from "../components/Toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [alert, setAlert] = useState("");
  //const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  function handleInput(event) {
    setEmail(event.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (email === "") {
      setAlert({ msg: "The field is empty", error: true });
      return setShowToast(true);
    }

    /* if (regex.test(email)) {
      setAlert({ msg: "That email is wrong, check it out", error: true });
      return setShowToast(true);
    } */

    try {
      const url = "/veterinarian/forgot-password";

      await axiosClient.post(url, {
        email,
      });

      setAlert({ msg: "Email sent, check your email", error: false });
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
          Get Back your Access and Don't{" "}
          <span className="text-black">Lose your Patiens</span>
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
              value={email}
              onChange={handleInput}
            />
          </div>

          <input
            type="submit"
            value="Help!"
            className="bg-indigo-700 text-white rounded uppercase py-3 font-bold hover:cursor-pointer md:w-[50%] hover:bg-indigo-800"
          />
        </form>

        <nav className="mt-10">
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
      </div>
    </>
  );
};

export default ForgotPassword;
