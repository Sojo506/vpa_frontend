import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main
        className="mx-auto grid md:grid-cols-2 md:gap-10 px-5 h-screen 
      items-center md:place-items-center overflow-hidden"
      >
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
