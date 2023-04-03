import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import ProtectedLayout from "./layout/ProtectedLayout";

import ConfirmAccount from "./pages/ConfirmAccount";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import AdminPatiens from "./pages/AdminPatiens";

import { AuthProvider } from "./context/AuthProvider";
import { PatientProvider } from "./context/PatientProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PatientProvider>
          <Routes>
            {/* PUBLIC AREA */}
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route
                path="forgot-password/:token"
                element={<ResetPassword />}
              />
              <Route path="confirm/:token" element={<ConfirmAccount />} />
            </Route>

            {/* PRIVATE AREA */}
            <Route path="/admin" element={<ProtectedLayout />}>
              <Route index element={<AdminPatiens />} />
              <Route path="profile" element={<EditProfile />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>
          </Routes>
        </PatientProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
