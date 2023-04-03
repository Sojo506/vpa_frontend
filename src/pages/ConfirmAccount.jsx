import axiosClient from "../config/axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Toast from "../components/Toast";

const ConfirmAccount = () => {
  const params = useParams();
  const { token } = params;
  const [showToast, setShowToast] = useState(true);
  const [loading, setLoading] = useState(true);
  const [payload, setPayload] = useState({});

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/veterinarian/confirm/${token}`;
        const { data } = await axiosClient(url);

        setPayload({ msg: "Account confirmed", error: false });
      } catch (error) {
        setPayload({
          msg: "Invalid token",
          error: true,
        });
      }
      setLoading(false);
    };
    confirmAccount();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirm your Account and Start to Admin{" "}
          <span className="text-black">your Patients</span>
        </h1>
      </div>
      {!loading && <Toast payload={{ ...payload }} open={setShowToast} />}

      {!loading && !payload.error && (
        <Link
          to="/"
          className="hover:text-indigo-800 text-xl block text-center font-bold"
        >
          Log In!
        </Link>
      )}
    </>
  );
};

export default ConfirmAccount;
