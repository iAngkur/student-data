import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentTable from "@components/StudentTable";
import CreateStudent from "@components/CreateStudent";
import EditStudent from "@components/EditStudent";
import ViewDetails from "@components/ViewDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentTable />} />
        <Route path="/student/create" element={<CreateStudent />} />
        <Route path="/student/edit/:studentid" element={<EditStudent />} />
        <Route path="/student/view/:studentid" element={<ViewDetails />} />
      </Routes>

      <ToastContainer theme="light" limit={3} />
    </BrowserRouter>
  );
}

export default App;
