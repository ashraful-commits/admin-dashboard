import { useState } from "react";
import Modal from "../Components/Model/Model";
import swal from "sweetalert";
import user from "../../public/user.jpg";
import {
  useAllUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useMeQuery,
  useUpdateStatusMutation,
  useUpdateUserMutation,
} from "../features/UserSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAllRolesQuery } from "../features/RoleSlice";
import useHandleForm from "../hook/useHandleForm";
import { Toastify } from "../Helper/Toastify";

const User = () => {
  const [Id, setId] = useState(null);
  const [show, setShow] = useState(false);

  const { input, setInput, handleInput } = useHandleForm({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const { data, isError, error, isLoading, isSuccess } = useAllUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateStatus] = useUpdateStatusMutation();
  const { data: loginUser } = useMeQuery();

  const {
    data: RoleData,
    isError: isRoleError,
    error: RoleError,
    isLoading: isRoleLoading,
    isSuccess: isRoleSuccess,
  } = useAllRolesQuery();

  const handDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteUser(id);
        swal("User has been deleted!", {
          icon: "success",
        });
      } else {
        swal("User is safe!");
      }
    });
  };

  const handleEdit = (id) => {
    setId(id);
    const editdata = data.user.find((item) => item._id === id);
    setInput({ ...editdata });
    setShow(true);
  };

  const handleStatus = (id, status) => {
    updateStatus({ id, input: { status: !status } });
    Toastify("Status updated", "success");
  };

  let content;
  let Rolecontent = "";
  if (isError) {
    content = <h1>{error}</h1>;
  }
  if (isLoading) {
    content = <h1 className="text-center my-5 animate-bounce">...Loading</h1>;
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
            <td className="px-4 py-2 flex flex-col md:flex-row lg:flex-row justify-center items-center gap-2 sm:px-6 sm:py-4 space-x-2">
              <button
                onClick={() => handleEdit(item._id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handDelete(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        );
      });
    } else {
      content = (
        <h1 className="text-center my-5 animate-bounce">Data not found</h1>
      );
    }
  }

  if (isRoleError) {
    Rolecontent = <h1>{RoleError}</h1>;
  }
  if (isRoleLoading) {
    Rolecontent = <h1>...Loading</h1>;
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

  return (
    <div className="w-full h-auto flex justify-center">
      {show && (
        <Modal title="Add User" setShow={setShow}>
          <form
            onSubmit={handSubmit}
            action=""
            className="flex flex-col gap-2 mt-5"
          >
            <label htmlFor="name" className="text-blue-500">
              Name
            </label>
            <input
              placeholder="Your name please?"
              name="name"
              value={input.name}
              onChange={handleInput}
              autoComplete="off"
              className="w-full text-sm focus:outline-none"
              type="text"
            />
            <label htmlFor="email" className="text-blue-500">
              Email
            </label>
            <input
              name="email"
              value={input.email}
              onChange={handleInput}
              autoComplete="off"
              placeholder="Your email please?"
              className="w-full text-sm focus:outline-none"
              type="text"
            />
            {!Id ? (
              <>
                <label htmlFor="password" className="text-blue-500">
                  Password
                </label>
                <input
                  name="password"
                  value={input.password}
                  onChange={handleInput}
                  autoComplete="off"
                  placeholder="Your password please?"
                  className="w-full text-sm focus:outline-none"
                  type="password"
                />
              </>
            ) : (
              ""
            )}
            <label htmlFor="role" className="text-blue-500">
              Role
            </label>
            <select
              name="role"
              value={input?.role?._id}
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

      <div className="w-full flex gap-5 flex-col md:flex-col lg:flex-row lg:w-3/4 md:w-2/3 mx-auto">
        <div className="w-full g:w-1/3">
          <div className="profile-container p-4 border rounded-lg mt-4 bg-gradient-to-r from-orange-300 via-pink-400 to-purple-500 text-white">
            <h1 className="text-2xl text-white my-2 font-semibold text-center mb-4">
              User Profile
            </h1>
            <div className="mb-2 space-y-3 px-4">
              <img
                className="w-[100px] rounded-full mx-auto"
                src={user}
                alt=""
              />
              <p>{loginUser.user.name}</p>
              <p>{loginUser.user.email}</p>
              <button className="bg-orange-500 px-4 py-2 my-4">
                Edit profile
              </button>
              {/* Add more user details here */}
            </div>
            {/* You can add more colorful elements or styles as needed */}
          </div>

          {/* Render user details based on the selected user ID */}
        </div>
        <div className="w-full">
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
