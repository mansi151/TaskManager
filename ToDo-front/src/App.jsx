import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import TaskList from "./Components/Task/TaskList";
import ContactBook from "./Components/ContactBook/ContactBook";
import LoginPage from "./Components/UserLogin/LoginPage";
import SignupPage from "./Components/UserLogin/SignupPage";
import Dashboard from "./Components/Dashboard/Dashboard";
import withAuth from "./HOC/withAuth";


const ProtectedDashboard = withAuth(Dashboard);
const ProtectedTaskList = withAuth(TaskList);
const ProtectedContactBook = withAuth(ContactBook);

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container mx-auto p-6">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/dashboard" element={<ProtectedDashboard />} />
          <Route path="/task" element={<ProtectedTaskList />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
