import React, { useContext, useState} from "react";
import { IoPersonOutline } from "react-icons/io5";
import { NewsContext } from "../context/NewsContext";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { IoPerson } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
function Login() {
const navigate=useNavigate();
  const { filterChange, state,user,setUser,handleLogout } = useContext(NewsContext);
  const [toggleDown,setToggleDown]=useState(false)
  const {
    toggleLoginModal,
    isModalOpen,
    toggleRegisterModal,
    isRegisterModalOpen,
  } = useContext(NewsContext);


  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  const handleSubmitRegister = async(event) => {
    event.preventDefault();
try {
    const registerData = {
        name: state.register.name,
        email: state.register.email,
        password: state.register.password,
        gender: state.register.gender,
        role:"user",
        Address:"",
        number:"",
        image:""
      };
      const response = await axios.post(
        `${backendUrl}/users/register`,
        registerData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toggleLoginModal(); // Modal kapatılır.
} catch (error) {
    console.log(error)
}
  };
  const handleSubmitLogin = async(event) => {
    event.preventDefault();

try {
    const loginData = { 
        email: state.login.email,
        password: state.login.password,
      };
      const response = await axios.post(
        "http://localhost:5000/users/login",
        loginData,
        { 
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUser(response.data.user)
      toggleLoginModal(); 
      alert(`Hoşgeldiniz ${user}`)
  
} catch (error) {
    console.log(error)
    alert(`Giriş başarısız. Lütfen bilgilerinizi kontrol edin. ${error}`,
    );

}}


const toggleSettings = () => setToggleDown(!toggleDown);



const isAdmin = () => {
  if (user?.role === "admin" || user?.role === "author") {
    navigate("/Admin");
  }
};

  return (
    <div className="lg:pb-2 ">
{user ?  (
  <div className=" relative flex items-center ">  
    <img src={user.image} onClick={toggleSettings} className="w-14 h-14 rounded-full cursor-pointer " alt="User Profile" />
    <button  className='ml-2  font-semibold text-xl text-white'>
  
        </button>
    {toggleDown && (
      <ul className="absolute  top-14  right-6 z-50 bg-white shadow-lg rounded-md py-2 text-black w-36 ">
        <li className="flex p-2 hover:bg-gray-100 cursor-pointer" onClick={isAdmin}><IoPerson className="m-1" /> Profilim</li>
        <li className="flex p-2 hover:bg-gray-100 cursor-pointer"><IoSettings className="m-1" /> Settings</li>
        <li className="flex p-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}><IoLogOut className="m-1" />Logout</li>
      </ul>
    )}
  </div>
) : (
  <button
    data-modal-target="authentication-modal"
    data-modal-toggle="authentication-modal"
    className="flex justify-between border rounded-full p-1 text-red-600 bg-white font-bold text-xl py-2 my-1"
    type="button"
    onClick={toggleLoginModal}
  >
    <IoPersonOutline className="mx-1" size={25} />
  </button>
)}

      {isModalOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden={!isModalOpen}
          className={`fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center ${
            isModalOpen ? "" : "hidden"
          }`}
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white  shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="flex text-center justify-center items-center text-xl font-semibold text-gray-900 dark:text-white">
                  Login
                </h3>
              
                <button
                  type="button"
                  onClick={toggleLoginModal}
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form
                  className="space-y-4"
                  onSubmit={handleSubmitLogin}
                  encType="multipart/form-data"
>
                  <div>
                    <label
                      htmlFor="Email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      onChange={(e) => filterChange(e, "login")}
                      name="email"
                      value={state.login.email || ""}
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      onChange={(e) => filterChange(e, "login")}
                      name="password"
                      id="password"
                      value={state.login.password || ""}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Password"
                    />
                  </div>
                  <div>
                    Don't you have an account?
                    <button
                      type="button"
                      className="text-green-500 font-bold"
                      onClick={() => {
                        toggleLoginModal(); // Login modalını kapat
                        toggleRegisterModal(); // Register modalını aç
                      }}
                    >
                      Create an Account
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {isRegisterModalOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden={!isRegisterModalOpen}
          className={`fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center ${
            isRegisterModalOpen ? "" : "hidden"
          }`}
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white  shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="flex text-center justify-center items-center text-xl font-semibold text-gray-900 dark:text-white">
                  Register
                </h3>
                <button
                  type="button"
                  onClick={toggleRegisterModal}
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form
                  className="space-y-4"
                  onSubmit={handleSubmitRegister}
                >
                  <div>
                    <label
                      htmlFor="Name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      onChange={(e) => filterChange(e, "register")}
                      name="name"
                      value={state.register.name || ""}
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="Email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      onChange={(e) => filterChange(e, "register")}
                      name="email"
                      value={state.register.email || ""}
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      onChange={(e) => filterChange(e, "register")}
                      value={state.register.password || ""}
                      name="password"
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Password"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Cinsiyet
                    </label>

                    <div className="flex items-center mb-4">
                      <input
                        type="radio"
                        onChange={(e) => filterChange(e, "register")}
                        id="male"
                        name="gender"
                        value="male"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="male"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Erkek
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="radio"
                        onChange={(e) => filterChange(e, "register")}
                        id="female"
                        name="gender"
                        value="female"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="female"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Kadın
                      </label>
                    </div>
                  </div>

                  <div>
                    Already you have an account?
                    <button
                      onClick={() => {
                        toggleRegisterModal(); // Register modalını kapat
                        toggleLoginModal(); // Login modalını aç
                      }}
                      className="text-green-500 font-bold"
                    >
                      Login
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
