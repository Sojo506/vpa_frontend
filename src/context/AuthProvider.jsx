import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../config/axios";
import usePatient from "../hooks/usePatient";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();

  function closeSession() {
    localStorage.removeItem("vpa_token");
    setAuth({});
  }

  async function updateProfile(veterinarian) {
    const vpaToken = localStorage.getItem("vpa_token");

    if (!vpaToken) {
      return setLoading(false);
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${vpaToken}`,
      },
    };

    const url = `/veterinarian/profile/${veterinarian._id}`;

    try {
      const { data } = await axiosClient.put(url, veterinarian, config);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  async function updatePassword(passwords) {
    const vpaToken = localStorage.getItem("vpa_token");

    if (!vpaToken) {
      return setLoading(false);
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${vpaToken}`,
      },
    };

    const url = "/veterinarian/change-password";

    try {
      const { data } = await axiosClient.put(url, passwords, config);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  useEffect(() => {
    (async () => {
      const vpaToken = localStorage.getItem("vpa_token");

      if (!vpaToken) {
        return setLoading(false);
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${vpaToken}`,
        },
      };

      const url = "/veterinarian/profile";

      try {
        const { data } = await axiosClient(url, config);
        setAuth(data.profile);
        navigate("/admin");
      } catch (error) {
        setAuth({});
      }

      setLoading(false);
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        closeSession,
        updateProfile,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
