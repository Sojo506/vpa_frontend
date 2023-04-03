import { useEffect } from "react";
import { useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import handleInput from "../utils/handleInput";
import Toast from "../components/Toast";

const EditProfile = () => {
  const { auth, updateProfile, setAuth } = useAuth();
  const [input, setInput] = useState({});
  const [changed, setChanged] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [alert, setAlert] = useState({ msg: "", error: false });

  async function handleSubmit(e) {
    e.preventDefault();

    if (!changed) return;

    const { _id, __v, web, phone, ...newInput } = input;

    if (Object.values(newInput).includes("")) {
      setAlert({ msg: "Name, Last name and Email are required", error: true });
      setShowToast(true);

      return;
    }

    const response = await updateProfile(input);

    if (response.success) {
      setAlert({ msg: response.code, error: false });
      setAuth(response.profile);
    } else setAlert({ msg: response.code, error: true });

    setShowToast(true);
    setChanged(false);
  }

  function handleReset() {
    setInput(auth);
  }

  useEffect(() => {
    setInput(auth);
  }, [auth]);

  useEffect(() => {
    let counter = 0;

    Object.keys(input).forEach((key) => {
      if (input[key] !== auth[key]) {
        counter++;
      }
    });

    if (counter) setChanged(true);
    else setChanged(false);
  }, [input]);

  return (
    <>
      <AdminNav />
      {showToast && <Toast payload={alert} open={setShowToast} />}

      <h2 className="font-semibold text-3xl text-center mt-10">Edit Profile</h2>
      <p className="text-xl mt-5 mb-10  text-center">
        Modify your <span className="text-indigo-600 font-bold">Data Here</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded p-5">
          <form className="my-3 grid gap-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="uppercase font-bold text-gray-600 block"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={input.name || ""}
                className="border rounded p-2 mt-1 w-full xl:w-[90%] bg-gray-50"
                onChange={(event) => {
                  handleInput(event, setInput);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="uppercase font-bold text-gray-600 block"
              >
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                value={input.lastName || ""}
                className="border rounded p-2 mt-1 w-full xl:w-[90%] bg-gray-50"
                onChange={(event) => {
                  handleInput(event, setInput);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="web"
                className="uppercase font-bold text-gray-600 block"
              >
                Web
              </label>
              <input
                type="text"
                id="web"
                value={input.web || ""}
                className="border rounded p-2 mt-1 w-full xl:w-[90%] bg-gray-50"
                onChange={(event) => {
                  handleInput(event, setInput);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="uppercase font-bold text-gray-600 block"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={input.phone || ""}
                className="border rounded p-2 mt-1 w-full xl:w-[90%] bg-gray-50"
                onChange={(event) => {
                  handleInput(event, setInput);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="uppercase font-bold text-gray-600 block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={input.email || ""}
                className="border rounded p-2 mt-1 w-full xl:w-[90%] bg-gray-50"
                onChange={(event) => {
                  handleInput(event, setInput);
                }}
              />
            </div>

            <div className="flex gap-2">
              <input
                type="submit"
                value={changed ? "Save changes" : "Edit something first"}
                className={`${
                  changed ? "bg-indigo-700" : "bg-gray-700"
                } text-white rounded uppercase py-3 font-bold hover:cursor-pointer w-full hover:${
                  changed ? "bg-indigo-800" : "bg-gray-800"
                } transition-colors `}
                disabled={changed ? false : true}
              />
              {changed && (
                <button
                  type="button"
                  className="bg-red-700 text-white rounded uppercase py-3 font-bold hover:cursor-pointer w-full hover:bg-red-800 transition-colors"
                  onClick={handleReset}
                >
                  Reset
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
