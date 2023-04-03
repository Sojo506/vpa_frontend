import usePatient from "../hooks/usePatient";

const Patient = ({ patient, setShowForm }) => {
  const { edditPatient, deletePatient } = usePatient();
  const { name, email, owner, dischargeDate, symptoms, _id } = patient;

  function formatDate(date) {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
      newDate
    );
  }

  function handleEdditPatient(patient) {
    edditPatient(patient);
  }

  function handleDeletePatient(id) {
    deletePatient(id);
  }

  return (
    <div className="bg-white p-5 mb-10 md:mb-0 rounded shadow grid gap-3">
      <p className="font-bold uppercase text-indigo-900">
        Pet's name:{" "}
        <span className="font-normal normal-case text-black">{name}</span>
      </p>
      <p className="font-bold uppercase text-indigo-900">
        Owner's name:{" "}
        <span className="font-normal normal-case text-black">{owner}</span>
      </p>
      <p className="font-bold uppercase text-indigo-900">
        email{" "}
        <span className="font-normal normal-case text-black">{email}</span>
      </p>
      <p className="font-bold uppercase text-indigo-900">
        Discharge Date:{" "}
        <span className="font-normal normal-case text-black">
          {formatDate(dischargeDate)}
        </span>
      </p>
      <p className="font-bold uppercase text-indigo-900">
        symptoms:{" "}
        <span className="font-normal normal-case text-black">{symptoms}</span>
      </p>

      <div className="flex justify-between my-5">
        <button
          type="button"
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded"
          onClick={() => {
            handleEdditPatient(patient);
            setShowForm(true);
          }}
        >
          Edit
        </button>
        <button
          type="button"
          className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded"
          onClick={() => handleDeletePatient(_id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Patient;
