import { createContext, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 1.6rem;
`;

const StyledOpen = styled.div`
  text-align: left;
  background: none;
  border-radius: var(--border-radius-lg);
  padding: 0.6rem 0.6rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const StyledList = styled.div`
  position: fixed;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

const StyledItem = styled.div`
  width: 100%;
  background-color: var(--color-grey-0);
  padding: 1.2rem 2.4rem;
  margin: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    color: var(--color-grey-400);
  }
`;

const menuContext = createContext();

function Menus({ children }) {
  const [openName, setOpenName] = useState("");
  const listRef = useRef();
  const handleCloseMenus = () => setOpenName("");
  const handleOpenMenus = (name) => setOpenName(name);

  return (
    <menuContext.Provider
      value={{ handleCloseMenus, handleOpenMenus, openName, listRef }}
    >
      {children}
    </menuContext.Provider>
  );
}

function Open({ children, name }) {
  const openRef = useRef();
  const { handleOpenMenus, listRef, openName } = useContext(menuContext);
  useEffect(() => {
    const updateMenuPosition = () => {
      if (name === openName && listRef.current && openRef.current) {
        const openRect = openRef.current.getBoundingClientRect();
        listRef.current.style.top = `${
          window.scrollY + openRect.top + 3 * openRect.height
        }px`;
        listRef.current.style.left = `${openRect.left + 3 * openRect.width}px`;
      }
    };

    const debouncedUpdate = debounce(updateMenuPosition, 0.1);
    updateMenuPosition();
    window.addEventListener("scroll", debouncedUpdate, true);
    return () => {
      window.removeEventListener("scroll", debouncedUpdate);
    };
  }, [openRef, listRef, openName, name]); // Dependencies ensure correct values are captured

  return (
    <Container>
      <StyledOpen ref={openRef} onClick={() => handleOpenMenus(name)}>
        {children}
      </StyledOpen>
    </Container>
  );
}

function List({ children, name }) {
  const { handleCloseMenus, openName, listRef } = useContext(menuContext);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        handleCloseMenus();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [handleCloseMenus, listRef]);

  if (name !== openName) return null;

  return <StyledList ref={listRef}>{children}</StyledList>;
}

function Item({ children }) {
  return <StyledItem>{children}</StyledItem>;
}

Menus.Open = Open;
Menus.List = List;
Menus.Item = Item;

export default Menus;

// Debounce Function
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
