import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/darkModeContext";

function DarkModeToggle() {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <ButtonIcon onClick={toggleTheme}>
      {theme ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
