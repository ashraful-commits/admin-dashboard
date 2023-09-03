import { AiFillCloseCircle } from "react-icons/ai";

const Modal = ({ title, children, setShow }) => {
  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-md">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <div className="flex justify-end p-4">
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <AiFillCloseCircle className="text-3xl" />
          </button>
        </div>
        <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 p-4">
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
