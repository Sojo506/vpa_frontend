import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { closeSession } = useAuth();

  function handleButton() {
    closeSession();
  }
  return (
    <header className="py-10 bg-indigo-600">
      <div className="container mx-auto flex justify-between items-center flex-col md:flex-row md:items-baseline">
        <h1 className="font-bold text-2xl text-indigo-200 text-center">
          Veterinary Patient{" "}
          <span className="text-white font-black">Administrator</span>
        </h1>

        <nav className="flex gap-2 mt-5 md:mt-0">
          <Link
            to="/admin"
            className="text-white text-base font-bold uppercase hover:text-black"
          >
            Patients
          </Link>
          <div className="border-2 bg-slate-800"></div>
          <Link
            to="/admin/profile"
            className="text-white text-base font-bold uppercase hover:text-black"
          >
            Profile
          </Link>
          <div className="border-2 bg-slate-800"></div>
          <button
            type="button"
            className="text-white text-base font-bold uppercase hover:text-black"
            onClick={handleButton}
          >
            Log Out
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
