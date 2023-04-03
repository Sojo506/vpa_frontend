import { useState } from "react";
import handleInput from "../utils/handleInput";
import Toast from "./Toast";
import useAuth from "../hooks/useAuth";
import usePatient from "../hooks/usePatient";
import { useEffect } from "react";

const Form = () => {
  const [showToast, setShowToast] = useState(false);
  const [alert, setAlert] = useState("");
  const [input, setInput] = useState({
    name: "",
    owner: "",
    email: "",
    dischargeDate: "",
    symptoms: "",
  });
  const [id, setId] = useState(null);

  const { auth } = useAuth();
  const { addPatient, patient, setPatient } = usePatient();

  async function handleSubmit(e) {
    e.preventDefault();
    //console.log(input);

    if (Object.values(input).includes("")) {
      setAlert({ msg: "All fields are required", error: true });
      setShowToast(true);

      return;
    }

    await addPatient({ ...input, id });
    if (id) {
      setAlert({ msg: "Patient eddited", error: false });
    } else {
      setAlert({ msg: "Patient added", error: false });
    }
    setShowToast(true);

    resetStates();
  }

  function resetStates() {
    setInput({
      name: "",
      owner: "",
      email: "",
      dischargeDate: "",
      symptoms: "",
    });
    setId(null);
    setPatient({});
  }

  useEffect(() => {
    if (Object.keys(patient).length) {
      const { __v, _id, veterinarian, ...editPatient } = patient;

      setId(_id);
      setInput({ ...editPatient });
    }
  }, [patient]);

  return (
    <>
      {showToast && <Toast payload={alert} open={setShowToast} />}
      <h2 className="font-black text-2xl md:text-3xl text-center">
        Patient's Form
      </h2>

      <p className="text-xl mt-5 mb-10 text-center">
        Add your Patients and{" "}
        <span className="text-indigo-800 font-bold">Admin Them</span>
      </p>

      <form
        className="bg-white p-5 mb-10 md:mb-0 rounded shadow"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label htmlFor="name" className="font-bold text-gray-700 uppercase">
            Pet's name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Ponky"
            className="outline-none border-2 w-full mt-2 placeholder-gray-400 rounded p-2"
            value={input.name}
            onChange={(event) => {
              handleInput(event, setInput);
            }}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="owner" className="font-bold text-gray-700 uppercase">
            Owner's name
          </label>
          <input
            id="owner"
            type="text"
            placeholder="Mr. Smith"
            className="outline-none border-2 w-full mt-2 placeholder-gray-400 rounded p-2"
            value={input.owner}
            onChange={(event) => {
              handleInput(event, setInput);
            }}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="font-bold text-gray-700 uppercase">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@example.com"
            className="outline-none border-2 w-full mt-2 placeholder-gray-400 rounded p-2"
            value={input.email}
            onChange={(event) => {
              handleInput(event, setInput);
            }}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="dischargeDate"
            className="font-bold text-gray-700 uppercase"
          >
            Discharge Date
          </label>
          <input
            id="dischargeDate"
            type="date"
            className="outline-none border-2 w-full mt-2 placeholder-gray-400 rounded p-2"
            value={input.dischargeDate}
            onChange={(event) => {
              handleInput(event, setInput);
            }}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="symptoms"
            className="font-bold text-gray-700 uppercase"
          >
            Symptoms
          </label>
          <textarea
            id="symptoms"
            placeholder="Detail the symptoms"
            className="outline-none border-2 w-full mt-2 placeholder-gray-400 rounded p-2 resize-none"
            maxLength={235}
            value={input.symptoms}
            onChange={(event) => {
              handleInput(event, setInput);
            }}
          />
        </div>

        <div className="flex gap-2">
          <input
            type="submit"
            value={id ? "Save Changes" : "Add Patient"}
            className="bg-indigo-700 text-white rounded uppercase py-3 font-bold hover:cursor-pointer w-full hover:bg-indigo-800 transition-colors"
          />
          {id && (
            <button
              type="button"
              className="bg-red-700 text-white rounded uppercase py-3 font-bold hover:cursor-pointer w-full hover:bg-red-800 transition-colors"
              onClick={resetStates}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default Form;
