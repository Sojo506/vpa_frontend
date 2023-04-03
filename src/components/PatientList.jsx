import usePatient from "../hooks/usePatient";
import Patient from "./Patient";

const PatientList = ({ setShowForm }) => {
  const { patients } = usePatient();

  return (
    <>
      {patients.length ? (
        <>
          <h2 className="font-black text-2xl md:text-3xl text-center">
            Patient's List
          </h2>

          <p className="text-xl mt-5 mb-10 text-center">
            Admin your Patients and{" "}
            <span className="text-indigo-800 font-bold">appointments!</span>
          </p>

          <div className="grid gap-5">
            {patients.map((p) => (
              <Patient setShowForm={setShowForm} key={p._id} patient={p} />
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="font-black text-2xl md:text-3xl text-center">
            There Aren't Patients
          </h2>

          <p className="text-xl mt-5 mb-10 text-center">
            Start by adding{" "}
            <span className="text-indigo-800 font-bold">patients!</span>
          </p>
        </>
      )}
    </>
  );
};

export default PatientList;
