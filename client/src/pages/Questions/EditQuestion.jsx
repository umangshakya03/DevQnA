import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { editQuestion } from "../../actions/question";

const EditQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get questions from Redux store
  const questionsList = useSelector((state) => state.questionsReducer);
  const User = useSelector((state) => state.currentUserReducer);

  // Find the specific question
  const question = questionsList.data?.find((q) => q._id === id);

  // State for form fields
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [codeBlock, setCodeBlock] = useState("");

  // Populate form when component mounts or question changes
  useEffect(() => {
    if (question) {
      // Check if current user is the owner of the question
      if (User?.result._id !== question.userId) {
        toast.error("You are not authorized to edit this question");
        navigate("/questions");
        return;
      }

      setQuestionTitle(question.questionTitle);
      setQuestionBody(question.questionBody);
      setCodeBlock(question.codeBlock || "");
    }
  }, [question, User, navigate]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!questionTitle || !questionBody) {
      toast.error("Please fill in all required fields");
      return;
    }
    let questionData = { questionTitle, questionBody, codeBlock };
    console.log("id", id);
    console.log("questionData", questionData);
    // Dispatch edit question action
    dispatch(editQuestion(id, questionData, navigate));
    toast.success("Question updated successfully");
    navigate(`/questions/${id}`);
  };

  // If question is not found, show loading or error
  if (!question) {
    return <div className="text-center mt-10">Loading question...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md hover:border-[#1E40AF] hover:border-2">
        <h1 className="text-xl font-semibold text-center mb-4">
          Edit Question
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="edit-ques-title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="edit-ques-title"
              value={questionTitle}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm hover:border-[#1E40AF] transition-colors duration-300"
              onChange={(e) => setQuestionTitle(e.target.value)}
              placeholder="Brief and specific question title"
              required
            />
          </div>

          <div>
            <label
              htmlFor="edit-ques-body"
              className="block text-sm font-medium text-gray-700"
            >
              Body
            </label>
            <textarea
              id="edit-ques-body"
              rows="4"
              value={questionBody}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm hover:border-[#1E40AF] transition-colors duration-300"
              onChange={(e) => setQuestionBody(e.target.value)}
              placeholder="Provide details about your question"
              required
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="edit-ques-code"
              className="block text-sm font-medium text-gray-700"
            >
              Code (Optional)
            </label>
            <textarea
              id="edit-ques-code"
              rows="4"
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
            Update Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditQuestion;
