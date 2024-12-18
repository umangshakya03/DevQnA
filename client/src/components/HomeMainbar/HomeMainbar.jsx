import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import QuestionList from "./QuestionList";
import Loader from "../Loader/Loader";
import previousPage from "../../assets/left-arrow.png";
import nextPage from "../../assets/right-arrow.png";

const HomeMainbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const questionsList = useSelector((state) => state.questionsReducer);

  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 7;

  const user = 1; // Placeholder for logged-in user, adjust accordingly

  const checkAuth = () => {
    if (user === null) {
      alert("Login or Signup to ask a question");
      navigate("/Auth");
    } else {
      navigate("/AskQuestion");
    }
  };

  // Extract search term from URL query parameter
  const searchTerm = new URLSearchParams(location.search).get("s");

  useEffect(() => {
    if (questionsList.data && Array.isArray(questionsList.data)) {
      let sortedQuestions = [...questionsList.data];

      if (location.pathname === "/") {
        // Sort by votes (descending order)
        sortedQuestions.sort((a, b) => {
          const aVotes = a.upVote.length - a.downVote.length;
          const bVotes = b.upVote.length - b.downVote.length;
          return bVotes - aVotes;
        });
      } else if (location.pathname === "/questions") {
        // Sort by 'askedOn' (newest first)
        sortedQuestions.sort((a, b) => {
          const dateA = new Date(a.askedOn);
          const dateB = new Date(b.askedOn);
          return dateB - dateA; // Most recent first
        });
      }

      if (searchTerm) {
        const filtered = sortedQuestions.filter((question) => {
          const title = question.questionTitle
            ? question.questionTitle.toLowerCase()
            : "";
          const body = question.questionBody
            ? question.questionBody.toLowerCase()
            : "";
          const search = searchTerm.toLowerCase();

          // Search in both title and body
          return title.includes(search) || body.includes(search);
        });
        setFilteredQuestions(filtered);
      } else {
        setFilteredQuestions(sortedQuestions); // Show all sorted questions
      }
    }
  }, [questionsList.data, searchTerm, location.pathname]);

  // Paginate questions
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  // Change page
  const paginate = (pageNumber) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= Math.ceil(filteredQuestions.length / questionsPerPage)
    ) {
      setCurrentPage(pageNumber);
    }
  };

  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  return (
    <div className="w-full p-6">
      {/* About Section */}
      {location.pathname === "/" && (
        <div className="bg-gray-100 p-6 rounded-lg mb-6 shadow-md">
          <h2 className="text-3xl font-semibold text-indigo-600 mb-4">
            Welcome to DevQnA
          </h2>
          <p className="text-gray-700 mb-4">
            DevQnA is a platform where programmers can ask questions, share
            knowledge, and grow their skills. Whether you're just starting or
            are an experienced developer, our community is here to help.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm transition-all transform hover:border-indigo-500 hover:shadow-lg hover:scale-105">
              <h3 className="font-semibold text-lg text-gray-800">
                Ask Questions
              </h3>
              <p className="text-sm text-gray-600">
                Get answers to your programming-related queries.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm transition-all transform hover:border-indigo-500 hover:shadow-lg hover:scale-105">
              <h3 className="font-semibold text-lg text-gray-800">
                Vote Content
              </h3>
              <p className="text-sm text-gray-600">
                Help the community by voting on questions and answers.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm transition-all transform hover:border-indigo-500 hover:shadow-lg hover:scale-105">
              <h3 className="font-semibold text-lg text-gray-800">
                Join Community
              </h3>
              <p className="text-sm text-gray-600">
                Collaborate with developers worldwide.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Questions Section */}
      <div className="flex justify-between items-center mb-6">
        {location.pathname === "/" ? (
          <h1 className="font-normal text-2xl text-gray-800">Top Questions</h1>
        ) : (
          <h1 className="font-normal text-2xl text-gray-800">All Questions</h1>
        )}
        <button
          onClick={checkAuth}
          className="px-4 py-2 bg-[#009dff] text-white rounded-md hover:bg-[#0086d8] transition-all duration-200"
        >
          Ask Question
        </button>
      </div>

      <div>
        {questionsList.data === null ? (
          <Loader />
        ) : (
          <>
            <p className="text-sm text-gray-700 mb-4">
              {filteredQuestions.length} questions
            </p>
            <QuestionList questionsList={currentQuestions} />
            {/* Pagination */}
            {location.pathname !== "/question" && (
              <div className="flex justify-center items-center mt-4">
                {/* Previous Button */}
                <img
                  src={previousPage}
                  alt="previous-page"
                  width="18"
                  className="cursor-pointer w-5 h-5"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                />

                {/* Page Numbers */}
                <span className="mx-4 text-xs text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>

                {/* Next Button */}
                <img
                  src={nextPage}
                  alt="next-page"
                  width="18"
                  className="cursor-pointer w-5 h-5"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainbar;
