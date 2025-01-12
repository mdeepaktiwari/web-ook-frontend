import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { removeItemFromLocalStorage } from "../utils";
import { Logout as LogoutIcon } from "./Icons";

export const UserLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div
      className="fixed top-5 right-3 cursor-pointer"
      onClick={() => {
        removeItemFromLocalStorage("token");
        removeItemFromLocalStorage("user");
        logout();
        navigate("/login");
      }}
    >
      <LogoutIcon />
    </div>
  );
};
