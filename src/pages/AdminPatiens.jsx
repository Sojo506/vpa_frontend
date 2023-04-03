import { useState } from "react";
import Form from "../components/Form";
import PatientList from "../components/PatientList";

const AdminPatiens = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <button
        type="button"
        className="bg-indigo-600 text-white font-bold uppercase mx-10 mb-10 p-3 rounded md:hidden"
        onClick={() => {
          setShowForm(!showForm);
        }}
      >
        {showForm ? "Hide Form" : "Show Form"}
      </button>
      <div
        className={`${
          showForm ? "block" : "hidden"
        } md:w-1/2 md:block lg:w-2/5`}
      >
        <Form />
      </div>
      <div className="md:w-1/2 lg:w-3/5">
        <PatientList setShowForm={setShowForm} />
      </div>
    </div>
  );
};

export default AdminPatiens;
