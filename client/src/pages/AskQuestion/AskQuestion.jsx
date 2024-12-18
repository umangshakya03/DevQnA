import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { askQuestion } from "../../actions/question";
import toast from "react-hot-toast";

const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [codeBlock, setCodeBlock] = useState(""); // Add codeBlock state

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (User) {
      if (questionTitle && questionBody) {
        dispatch(
          askQuestion(
            {
              questionTitle,
              questionBody,
              codeBlock, // Add codeBlock to the dispatch
              userPosted: User.result.name,
              userId: User?.result._id,
            },
            navigate
          )
        );
        toast.success("Question posted successfully");
      } else toast.error("Please enter value in all the fields");
    } else toast.error("Please Login to ask a question");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md hover:border-[#1E40AF] hover:border-2">
        <h1 className="text-xl font-semibold text-center mb-4">
          Ask a Question
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="ask-ques-title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="ask-ques-title"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm hover:border-[#1E40AF] transition-colors duration-300"
              onChange={(e) => setQuestionTitle(e.target.value)}
              placeholder="Brief and specific question title"
            />
          </div>

          <div>
            <label
              htmlFor="ask-ques-body"
              className="block text-sm font-medium text-gray-700"
            >
              Body
            </label>
            <textarea
              id="ask-ques-body"
              rows="4"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm hover:border-[#1E40AF] transition-colors duration-300"
              onChange={(e) => setQuestionBody(e.target.value)}
              placeholder="Provide details about your question"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="ask-ques-code"
              className="block text-sm font-medium text-gray-700"
            >
              Code (Optional)
            </label>
            <textarea
              id="ask-ques-code"
              rows="4"
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
                  e.target.selectionStart = e.target.selectionEnd = start + 2;
                }
              }}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm hover:border-[#1E40AF] transition-colors duration-300"
              onChange={(e) => setCodeBlock(e.target.value)}
              placeholder="Provide your code here (if any)"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Post Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
