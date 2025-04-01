import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { Student } from "../types/student";
import { MdDelete } from "react-icons/md";
import { FaEye, FaRegEdit } from "react-icons/fa";

const fetchData = async (endpoint: string) => {
  return await fetch(`http://localhost:9000/${endpoint}`).then((res) =>
    res.json()
  );
};

export default function StudentTable() {
  const [students, setStudents] = useState<Student[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStudents() {
      try {
        const students = await fetchData("students");

        if (!students || students.length === 0) {
          showSuccessToast("No Students found in database");
          return;
        }

        showSuccessToast("Students fetch success!");
        setStudents(students);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch students";
        showErrorToast(errorMessage);
      }
    }

    fetchStudents();
  }, []);

  const deleteStudent = (studentid: string) => {
    if (window.confirm("Are you sure you want to delete?")) {
      fetch(`http://localhost:9000/students/${studentid}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to remove student data!");

          showSuccessToast("Data removed successfully!");
          navigate("/");
        })
        .catch((err) => showErrorToast(err.message));
    }
  };

  return (
    <div className="w-xl lg:w-3xl shadow-md mt-5 mx-auto p-5 border-t-5 border-purple-800 rounded-xl">
      <h2 className="text-center mb-5 text-purple-800 text-2xl font-bold">
        Student Records
      </h2>
      <div>
        <Link
          to="/student/create"
          className="rounded bg-purple-900 text-white font-medium shadow px-4 py-2 cursor-pointer"
        >
          Add new student
        </Link>
        <div className="mt-5">
          <table className="rounded-md overflow-hidden w-full bg-gray-200 table-auto text-center">
            <thead className="bg-purple-900 text-white">
              <tr className="*:p-1">
                <th>ID</th>
                <th>Name</th>
                <th>Place</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="*:hover:bg-gray-300">
              {students.length > 0 &&
                students.map(({ id, name, place, phone }) => (
                  <tr key={id} className="*:py-2">
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{place}</td>
                    <td>{phone}</td>
                    <td className="*:px-2 *:py-1 *:mx-1  *:rounded text-white flex justify-center items-center">
                      <Link to={`/student/view/${id}`} className="bg-slate-400">
                        <FaEye />
                      </Link>
                      <Link
                        to={`/student/edit/${id}`}
                        className="bg-purple-400"
                      >
                        <FaRegEdit />
                      </Link>
                      <button
                        onClick={() => deleteStudent(id)}
                        className="bg-red-400 cursor-pointer"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
