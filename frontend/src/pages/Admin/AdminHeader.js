import React, { useContext, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiDark } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { NewsContext } from "../../context/NewsContext";
import { IoTimeOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

function AdminHeader() {
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
      className={`top-0 left-52 ml-[207px]   h-20  flex items-center justify-between border-b border-gray-200 z-50`}
    >
      <div className="relative flex items-center p-8">
        <input
          type="text"
          placeholder="Search..."
          className="border bg-gray-200 border-gray-300 rounded-full p-2 pl-10 text-gray-800 w-64 focus:outline-none"
        />
        <CiSearch className="absolute left-12 text-gray-600" size={20} />
        <div className="p-2">
          <button onClick={darkMode}>
            {mode ? <MdDarkMode size={30} /> : <CiDark size={30} />}
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative  border-white rounded-full  bg-slate-200">
          <button className="relative" onClick={toggleMessage}>
            <IoMdNotificationsOutline className="w-8 h-8 " />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-4 h-4 rounded-full ">
              {messages?.length || 0}
            </span>
          </button>
          {togglemessage && (
            <ul className="absolute top-14 right-4 w-80 bg-white shadow-2xl rounded-lg py-2  text-gray-800">
              <p className="flex justify-start font-bold px-4">
                All Notifications
              </p>
              <p className="flex px-4  text-gray-400 border-b-2">
                You have 3 unread messages
              </p>

              {messages.length > 0 ? (
                messages.map((mes) => (
                  <li
                    key={mes.id}
                    className="flex p-2 border-b border-white bg-slate-100 text-sm hover:bg-gray-200 cursor-pointer"
                  >
                    <img
                      src="image/google.jpg"
                      className="m-2 w-10 h-10 rounded-full cursor-pointer"
                      alt="google"
                    />
                    
                    <div className="flex flex-col text-left">
                      {mes?.message}
                      <div className="flex ">
                        <p className="text-sm text-gray-500 flex ">
                          <IoTimeOutline className="text-blue-500 " size={20} />
                          {formatTimeAgo(mes?.createdAt)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">No messages</li>
              )}
              <div className="flex justify-center text-center items-center p-2 ">
                <button className="text-blue-500 border-none text-lg font-semibold w-full ">
                  View All
                </button>
              </div>
            </ul>
          )}
        </div>

        <div className="px-4 flex items-center relative border-l border-white">
          <img
            src={user?.image}
            onClick={toggleLogin}
            className="w-12 h-12 rounded-full cursor-pointer"
            alt="profile"
          />
          {toggleDown && (
            <ul className="absolute top-14 right-6 bg-white shadow-2xl rounded-md py-2 text-black w-64">
              <p className="px-4 py-2 text-gray-800 font-semibold">
                {" "}
                User Profile
              </p>

              <div className="p-4 flex">
                <img
                  src={user?.image}
                  onClick={toggleLogin}
                  className="w-12 h-12 rounded-full cursor-pointer"
                  alt="profile"
                />
                <div>
                  <p className="px-4 text-gray-800 font-semibold ">
                    {user?.name}
                  </p>
                  <p className=" px-4 text-gray-600 text-sm">{user?.role}</p>
                  <p className="flex px-4 text-gray-600 text-sm">
                    <CiMail size={20} />
                    <span className="mx-1">{user?.email}</span>
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-center  text-center text-red-500">
                <button 
                className="border-red-400 border rounded-full p-2  w-60 hover:bg-red-100"
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
