import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import toast from "react-hot-toast";
import { signup, login } from "../../actions/auth";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () => {
    setIsSignup(!isSignup);
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !password) {
      return toast.error("Please enter email and password");
    }
    if (isSignup) {
      if (!name) {
        return toast.error("Please enter name");
      }
      dispatch(signup({ name, email, password }, navigate, toast));
    } else {
      dispatch(login({ email, password }, navigate, toast));
    }
  };

  return (
    <section className="flex space-x-11 items-center justify-center min-h-screen bg-gray-100">
      {isSignup && <AboutAuth />}
      <div className="flex flex-col items-center w-full max-w-md p-6 space-y-6 bg-white shadow-md rounded-md">
        <img src={icon} alt="DevQnA" className="w-16" />
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          {isSignup && (
            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </label>
          )}
          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </label>
          <label className="flex flex-col">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-700">
                Password
              </span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="w-full py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            {isSignup ? "Sign up" : "Log in"}
          </button>
        </form>
        <p className="text-sm text-gray-600">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={handleSwitch}
            className="text-blue-500 hover:underline"
          >
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Auth;
