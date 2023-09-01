import { useState } from "react";

const useHandleForm = (initialState) => {
  const [input, setInput] = useState(initialState);

  const handleInput = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return { input, setInput, handleInput };
};

export default useHandleForm;
