import React, { useContext, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiDark } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { NewsContext } from "../../context/NewsContext";
import { IoTimeOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

function AdminHeader({ open }) {
  const { user, darkMode, mode, formatTimeAgo, handleLogout } =
    useContext(NewsContext);
  const [toggleDown, setToggleDown] = useState(false);
  const [togglemessage, setToggleMessage] = useState(false);
  const [messages, setMessage] = useState([]);

  useEffect(() => {
    try {
      const fetchMessage = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/contact`);
        setMessage(response.data.contact || []);
      };
      fetchMessage();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const toggleLogin = () => {
    setToggleDown((prev) => !prev);
  };
  const toggleMessage = () => {
    setToggleMessage((prev) => !prev);
  };

  return (
   <div
  className={`fixed top-0 left-0 right-0 lg:h-20 h-14 flex justify-between items-center px-4 md:px-8 border-b border-gray-200  bg-white dark:bg-gray-800`}
>
<div className="mx-20"> 
  <h1 className="text-lg md:text-2xl font-bold text-gray-800 dark:text-white">Admin Panel</h1>
</div>

  <div className="flex items-center space-x-4">
    <button onClick={darkMode}>
      {mode ? <MdDarkMode size={24} /> : <CiDark size={24} />}
    </button>

    <div className="relative">
      <button onClick={toggleMessage} className="relative">
        <IoMdNotificationsOutline size={24} />
        {messages?.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {messages.length}
          </span>
        )}
      </button>
      {togglemessage && (
        <ul className="absolute top-10 right-0 w-80 bg-white dark:bg-gray-700 shadow-lg rounded-md p-2 text-gray-800 dark:text-white">
          {messages.length > 0 ? (
            messages.map((mes) => (
              <li key={mes.id} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
                {mes.message}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No messages</li>
          )}
        </ul>
      )}
    </div>

    <div className="relative">
      <img
        src={user?.image}
        onClick={toggleLogin}
        className="w-10 h-10 rounded-full cursor-pointer"
        alt="profile"
      />
      {toggleDown && (
        <ul className="absolute top-14 right-0 bg-white dark:bg-slate-700 shadow-2xl rounded-md py-2 text-black dark:text-white w-64">
          <div className="p-4 flex flex-col items-center">
            <img
              src={user?.image}
              className="w-12 h-12 rounded-full mb-2 object-cover"
              alt="profile"
            />
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{user?.role}</p>
            <p className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-1">
              <CiMail className="mr-1" size={16} />
              {user?.email}
            </p>
          </div>

          <div className="flex justify-center p-2">
            <button
              className="w-56 py-2 rounded-full bg-red-500 text-white hover:bg-red-600"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </ul>
      )}
    </div>
  </div>
</div>

  );
}

export default AdminHeader;
