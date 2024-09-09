import { HiOutlineUser } from "react-icons/hi2";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { useNavigate } from "react-router-dom";

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <>
      <ButtonIcon>
        <HiOutlineUser onClick={() => navigate("/account")} />
      </ButtonIcon>
      <Logout />
    </>
  );
}

export default HeaderMenu;
