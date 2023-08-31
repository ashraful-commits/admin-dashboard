import { useState } from "react";

export const useButton = () => {
  const [show, setShow] = useState(false);
  const handleShowMenu = () => {
    setShow(!show);
  };
  return { show, setShow, handleShowMenu };
};

export default useButton;
