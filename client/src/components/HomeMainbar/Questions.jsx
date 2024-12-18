import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Questions = ({ question }) => {
  return (
    <div className="min-h-[100px] w-full flex items-center bg-white border border-[#E5E7EB] rounded-lg shadow-sm mb-4 p-4 hover:shadow-md transition-shadow duration-300 hover:border-[#1E40AF]">
      <div className="flex flex-col items-center w-[80px] bg-[#F9FAFB] p-4 rounded-lg">
        <p className="text-lg font-semibold text-[#4B9EFC]">
          {question.upVote.length - question.downVote.length}
        </p>
        <p className="text-sm text-gray-600">votes</p>
      </div>
      <div className="flex flex-col items-center w-[80px] bg-[#F9FAFB] p-4 mx-4 rounded-lg">
        <p className="text-lg font-semibold text-[#34D399]">
          {question.noOfAnswers}
        </p>
        <p className="text-sm text-gray-600">answers</p>
      </div>
      <div className="flex-grow px-4">
        <Link
          to={`/Questions/${question._id}`}
          className="text-[#1E40AF] hover:text-[#3B82F6] text-lg font-medium transition-colors duration-300"
        >
          {question.questionTitle.length > (window.innerWidth <= 400 ? 70 : 90)
            ? question.questionTitle.substring(
                0,
                window.innerWidth <= 400 ? 70 : 90
              ) + "..."
            : question.questionTitle}
        </Link>
        <p className="text-sm text-gray-500">
          asked {moment(question.askedOn).fromNow()} by{" "}
          <span className="font-medium text-[#10B981]">
            {question.userPosted}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Questions;
