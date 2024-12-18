import React, { useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import HTMLReactParser from "html-react-parser";

import upvote from "../../assets/sort-up.png";
import downvote from "../../assets/sort-down.png";
import Avatar from "../../components/Avatar/Avatar";
import DisplayAnswer from "./DisplayAnswer";
import {
  postAnswer,
  deleteQuestion,
  voteQuestion,
} from "../../actions/question";
import Loader from "../../components/Loader/Loader";

const QuestionsDetails = () => {
  const { id } = useParams();
  const questionsList = useSelector((state) => state.questionsReducer);
  const User = useSelector((state) => state.currentUserReducer);
  const [codeBlock, setCodeBlock] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const url = process.env.REACT_APP_API_URL;

  const handlePostAns = (e, answerLength) => {
    e.preventDefault();
    if (!User) {
      toast.error("Please Login or Signup to answer a question");
      navigate("/Auth");
    } else {
      if (answer === "" && codeBlock === "") {
        toast.error("Enter an answer or code before submitting");
      } else {
        dispatch(
          postAnswer({
            id,
            noOfAnswers: answerLength + 1,
            answerBody: answer,
            codeBlock,
            userAnswered: User.result.name,
            userId: User.result._id,
          })
        );
        setAnswer("");
        setCodeBlock("");
      }
    }
  };

  const handleShare = () => {
    copy(url + location.pathname);
    toast.success("URL copied to clipboard");
  };

  const handleDelete = () => {
    dispatch(deleteQuestion(id, navigate));
    toast.success("Question deleted");
  };

  const handleUpVote = () => {
    if (!User) {
      return toast.error("Please Login or Signup to upvote");
    }
    dispatch(voteQuestion(id, "upVote", User.result._id));
    toast.success("Upvoted");
  };

  const handleDownVote = () => {
    if (!User) {
      return toast.error("Please Login or Signup to downvote");
    }
    dispatch(voteQuestion(id, "downVote", User.result._id));
    toast.success("Downvoted");
  };

  const question = questionsList.data?.find((question) => question._id === id);

  return (
    <div className="w-full mx-auto my-4 p-4 mt-3 pl-8">
      {questionsList.data === null ? (
        <Loader />
      ) : (
        question && (
          <div key={question._id}>
            <section className="border-b pb-4 mb-6">
              <h1 className="text-2xl font-semibold">
                {question.questionTitle}
              </h1>
              <div className="flex mt-4">
                <div className="flex flex-col items-center mr-6">
                  <img
                    src={upvote}
                    alt="upvote"
                    width="18"
                    className="cursor-pointer"
                    onClick={handleUpVote}
                  />
                  <p className="text-lg">
                    {question.upVote.length - question.downVote.length}
                  </p>
                  <img
                    src={downvote}
                    alt="downvote"
                    width="18"
                    className="cursor-pointer"
                    onClick={handleDownVote}
                  />
                </div>
                <div className="flex-1">
                  <p className="whitespace-pre-line">
                    {HTMLReactParser(question.questionBody)}
                  </p>
                  {question.codeBlock && (
                    <pre
                      className="bg-gray-100 p-4 rounded my-2 font-mono text-sm overflow-x-auto"
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      <code>{question.codeBlock}</code>
                    </pre>
                  )}

                  <div className="flex justify-between items-center">
                    <div>
                      {User?.result._id === question.userId && (
                        <Link
                          to={`/EditQuestion/${question._id}`}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </Link>
                      )}
                      <button
                        className="ml-4 text-blue-500 hover:underline"
                        onClick={handleShare}
                      >
                        Share
                      </button>
                      {User?.result._id === question.userId && (
                        <button
                          className="ml-4 text-red-500 hover:underline"
                          onClick={handleDelete}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      <p>asked {moment(question.askedOn).fromNow()}</p>
                      <Link
                        to={`/Users/${question.userId}`}
                        className="flex items-center text-blue-500"
                      >
                        <Avatar
                          backgroundColor="orange"
                          px="8px"
                          py="5px"
                          borderRadius="4px"
                        >
                          {question.userPosted.charAt(0).toUpperCase()}
                        </Avatar>
                        <span className="ml-2">{question.userPosted}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {question.answer.length > 0 && (
              <section>
                <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                  {question.answer.length} Answers
                </h3>
                <DisplayAnswer
                  question={question}
                  answers={question.answer} // Display all answers
                  handleShare={handleShare}
                />
              </section>
            )}

            <section className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Your Answer</h3>
              <form onSubmit={(e) => handlePostAns(e, question.answer.length)}>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full border p-2 rounded mb-4"
                  rows="5"
                  placeholder="Write your answer here..."
                />
                <textarea
                  value={codeBlock}
                  // disable tab key
                  onKeyDown={(e) => {
                    if (e.key === "Tab") {
                      e.preventDefault();
                      const start = e.target.selectionStart;
                      const end = e.target.selectionEnd;

                      e.target.value =
                        e.target.value.substring(0, start) +
                        "   " +
                        e.target.value.substring(end);
                      e.target.selectionStart = e.target.selectionEnd =
                        start + 2;
                    }
                  }}
                  onChange={(e) => setCodeBlock(e.target.value)}
                  className="w-full border p-2 rounded mb-4 font-mono bg-gray-100"
                  rows="5"
                  placeholder="Write your code here (if any)..."
                />

                <input
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
                  value="Post Your Answer"
                />
              </form>
            </section>
          </div>
        )
      )}
    </div>
  );
};

export default QuestionsDetails;
