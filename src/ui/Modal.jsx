import { createContext, useContext, useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const StyledOpen = styled.div`
  display: inline-block;
  width: fit-content;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
const modalContext = createContext();
function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const handleCloseModal = () => {
    setOpenName("");
  };
  const handleOpenModal = (name) => {
    setOpenName(name);
  };

  return (
    <modalContext.Provider
      value={{ handleCloseModal, handleOpenModal, openName }}
    >
      {children}
    </modalContext.Provider>
  );
}

const Open = ({ children, name, line = true }) => {
  const { handleOpenModal } = useContext(modalContext);
  if (line) return <div onClick={() => handleOpenModal(name)}>{children}</div>;
  else
    return (
      <StyledOpen onClick={() => handleOpenModal(name)}>{children}</StyledOpen>
    );
};

const Window = ({ children, name }) => {
  const { handleCloseModal, openName } = useContext(modalContext);
  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target))
        handleCloseModal();
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [handleCloseModal]);

  if (name !== openName) return null;
  else
    return (
      <Overlay>
        <StyledModal ref={modalRef}>
          <CloseButton onClick={() => handleCloseModal()}>
            <IoMdClose />
          </CloseButton>
          {children}
        </StyledModal>
      </Overlay>
    );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
export { modalContext };
