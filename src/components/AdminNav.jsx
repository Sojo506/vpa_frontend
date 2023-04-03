import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav className="flex gap-2">
      <Link
        to="/admin/profile"
        className="font-bold uppercase text-gray-500 hover:text-gray-700"
      >
        Profile
      </Link>
      <div className="border-2 bg-slate-900"></div>
      <Link
        to="/admin/change-password"
        className="font-bold uppercase text-gray-500 hover:text-gray-700"
      >
        Change Password
      </Link>
    </nav>
  );
};

export default AdminNav;
