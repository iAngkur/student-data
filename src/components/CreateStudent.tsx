import React from "react";
import { Link } from "react-router-dom";

export default function CreateStudent() {
  return (
    <div className="w-xl lg:w-3xl shadow-md mt-5 mx-auto p-5 border-t-5 border-purple-800 rounded-xl">
      <h2 className="text-center mb-5 text-purple-800 text-2xl font-bold">
        Add New Student
      </h2>
      <form className="*:w-full [&>input]:mb-4">
        <label htmlFor="id">ID</label>
        <input
          type="text"
          id="id"
          name="id"
          className="border border-gray-200"
        />
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="border border-gray-200"
        />
        <label htmlFor="place">Place</label>
        <input
          type="text"
          id="place"
          name="place"
          className="border border-gray-200"
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          className="border border-gray-200"
        />
        <div
          className="mt-5 flex justify-center *:px-4 *:py-1 gap-4 text-white *:rounded  *:cursor-pointer *:hover:scale-105 *:duration-300
        *:ease-in"
        >
          <button className="bg-purple-800">Save</button>
          <Link to="/" className="bg-red-800">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}
