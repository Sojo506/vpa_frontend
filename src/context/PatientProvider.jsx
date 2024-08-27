import { createContext, useState, useEffect } from 'react';
import axiosClient from '../config/axios';
import useAuth from '../hooks/useAuth';

const PatientContext = createContext();

const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({});
  const { auth, loading } = useAuth();

  async function addPatient(patient) {
    const vpaToken = localStorage.getItem('vpa_token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${vpaToken}`,
      },
    };

    if (patient.id) {
      try {
        const url = `/patient/${patient.id}`;
        const { data } = await axiosClient.put(url, patient, config);

        const newPatientState = patients.map((p) =>
          p._id === data.patient._id ? data.patient : p
        );

        setPatients(newPatientState);
        return data;
      } catch (error) {
        return { success: false, error: error.response?.data || error.message };
      }
    } else {
      try {
        const url = '/patient/register';
        const { data } = await axiosClient.post(url, patient, config);

        const { createdAt, updateAta, __v, ...newPatient } = data.patient;

        setPatients([...patients, newPatient]);

        return data;
      } catch (error) {
        return { success: false, error: error.response?.data || error.message };
      }
    }
  }

  function edditPatient(patient) {
    setPatient(patient);
  }

  async function deletePatient(id) {
    const sure = confirm('Do you want to delete it, sure?');

    if (!sure) return;

    const vpaToken = localStorage.getItem('vpa_token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${vpaToken}`,
      },
    };

    try {
      const url = `/patient/${id}`;
      const { data } = await axiosClient.delete(url, config);

      if (!data.success) return;

      const newPatientState = patients.filter((p) => p._id !== id);

      setPatients(newPatientState);
      return data;
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const vpaToken = localStorage.getItem('vpa_token');

        if (!vpaToken) return;

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${vpaToken}`,
          },
        };

        const url = '/patient/get-all';
        const { data } = await axiosClient(url, config);

        setPatients([...patients, ...data.patients]);

        return data;
      } catch (error) {
        return { success: false, error: error.response?.data || error.message };
      }
    })();

    return () => {
      setPatients([]);
    };
  }, [auth]);

  return (
    <PatientContext.Provider
      value={{
        patients,
        patient,
        addPatient,
        edditPatient,
        deletePatient,
        setPatient,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export { PatientProvider };

export default PatientContext;
