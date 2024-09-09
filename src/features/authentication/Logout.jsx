import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogout from "./useLogout";
import ButtonIcon from "../../ui/ButtonIcon";

function Logout() {
  const { logout } = useLogout();
  return (
    <ButtonIcon>
      <HiArrowRightOnRectangle onClick={logout} />
    </ButtonIcon>
  );
}

export default Logout;
