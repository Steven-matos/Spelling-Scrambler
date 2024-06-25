import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-dffdff text-gray-900 p-6">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Page Not Found</p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go Back Home
      </Link>
      <p className="mt-4 text-gray-400">
        Or maybe you typed something wrong? Try again!
      </p>
    </div>
  );
};

export default NotFound;
