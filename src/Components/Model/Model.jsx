import React, { useState } from "react";
import classNames from "classnames";
import { AiFillCloseCircle } from "react-icons/ai";

const Modal = ({ title, children, setShow }) => {
  const handleClose = () => {
    setShow(false);
  };
  return (
    <div className="container-fluid fixed bg-opacity-90 bg-gray-300 items-center flex justify-center w-screen h-screen top-0 left-0 z-[99999]">
      <button onClick={handleClose} className="absolute  top-[3%] right-[6%]">
        <AiFillCloseCircle className="text-2xl text-blue-500" />
      </button>
      <div className="card bg-white shadow-lg pb-4 px-4 rounded-xl flex flex-col w-[70vw] md:w-[30vw] lg:w-[20vw] h-auto justify-center items-center">
        <div className="card-header w-full text-center   bg-blue-500 text-white">
          <h1 className="font-bold my-1">{title}</h1>
        </div>
        <div className="card-body w-full px-3">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
