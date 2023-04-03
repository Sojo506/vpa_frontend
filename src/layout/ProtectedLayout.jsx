import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { MoonLoader } from "react-spinners";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProtectedLayout = () => {
  const { auth, loading } = useAuth();

  if (loading)
    return (
      <div className="grid place-items-center h-screen">
        <MoonLoader color="#36d7b7" size={100} />;
      </div>
    );

  return (
    <>
      <Header />
      {auth?._id ? (
        <main className="container mx-auto mt-10">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/" />
      )}
      <Footer />
    </>
  );
};

export default ProtectedLayout;
