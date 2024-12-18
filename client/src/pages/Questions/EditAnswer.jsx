import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { editAnswer } from "../../actions/question";

const EditAnswer = () => {
  const { questionId, answerId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get questions from Redux store
  const questionsList = useSelector((state) => state.questionsReducer);
  const User = useSelector((state) => state.currentUserReducer);

  // Find the specific question and answer
  const question = questionsList.data?.find((q) => q._id === questionId);
  const answer = question?.answer?.find((ans) => ans._id === answerId);

  // State for form fields
  const [answerBody, setAnswerBody] = useState("");
  const [codeBlock, setCodeBlock] = useState("");

  // Populate form when component mounts or answer changes
  useEffect(() => {
    if (answer) {
      // Check if current user is the owner of the answer
      if (User?.result._id !== answer.userId) {
        toast.error("You are not authorized to edit this answer");
        navigate(`/Questions/${questionId}`);
        return;
      }

      setAnswerBody(answer.answerBody);
      setCodeBlock(answer.codeBlock || "");
    }
  }, [answer, User, questionId, navigate]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!answerBody && !codeBlock) {
      toast.error("Please provide an answer or code");
      return;
    }

    // Dispatch edit answer action
    dispatch(
      editAnswer(questionId, { answerId, answerBody, codeBlock }, navigate)
    );

    toast.success("Answer updated successfully");
    navigate(`/Questions/${questionId}`);
  };

  // If answer is not found, show loading or error
  if (!answer) {
    return <div className="text-center mt-10">Loading answer...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md hover:border-[#1E40AF] hover:border-2">
        <h1 className="text-xl font-semibold text-center mb-4">Edit Answer</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="edit-ans-body"
              className="block text-sm font-medium text-gray-700"
            >
              Answer
            </label>
            <textarea
              id="edit-ans-body"
              rows="4"
              value={answerBody}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm hover:border-[#1E40AF] transition-colors duration-300"
              onChange={(e) => setAnswerBody(e.target.value)}
              placeholder="Provide your answer details"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="edit-ans-code"
              className="block text-sm font-medium text-gray-700"
            >
              Code (Optional)
            </label>
            <textarea
              id="edit-ans-code"
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
            Update Answer
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAnswer;
