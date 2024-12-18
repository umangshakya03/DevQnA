import { Link } from "react-router-dom";

const User = ({ user }) => {
  return (
    <Link
      to={`/Users/${user._id}`}
      className="flex items-center space-x-4 text-black no-underline hover:text-indigo-700"
    >
      <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-400 to-teal-400 text-white font-bold rounded-full shadow-md">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <div>
        <h5 className="text-lg font-normal">{user.name}</h5>
      </div>
    </Link>
  );
};

export default User;
