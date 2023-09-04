import { useState } from "react";
import Modal from "../Components/Model/Model"; // Import a custom modal component
import swal from "sweetalert"; // Import the SweetAlert library for confirmation dialogs
import {
  useAllUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateStatusMutation,
  useUpdateUserMutation,
} from "../features/UserSlice"; // Import user-related query and mutation functions
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for edit and delete
import { useAllRolesQuery } from "../features/RoleSlice"; // Import role-related query
import useHandleForm from "../hook/useHandleForm"; // Import a custom hook for handling form input
import { Toastify } from "../Helper/Toastify"; // Import a custom toast notification component

const User = () => {
  // State variables for user ID and modal visibility
  const [Id, setId] = useState(null);
  const [show, setShow] = useState(false);

  // Form input state and handling hook
  const { input, setInput, handleInput } = useHandleForm({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  // User slice data loading and mutation functions
  const { data, isError, error, isLoading, isSuccess } = useAllUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateStatus] = useUpdateStatusMutation();

  // Role slice data loading
  const {
    data: RoleData,
    isError: isRoleError,
    error: RoleError,
    isLoading: isRoleLoading,
    isSuccess: isRoleSuccess,
  } = useAllRolesQuery();

  // Handle user deletion
  const handDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteUser(id);
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  // Handle user edit
  const handleEdit = (id) => {
    setId(id);
    setInput({ ...data.user.find((item) => item._id === id) });
    setShow(true);
  };

  // Handle user status update
  const handleStatus = (id, status) => {
    console.log(status);
    updateStatus({ id, input: { status: !status } });
    Toastify("Status updated", "success");
  };

  // Check user data from the user slice
  let content;
  let Rolecontent = "";
  if (isError) {
    content = <h1>{error}</h1>;
  }
  if (isLoading) {
    content = <h1 className="text-center my-5 animate-bounce">...Loading</h1>;
    console.log(data);
  }
  if (isSuccess) {
    if (data.user.length > 0) {
      content = data.user?.map((item, index) => {
        return (
          <tr key={item.id}>
            <td className="px-4 py-2 sm:px-6 sm:py-4">{index + 1}</td>
            <td className="px-4 py-2 sm:px-6 sm:py-4">{item.name}</td>
            <td className="px-4 py-2 sm:px-6 sm:py-4">{item.role?.name}</td>
            <td className="px-4 py-2 sm:px-6 sm:py-4">
              <label className="inline-flex items-center">
                <input
                  onChange={() => handleStatus(item._id, item.status)}
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
                <FaEdit /> {/* Replace text with icon */}
              </button>
              <button
                onClick={() => handDelete(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
              >
                <FaTrash /> {/* Replace text with icon */}
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

  // Check role data from the role slice
  if (isRoleError) {
    Rolecontent = <h1>{RoleError}</h1>;
  }
  if (isRoleLoading) {
    Rolecontent = <h1>...Loading</h1>;
    console.log(data);
  }
  if (isRoleSuccess) {
    Rolecontent = RoleData.role?.map((item, index) => {
      return (
        <option
          selected={input.role?.name === item.name}
          value={item._id}
          key={index}
        >
          {item.name}
        </option>
      );
    });
  }

  // Handle form submission
  const handSubmit = (e) => {
    e.preventDefault();
    if (Id) {
      updateUser({ Id, input });
      Toastify("Updated User!", "success");
      setShow(false);
      setInput({
        name: "",
        email: "",
        password: "",
        role: "",
      });
    } else {
      createUser(input);
      Toastify("Created User!", "success");
      setShow(false);
      setInput({
        name: "",
        email: "",
        password: "",
        role: "",
      });
    }
  };

  // Return the main component
  return (
    <div className=" w-full h-auto flex justify-center">
      {show && (
        <Modal title="Add User" setShow={setShow}>
          <form
            onSubmit={handSubmit}
            action=""
            className="flex flex-col gap-2 mt-5"
          >
            <label htmlFor="" className="w-full text-blue-500">
              Name
            </label>
            <input
              placeholder="Your name please ?"
              name="name"
              value={input.name}
              onChange={handleInput}
              autoComplete="off"
              className="w-full text-sm focus:outline-none"
              type="text"
            />
            <label htmlFor="" className="w-full text-blue-500">
              Email
            </label>
            <input
              name="email"
              value={input.email}
              onChange={handleInput}
              autoComplete="off"
              placeholder="Your email please ?"
              className="w-full text-sm focus:outline-none"
              type="text"
            />
            {!Id ? (
              <>
                <label htmlFor="" className="w-full text-blue-500">
                  Password
                </label>
                <input
                  name="password"
                  value={input.password}
                  onChange={handleInput}
                  autoComplete="off"
                  placeholder="Your password please ?"
                  className="w-full text-sm focus:outline-none"
                  type="password"
                />
              </>
            ) : (
              ""
            )}
            <label htmlFor="" className="w-full text-blue-500">
              Role
            </label>
            <select
              name="role"
              value={input.role._id}
              onChange={handleInput}
              className="focus:outline-none"
            >
              <option value="">...</option>
              {Rolecontent}
            </select>
            <button
              type="submit"
              className="bg-blue-400 text-white py-1 rounded-full hover:bg-blue-600"
            >
              Add
            </button>
          </form>
        </Modal>
      )}

      <div className="w-[90%] lg:w-[70%] md:[60%] ">
        <div className=" w-full">
          <div className="bg-gradient-to-r mb-5 from-blue-400 via-purple-500 to-pink-400 py-5">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-4">
              <h1 className="text-center text-xl font-extrabold text-white mb-4 sm:mb-0">
                User Table
              </h1>
              <button
                onClick={() => {
                  setShow(true);
                  setInput({
                    name: "",
                    email: "",
                    password: "",
                    role: "",
                  });
                  setId(null);
                }}
                className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 text-white"
              >
                Add User
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="w-full overflow-hidden">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 text-white">
                  <tr>
                    <th className="px-4 py-2 sm:px-6 sm:py-3 text-left font-medium">
                      ID
                    </th>
                    <th className="px-4 py-2 sm:px-6 sm:py-3 text-left font-medium">
                      Name
                    </th>
                    <th className="px-4 py-2 sm:px-6 sm:py-3 text-left font-medium">
                      Role
                    </th>
                    <th className="px-4 py-2 sm:px-6 sm:py-3 text-left font-medium">
                      Status
                    </th>
                    <th className="px-4 py-2 sm:px-6 sm:py-3 text-left font-medium">
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
    </div>
  );
};

export default User;
