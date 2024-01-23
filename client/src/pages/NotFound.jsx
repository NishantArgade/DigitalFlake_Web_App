import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="w-1/2 h-96 bg-white shadow-2xl flex  flex-col justify-start items-center">
        <p className="text-blue-300 font-bold text-[2.3rem] mt-8">Oops! Page Not Found</p>
        <h1 className="text-orange-300 font-bold text-[8rem] mt-2">404</h1>
        <button onClick={() => navigate(-1)} className="text-purple-800 underline mt-8">Go Back</button>
      </div>
    </div>
  );
};

export default NotFound;
