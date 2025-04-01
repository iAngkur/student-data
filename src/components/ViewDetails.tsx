import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Student } from "../types/student";
import { showErrorToast } from "../utils/toast";

export default function ViewDetails() {
  const { studentid } = useParams();

  const [student, setStudent] = useState<Student | undefined>(undefined);

  useEffect(() => {
    fetch("http://localhost:9000/students")
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.length === 0)
          throw new Error("No students found in Database!");

        const foundStudent: Student | undefined = data.find(
          (student: Student) => student.id === studentid
        );
        setStudent(foundStudent);
      })
      .catch((err) => showErrorToast(err.message));
  }, [studentid]);

  return (
    <div className="w-xl lg:w-3xl shadow-md mt-5 mx-auto p-5 border-t-5 border-purple-800 rounded-xl">
      <h2 className="text-center mb-5 text-purple-800 text-2xl font-bold">
        Student Details
      </h2>
      <div className="[&_strong]:text-purple-800">
        {student ? (
          <>
            <p>
              <strong>ID:</strong> {student.id}
            </p>
            <p>
              <strong>Name:</strong> {student.name}
            </p>
            <p>
              <strong>Place:</strong> {student.place}
            </p>
            <p>
              <strong>Phone:</strong> {student.phone}
            </p>
          </>
        ) : (
          <h3>No matched student found for this student ID: {studentid}</h3>
        )}
      </div>
      <div
        className="mt-5 flex justify-start *:px-4 *:py-1 gap-4 text-white *:rounded  *:cursor-pointer *:hover:scale-105 *:duration-300
        *:ease-in"
      >
        <Link to="/" className="bg-red-800">
          Back
        </Link>
      </div>
    </div>
  );
}
