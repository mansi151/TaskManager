import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authActions";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
const Navbar = () => {
  const name = localStorage.getItem('name')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  }
  return (
    <nav className="bg-stone-600 py-4 px-6 shadow-md" style={{padding:'10px'}}>
      <div className="mx-auto flex justify-between">
        <div className="text-white text-bold text-lg rounded-md">
          MeetYourTask
        </div>
        <ul className="grid grid-flow-col gap-6 text-white text-lg font-semibold">
        <li>
            <Link to="/dashboard" className="px-4 py-2 rounded-md transition hover:text-gray">Dashboard</Link>
          </li>
          <li>
            <Link to="/task" className="px-4 py-2 rounded-md transition hover:text-gray">Task</Link>
          </li>
        </ul>
        <div>
          <li>
            <span className="text-white" style={{ padding: '5px' }}>{name}</span>
            <button
              style={{ padding: '5px' }}
              onClick={handleLogout}
              className="px-4 py-2 bg-green-100 text-black rounded-md hover:bg-rose-100 transition cursor-pointer"
            >
              <ArrowRightEndOnRectangleIcon className="h-4 w-4" />
            </button>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
