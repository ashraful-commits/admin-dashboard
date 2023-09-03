import {
  useAllpermissionssQuery,
  useCreatepermissionMutation,
  useDeletepermissionMutation,
  useUpdatePermissionStatusMutation,
  useUpdatepermissionMutation,
} from "../features/PermissionsSlice";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import useHandleForm from "../hook/useHandleForm";
import { useState } from "react";
import Modal from "../Components/Model/Model";
import swal from "sweetalert";

import { Toastify } from "../Helper/Toastify";

const Permissions = () => {
  //=================================== all state
  const [show, setShow] = useState(false);
  const [Id, setId] = useState(false);
  //=================================== permisson slice loaded
  const { data, isError, error, isLoading, isSuccess } =
    useAllpermissionssQuery();
  const [createpermission] = useCreatepermissionMutation();
  const [updatepermission] = useUpdatepermissionMutation();
  const [updatePermissionStatus] = useUpdatePermissionStatusMutation();
  const [deletepermission] = useDeletepermissionMutation();
  const { input, setInput, handleInput } = useHandleForm({
    name,
  });
  //=========================================== handle Edit
  const handleEdit = (id) => {
    setId(id);
    setShow(true);
    setInput({ ...data.permission.find((item) => item._id === id) });
  };
  //=========================================== handle status
  const handlePermissionStatus = (id, status) => {
    updatePermissionStatus({ id, input: { status: !status } });
    Toastify("Permission status updated!", "success");
  };
  //============================================ handle delete
  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deletepermission(id);
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  //========================================= check permisson data load or not
  let content = "";
  if (isError) {
    content = <h1>{error}</h1>;
  }
  if (isLoading) {
    content = <h1 className="text-center my-5 animate-bounce">...Loading</h1>;
  }
  if (isSuccess) {
    if (data.permission.length > 0) {
      content = data.permission?.map((item, index) => {
        return (
          <tr key={item.id} className="bg-white p-2">
            <td className="px-4 py-2 sm:px-6 sm:py-4">{index + 1}</td>
            <td className="px-4 py-2 sm:px-6 sm:py-4">{item.name}</td>
            <td className="px-4 py-2 sm:px-6 sm:py-4">
              <label className="inline-flex items-center">
                <input
                  onChange={() => handlePermissionStatus(item._id, item.status)}
                  type="checkbox"
                  checked={item.status}
                  className="form-checkbox text-indigo-600 h-5 w-5 sm:h-6 sm:w-6"
                />
                <span className="ml-2 text-gray-800">Active</span>
              </label>
            </td>
            <td className="px-4 py-2 sm:px-6 sm:py-4 space-x-2">
              <button
                onClick={() => handleEdit(item._id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
              >
                <AiFillEdit /> {/* Replace text with icon */}
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
              >
                <AiFillDelete /> {/* Replace text with icon */}
              </button>
            </td>
          </tr>
        );
      });
    } else {
      content = (
        <h1 className="text-center my-5 animate-bounce">data not found</h1>
      );
    }
  }
  //============================================== handle form submit
  const handleForm = (e) => {
    e.preventDefault();
    if (Id) {
      updatepermission({ Id, input: { name: input.name } });
      setId(null);
      setInput({ name: "" });
      setShow(false);
    } else {
      createpermission({ name: input.name });
      setId(null);
      setInput({ name: "" });
      setShow(false);
    }
  };
  //================================================ main function return
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
          <div className="bg-gradient-to-r mb-5 from-blue-400 via-purple-500 to-pink-400 py-5">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-4">
              <h1 className="text-center text-xl font-extrabold text-white mb-4 sm:mb-0">
                Permissions Table
              </h1>
              <button
                onClick={() => {
                  setShow(true);
                  setInput({ name: "" });
                  setId(null);
                }}
                className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 text-white"
              >
                Add Permission
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 text-white">
                <tr>
                  <th className="w-1/6 px-4 py-2 sm:w-1/12 sm:px-6 sm:py-3 text-left font-medium">
                    ID
                  </th>
                  <th className="w-2/6 px-4 py-2 sm:w-3/12 sm:px-6 sm:py-3 text-left font-medium">
                    Name
                  </th>
                  <th className="w-1/6 px-4 py-2 sm:w-1/12 sm:px-6 sm:py-3 text-left font-medium">
                    Status
                  </th>
                  <th className="w-2/6 px-4 py-2 sm:w-2/12 sm:px-6 sm:py-3 text-left font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 divide-y divide-gray-200">
                {content}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Permissions;
