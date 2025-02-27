import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {signup} from "../../redux/authActions"
const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    await dispatch(signup(firstName, lastName, email, password));
    navigate("/login");
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-green-100">
      <h1 className="text-4xl font-extrabold text-black-500" style={{ padding: '20px' }}>Welcome OnBoard!</h1>
      <div className="font-bold text-black-200" style={{ padding: '10px' }}>Create your account to get started</div>
      <div className="w-full max-w-lg p-10 bg-gray-800 shadow-xl rounded-lg" style={{ padding: '20px' }}>
        <div className="mb-6">
          <label className="block text-gray-300 font-medium mb-2" style={{ padding: '5px' }}>First Name</label>
          <input
            style={{ padding: '5px' }}
            type="text"
            className="w-full border border-gray-600 rounded-md bg-sky-50 text-black focus:ring-2 focus:ring-teal-300 focus:border-teal-300 outline-none transition duration-200"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 font-medium mb-2" style={{ padding: '5px' }}>Last Name</label>
          <input
            style={{ padding: '5px' }}
            type="text"
            className="w-full border border-gray-600 rounded-md bg-sky-50 text-black focus:ring-2 focus:ring-teal-300 focus:border-teal-300 outline-none transition duration-200"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 font-medium mb-2" style={{ padding: '5px' }}>Email</label>
          <input
            style={{ padding: '5px' }}
            type="email"
            className="w-full border border-gray-600 rounded-md bg-sky-50 text-black focus:ring-2 focus:ring-teal-300 focus:border-teal-300 outline-none transition duration-200"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 font-medium mb-2" style={{ padding: '5px' }}>Password</label>
          <input
            style={{ padding: '5px' }}
            type="password"
            className="w-full border border-gray-600 rounded-md bg-sky-50 text-black focus:ring-2 focus:ring-teal-300 focus:border-teal-300 outline-none transition duration-200"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          style={{ padding: '5px', marginTop: '15px' }}
          onClick={handleSignup}
          className="w-full bg-teal-300 text-black py-3 rounded-md font-medium hover:bg-sky-50 transition duration-300"
        >
          Sign Up
        </button>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account? {" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
