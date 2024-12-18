import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

// AUTH
export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);

// QUESTION
export const postQuestion = (questionData) =>
  API.post("/questions/Ask", questionData);
export const editQuestion = (id, questionData) =>
  API.post(`/questions/edit/${id}`, questionData);
export const editAnswer = (id, answerData) =>
  API.post(`/answer/edit/${id}`, answerData);
export const getAllQuestions = () => API.get("/questions/All");
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value, userId) =>
  API.patch(`/questions/vote/${id}`, { value, userId });

// ANSWER
export const postAnswer = (
  id,
  noOfAnswers,
  answerBody,
  codeBlock,
  userAnswered,
  userId
) =>
  API.patch(`/answer/post/${id}`, {
    id,
    noOfAnswers,
    answerBody,
    codeBlock,
    userAnswered,
    userId,
  });
export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });

// USER
export const fetchAllUsers = () => API.get("/user/getAllUsers");

export const updateProfile = (id, updatedData) =>
  API.patch(`/user/update/${id}`, updatedData);
