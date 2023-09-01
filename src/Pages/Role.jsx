import { useEffect, useState } from "react";
import {
  useAllRolesQuery,
  useCreateRoleMutation,
  useDeleteRoleMutation,
  useUpdateRoleMutation,
  useUpdateRoleStatusMutation,
} from "../features/RoleSlice";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Modal from "../Components/Model/Model";
import { useAllpermissionssQuery } from "../features/PermissionsSlice";
import useHandleForm from "../hook/useHandleForm";
import swal from "sweetalert";
import { Toastify } from "../Helper/Toastify";

const Role = () => {
  const { input, setInput, handleInput } = useHandleForm({
    name: "",
  });
  const [show, setShow] = useState(false);
  const [permissionField, setPermissionField] = useState([]);

  const [Id, setId] = useState(null);

  //=================================== all role slice load
  const { data, isError, error, isLoading, isSuccess } = useAllRolesQuery();
  const [createRole] = useCreateRoleMutation();
  const [updateRole] = useUpdateRoleMutation();
  const [deleteRole] = useDeleteRoleMutation();
  const [updateRoleStatus] = useUpdateRoleStatusMutation();
  //========================================= permisson slice load
  const {
    data: permissionData,
    isError: isPermissionError,
    error: permissonError,
    isLoading: isPermissionLoading,
    isSuccess: isPermissionSuccess,
  } = useAllpermissionssQuery();
  // =========================================== checkbox handle
  const handleCheckbox = (e) => {
    let updatedPermissions;

    if (permissionField.includes(e.target.value)) {
      updatedPermissions = permissionField.filter(
        (item) => item !== e.target.value
      );
    } else {
      updatedPermissions = [...permissionField, e.target.value];
    }
    setPermissionField(updatedPermissions);
  };
  //=============================================== handle Delete
  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteRole(id);
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  //================================================= handleEdit
  const handleEdit = (id) => {
    setId(id);
    const editdata = data.role.find((item) => item._id === id);
    setInput({ ...editdata });
    editdata.permissions.map((item) => permissionField.push(item._id));
    setShow(true);
  };
  //================================================= handle status update
  const handleStatus = (id, status) => {
    updateRoleStatus({ id, input: { status: !status } });
    Toastify("Role status updated!", "success");
  };
  //============================================== check role data load or not
  let content = "";
  let PermissonContent = "";
  if (isError) {
    content = <h1>{error}</h1>;
  }
  if (isLoading) {
    content = <h1 className="text-center my-5 animate-bounce">...Loading</h1>;
  }
  if (isSuccess) {
    if (data.role.length > 0) {
      content = data.role?.map((item, index) => {
        return (
          <tr key={item?.id} className="bg-white flex  justify-between  p-2">
            <td className="">{index + 1}</td>
            <td className="">{item?.name}</td>

            <td className="">
              <input
                checked={item.status}
                onChange={() => handleStatus(item._id, item.status)}
                type="checkbox"
              />
            </td>
            <td className=" flex gap-5">
              <button onClick={() => handleEdit(item._id)}>
                <AiFillEdit />
              </button>
              <button onClick={() => handleDelete(item._id)}>
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
  //============================================== check permission data load or not
  if (isPermissionError) {
    PermissonContent = <h1>{permissonError}</h1>;
  }
  if (isPermissionLoading) {
    PermissonContent = <h1>...Loading</h1>;
  }
  if (isPermissionSuccess) {
    PermissonContent = permissionData.permission?.map((item, index) => {
      return (
        <div key={index} className="flex gap-3 items-center">
          <label htmlFor="">{item?.name}</label>
          <input
            onChange={handleCheckbox}
            checked={permissionField.includes(item._id)}
            value={item._id}
            type="checkbox"
          />
        </div>
      );
    });
  }
  //==================================================== handle submit form
  const handleForm = (e) => {
    e.preventDefault();

    if (Id) {
      //=======================update role
      updateRole({
        Id,
        input: { name: input.name, permissions: permissionField },
      });
      setPermissionField([]);
      setInput({ name: "" });
      setId(null);
      Toastify("Role updated!", "success");
      setShow(false);
    } else {
      //====================================create role
      createRole({ name: input.name, permissions: [...permissionField] });
      setPermissionField([]);
      setInput({ name: "" });
      setId(null);
      Toastify("Role Created!", "success");
      setShow(false);
    }
  };

  //========================== main file return
  return (
    <div className=" w-full h-auto flex justify-center">
      {show && (
        <Modal title="Add role" setShow={setShow}>
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
              placeholder="Your name please ?"
              className="w-full text-sm focus:outline-none"
              type="text"
            />

            <label htmlFor="" className="w-full text-blue-500">
              Permission
            </label>
            {PermissonContent}
            <button
              type="submit"
              className="bg-blue-400 text-white py-1 rounded-full hover:bg-blue-600"
            >
              Add Role
            </button>
          </form>
        </Modal>
      )}
      <div className="w-[90%] lg:w-[70%] md:[60%] ">
        <div className=" w-full">
          <div className="flex justify-between items-center py-5">
            <h1 className=" text-center text-xl font-extrabold">Roles Table</h1>
            <button
              onClick={() => {
                setShow(true),
                  setInput({ name: "" }, setId(null), setPermissionField([]));
              }}
              className="bg-blue-500 px-2 py-1 rounded-md hover:bg-blue-600 text-white"
            >
              Add Role
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

export default Role;
