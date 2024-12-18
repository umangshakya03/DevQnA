import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import User from "./User";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";

const Users = () => {
  const users = useSelector((state) => state.usersReducer);

  return (
    <div className="flex mt-16">
      <LeftSidebar />
      <div className="flex-grow p-6">
        <h1 className="font-normal text-2xl text-gray-800 mb-6">Users</h1>
        {users.length === 0 ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {users.map((user) => (
              <div
                key={user?._id}
                className="bg-white shadow-md p-4 rounded-lg border transition-all duration-200 hover:border-teal-400 hover:ring-1 hover:ring-teal-300"
              >
                <User user={user} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
