import * as api from "../api";
import { setCurrentUser } from "./currentUser";

export const signup = (authData, navigate, toast) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    toast.success("Redirecting...");
    toast.success("User registered successfully");
    navigate("/");
  } catch (error) {
    let errmsg = error?.response?.data?.message;
    if (!errmsg) {
      errmsg = "An error occurred";
    }
    toast.error(errmsg);
    console.log(error);
  }
};

export const login = (authData, navigate, toast) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    toast.success("Redirecting...");
    toast.success("User registered successfully");
    navigate("/");
  } catch (error) {
    console.log(error);
    toast.error("Invalid credentials");
  }
};
