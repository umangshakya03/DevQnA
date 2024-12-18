import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import HomeMainbar from "../../components/HomeMainbar/HomeMainbar";

const Questions = () => {
  return (
    <div className="mt-16 flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <LeftSidebar />
        <div className="w-full">
          <HomeMainbar />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-2 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            <span className="font-semibold">DevQnA</span> &copy; 2024. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Questions;
