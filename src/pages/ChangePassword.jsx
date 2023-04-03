import { useEffect } from "react";
import { useState } from "react";
import { BsDoorClosed, BsDoorOpen } from "react-icons/bs";
import handleInput from "../utils/handleInput";
import AdminNav from "../components/AdminNav";
import Toast from "../components/Toast";
import useAuth from "../hooks/useAuth";

const ChangePassword = () => {
  const { updatePassword } = useAuth();
  const [changed, setChanged] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [alert, setAlert] = useState({ msg: "", error: false });
  const [input, setInput] = useState({
    currentPassword: "",
    newPassword: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (Object.values(input).includes("")) {
      setAlert({ msg: "Both fields are required", error: true });
      setShowToast(true);
      return;
    }

    if (input.newPassword.length < 8) {
      setAlert({
        msg: "Your password must be at least 8 characters long",
        error: true,
      });
      setShowToast(true);
      return;
    }

    const response = await updatePassword(input);
    
    if (response.success) {
      setAlert({
        msg: response.code,
        error: false,
      });
      setShowToast(true);
    } else {
      setAlert({
        msg: response.code,
        error: true,
      });
      setShowToast(true);
    }
  }

  function handleViewPassword() {
    setViewPassword(!viewPassword);
  }

  useEffect(() => {
    if (Object.values(input).some((key) => key !== "")) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  }, [input]);

  return (
    <>
      <AdminNav />
      {showToast && <Toast payload={alert} open={setShowToast} />}
      <h2 className="font-semibold text-3xl text-center mt-10">
        Change Password
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modify your{" "}
        <span className="text-indigo-600 font-bold">Password Here</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded p-5">
          <form className="my-3 grid gap-4" onSubmit={handleSubmit}>
            <div className="">
              <label
                htmlFor="currentPassword"
                className="uppercase font-bold text-gray-600 block"
              >
                Your Current Password
              </label>
              <div className="relative">
                <input
                  type={viewPassword ? "text" : "password"}
                  id="currentPassword"
                  value={input.currentPassword}
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
              <label
                htmlFor="newPassword"
                className="uppercase font-bold text-gray-600 block"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={viewPassword ? "text" : "password"}
                  id="newPassword"
                  value={input.newPassword}
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
              value={changed ? "Update Password" : "Edit Something First"}
              className={`${
                changed ? "bg-indigo-700" : "bg-gray-700"
              } text-white rounded uppercase py-3 font-bold hover:cursor-pointer w-full hover:${
                changed ? "bg-indigo-800" : "bg-gray-800"
              } transition-colors `}
              disabled={changed ? false : true}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
