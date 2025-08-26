import React, { useContext} from 'react'
import { NewsContext } from "../../context/NewsContext";
import axios from 'axios';
import { Link } from 'react-router-dom'
function ChangePassword() {
    const { user,setUser ,mode} = useContext(NewsContext);  
 

    const handleSubmit = async (e) =>{
      e.preventDefault();
      try {
        const response = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/users/update-password`,
            {
              oldPassword: user.oldPassword,
              newPassword: user.newPassword,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true, 
            }
          
          );  console.log(response.data);
          alert("Şifre başarıyla güncellendi.")
      } catch (error) {
        console.error(error);
      }
    };

    const handleChange = (e) => {
  const {name,value}=e.target
  setUser(prevUser=>({...prevUser,[name]:value}))
    }
return (
  <div className={`flex flex-col items-center p-4 lg:w-full w-[400px] h-full `}>
    <div className={`rounded-md shadow-lg flex flex-col lg:flex-row w-full max-w-4xl bg-slate-50 dark:bg-slate-800 text-black dark:text-white p-4 ${mode ? 'bg-zinc-700 text-white' : 'bg-white text-black'}`}>
      
      <div className="relative w-full lg:w-1/3 flex justify-center mb-4 lg:mb-0">
        <img
          src={user.image}
          className="w-40 h-40 rounded-full p-1 shadow-md object-cover"
          alt="User Profile"
        />
        <input
          type="file"
          name="image"
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-70 w-32 h-10 text-sm text-black border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 dark:text-gray-400 focus:outline-none"
        />
      </div>

      <form onSubmit={handleSubmit} className="flex-1">
        <div className="flex flex-col w-full lg:w-2/3 p-4 space-y-4">
          
          <div className="flex flex-row justify-between space-y-0">
            <Link
              to="/Admin/Profile"
              className="text-slate-600 hover:text-blue-500"
            >
              Profile
            </Link>
            <Link
              to="/Admin/ChangePassword"
              className="text-slate-600 hover:text-blue-500"
            >
              Change Password
            </Link>
          </div>

          <hr className="w-full border-gray-300" />

          <input
            className="w-full p-2 shadow-md bg-slate-50 dark:bg-slate-700 rounded"
            onChange={handleChange}
            name="oldPassword"
            type="password"
            placeholder="Old Password"
          />
          <input
            className="w-full p-2 shadow-md bg-slate-50 dark:bg-slate-700 rounded"
            onChange={handleChange}
            name="newPassword"
            type="password"
            placeholder="New Password"
          />
          
          <button className="w-full py-2 rounded-xl bg-green-500 text-white text-lg hover:bg-red-600">
            Change Password
          </button>
        </div>
      </form>
    </div>
  </div>
);
}
export default ChangePassword