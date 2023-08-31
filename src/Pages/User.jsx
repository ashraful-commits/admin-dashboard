import { useAllUsersQuery } from "../features/UserSlice";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const User = () => {
  const { data, isError, error, isLoading, isSuccess } = useAllUsersQuery();

  let content = "";
  if (isError) {
    content = <h1>{error}</h1>;
  }
  if (isLoading) {
    content = <h1>...Loading</h1>;
    console.log(data);
  }
  if (isSuccess) {
    content = data.user?.map((item, index) => {
      return (
        <tr key={item.id} className="bg-white flex  justify-between  p-2">
          <td className="">{index + 1}</td>
          <td className="">{item.name}</td>
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

  return (
    <div className=" w-full h-auto mx-10 flex justify-center">
      <div className="w-[90%] lg:w-[70%] md:[60%] ">
        <div className=" w-full">
          <h1 className="my-5 text-center text-xl font-extrabold">
            User Table
          </h1>
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
