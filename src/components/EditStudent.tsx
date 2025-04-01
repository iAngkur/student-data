import React, { FormEventHandler, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../utils/toast";
import { Student } from "../types/student";

export default function EditStudent() {
  const { studentid } = useParams();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:9000/students")
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.length === 0)
          throw new Error("No students found in Database!");

        const foundStudent: Student | undefined = data.find(
          (student: Student) => student.id === studentid
        );

        setId(foundStudent?.id ?? "");
        setName(foundStudent?.name ?? "");
        setPlace(foundStudent?.place ?? "");
        setPhone(foundStudent?.phone ?? "");
      })
      .catch((err) => showErrorToast(err.message));
  }, [studentid]);

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!id || !name || !place || !phone) {
      showWarningToast("Please fill all fields!");
      return;
    }

    const newStudent = { id: Number(id), name, place, phone };

    fetch(`http://localhost:9000/students/${studentid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update student data!");

        showSuccessToast("Data updated successfully!");

        setId("");
        setName("");
        setPlace("");
        setPhone("");

        navigate("/");
      })
      .catch((err) => showErrorToast(err.message));
  };

  return (
    <div className="w-xl lg:w-3xl shadow-md mt-5 mx-auto p-5 border-t-5 border-purple-800 rounded-xl">
      <h2 className="text-center mb-5 text-purple-800 text-2xl font-bold">
        Edit Student Details
      </h2>
      <form
        onSubmit={handleOnSubmit}
        className="w-lg md:w-sm mx-auto *:w-full [&>input]:mb-4 [&>input]:px-2 [&>input]:py-1 font-semibold [&>input]:text-gray-600 [&>input]:text-sm"
      >
        <label htmlFor="id">ID</label>
        <input
          type="text"
          id="id"
          name="id"
          className="border border-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
          value={id}
          // onChange={(e) => setId(e.target.value)}
          disabled
        />
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="border border-gray-200"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="place">Place</label>
        <input
          type="text"
          id="place"
          name="place"
          className="border border-gray-200"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          className="border border-gray-200"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div
          className="mt-5 flex justify-center *:px-4 *:py-1 gap-4 text-white *:rounded  *:cursor-pointer *:hover:scale-105 *:duration-300
        *:ease-in"
        >
          <button type="submit" className="bg-purple-800">
            Update
          </button>
          <Link to="/" className="bg-red-800">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}
