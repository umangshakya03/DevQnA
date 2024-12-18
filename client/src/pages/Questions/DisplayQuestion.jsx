import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import QuestionsDetails from "./QuestionsDetails";

const DisplayQuestion = () => {
  return (
    <div className="flex mt-16">
      <LeftSidebar />
      <div className="w-full">
        <QuestionsDetails />
      </div>
    </div>
  );
};

export default DisplayQuestion;
