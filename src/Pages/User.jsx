import { useState } from "react";
import Modal from "../Components/Model/Model";
import swal from "sweetalert";
import {
  useAllUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateStatusMutation,
  useUpdateUserMutation,
} from "../features/UserSlice";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useAllRolesQuery } from "../features/RoleSlice";
import useHandleForm from "../hook/useHandleForm";
import { Toastify } from "../Helper/Toastify";

const User = () => {
  //===============================  all state here
  const [Id, setId] = useState(null);
  const [show, setShow] = useState(false);
  //================================ form and toast hook
  const { input, setInput, handleInput } = useHandleForm({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  //========================= user slice load
  const { data, isError, error, isLoading, isSuccess } = useAllUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateStatus] = useUpdateStatusMutation();
  //============================= role slice load
  const {
    data: RoleData,
    isError: isRoleError,
    error: RoleError,
    isLoading: isRoleLoading,
    isSuccess: isRoleSuccess,
  } = useAllRolesQuery();
  //============================= handle delete
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

  //============================ handle edit
  const handleEdit = (id) => {
    setId(id);
    setInput({ ...data.user.find((item) => item._id === id) });
    setShow(true);
  };
  //============================ handle status update
  const handleStatus = (id, status) => {
    console.log(status);
    updateStatus({ id, input: { status: !status } });
    Toastify("Status updated", "success");
  };
  //=================================== user slice check
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
          <tr key={item.id} className="bg-white flex justify-between p-2">
            <td className="">{index + 1}</td>
            <td className="">{item.name}</td>
            <td className="">{item.role?.name}</td>
            <td className="">
              <input
                onChange={() => handleStatus(item._id, item.status)}
                type="checkbox"
                checked={item.status}
              />
            </td>
            <td className=" flex gap-5">
              <button onClick={() => handleEdit(item._id)}>
                <AiFillEdit />
              </button>
              <button onClick={() => handDelete(item._id)}>
                <AiFillDelete />
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
  //============================================ role slice check
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
  //==============================form submit
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
  //==================================== return main function
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
          <div className="flex justify-between items-center py-5">
            <h1 className=" text-center text-xl font-extrabold">User Table</h1>
            <button
              onClick={() => {
                setShow(true),
                  setInput({
                    name: "",
                    email: "",
                    password: "",
                    role: "",
                  }),
                  setId(null);
              }}
              className="bg-blue-500 px-2 py-1 rounded-md hover:bg-blue-600 text-white"
            >
              Add User
            </button>
          </div>
          <table className=" table w-full">
            <thead className="bg-gradient-to-r  from-blue-400 via-purple-500 to-pink-400 text-white">
              <tr className="flex justify-between text-center p-2">
                <th className="">ID</th>
                <th className="">Name</th>

                <th className="">Role</th>
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

export default User;
