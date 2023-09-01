import {
  useAllpermissionssQuery,
  useCreatepermissionMutation,
} from "../features/PermissionsSlice";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import useHandleForm from "../hook/useHandleForm";
import { useState } from "react";
import Modal from "../Components/Model/Model";

const Permissions = () => {
  const { data, isError, error, isLoading, isSuccess } =
    useAllpermissionssQuery();
  const [createpermission] = useCreatepermissionMutation();
  const { input, handleInput } = useHandleForm({
    name,
  });
  let content = "";
  if (isError) {
    content = <h1>{error}</h1>;
  }
  if (isLoading) {
    content = <h1 className="text-center my-5 animate-bounce">...Loading</h1>;
  }
  if (isSuccess) {
    content = data.permission?.map((item, index) => {
      return (
        <tr key={item.id} className="bg-white flex  justify-between  p-2">
          <td className="">{index + 1}</td>
          <td className="">{item.name}</td>

          <td className="">
            <input type="checkbox" />
          </td>
          <td className=" flex gap-5">
            <span>
              <AiFillEdit />
            </span>
            <span>
              <AiFillDelete />
            </span>
          </td>
        </tr>
      );
    });
  }

  const [show, setShow] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();
    createpermission({ name: input.name });
  };

  return (
    <div className=" w-full h-auto flex justify-center">
      {show && (
        <Modal title="Add Permission" setShow={setShow}>
          <form
            onSubmit={handleForm}
            action=""
            className="flex flex-col gap-2 mt-5"
          >
            <label htmlFor="" className="w-full text-blue-500">
              Name
            </label>
            <input
              onChange={handleInput}
              name="name"
              value={input.name}
              placeholder="Please enter permission ?"
              className="w-full text-sm focus:outline-none"
              type="text"
            />

            <button
              type="submit"
              className="bg-blue-400 text-white py-1 rounded-full hover:bg-blue-600"
            >
              Add Permission
            </button>
          </form>
        </Modal>
      )}
      <div className="w-[90%] lg:w-[70%] md:[60%] ">
        <div className=" w-full">
          <div className="flex justify-between items-center py-5">
            <h1 className=" text-center text-xl font-extrabold">
              Permissions Table
            </h1>
            <button
              onClick={() => setShow(true)}
              className="bg-blue-500 px-2 py-1 rounded-md hover:bg-blue-600 text-white"
            >
              Add Permission
            </button>
          </div>
          <table className=" table w-full">
            <thead className="bg-gradient-to-r  from-blue-400 via-purple-500 to-pink-400 text-white">
              <tr className="flex justify-between text-center p-2">
                <th className="">ID</th>
                <th className="">Name</th>

                <th className="">Status</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Permissions;
