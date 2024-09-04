import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogout from "./useLogout";

function Logout() {
  const { logout } = useLogout();
  return <HiArrowRightOnRectangle onClick={logout} />;
}

export default Logout;
