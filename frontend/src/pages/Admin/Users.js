import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { NewsContext } from '../../context/NewsContext';
import { MdDelete } from "react-icons/md";

function Users() {
    const {mode,user}=useContext(NewsContext);
    const [userInformation, setUserInformation] = useState([]);
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const responseUsers = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/users/users`,
            { withCredentials: true }
          );
          const filteredUsers = responseUsers.data.userInformation.filter(
            (users) => users._id !== user._id
          );
          console.log("Kullanıcı Bilgileri: ", filteredUsers);
          setUserInformation(filteredUsers);
        } catch (error) {
          console.error("Hata Oluştu: ", error.message);
        }
      };
      fetchUser();
    }, [user._id]);

const deleteUsers=async(id)=>
  {
    const confirmUsers = window.confirm("Are You Sure");
    if (confirmUsers) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/users/users/${id}`
        );
        setUserInformation(userInformation.filter((user) => user._id !== id));
      } catch (error) {
        console.error("Kategori silinemedi", error.message);
      }
    }
  }

  const assignRole = async (userId, role) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/Admin/users/${userId}/role`,
        { role },
        { withCredentials: true }
      );
      setUserInformation(
        userInformation.map((user) =>
          user._id === userId ? { ...user, role } : user
        )
      );
      alert("Yetki atandı");
    } catch (error) {
      console.error("Yetki atanamadı", error.message);
    }
  };

  return (
   <div className={`flex flex-col w-full p-4 h-full ${mode ? 'bg-slate-800 text-white' : 'bg-white text-black'}`}>
  <div className="hidden md:block overflow-x-auto w-full">
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead className='bg-blue-600 text-white'>
        <tr>
          <th className="p-2"></th>
          <th className="p-2">User ID</th>
          <th className="p-2">User image</th>
          <th className="p-2">User Role</th>
          <th className="p-2">User Name</th>
          <th className="p-2">User email</th>
          <th className="p-2">User gender</th>
          <th className="p-2">User Number</th>
          <th className="p-2">User Address</th>
        </tr>
      </thead>
      <tbody>
        {userInformation?.map((user) => (
          <tr key={user._id} className="border-b border-gray-300">
            <td className="p-2">
              <button onClick={() => deleteUsers(user._id)}>
                <MdDelete className='text-red-500' size={20} />
              </button>
            </td>
            <td className="p-2">{user._id}</td>
            <td className="p-2">
              <img
                src={user.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                alt='users'
                className='w-16 h-16 object-cover rounded-full'
              />
            </td>
            <td className="p-2">{user.role}</td>
            <td className="p-2">{user.name}</td>
            <td className="p-2">{user.email}</td>
            <td className="p-2">{user.gender}</td>
            <td className="p-2">{user.number || "belirtilmemiş"}</td>
            <td className="p-2">{user.Address || "belirtilmemiş"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div className="flex flex-col md:hidden gap-4">
    {userInformation?.map((user) => (
      <div key={user._id} className={`p-4 border rounded-lg shadow-md ${mode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
       <div className="flex items-center justify-center mb-2">
          <img
            src={user.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
            alt='user'
            className='w-16 h-16 object-cover rounded-full mr-4'
          />
         
        </div>
          <div className="mt-2">
          <select
            className="m-2 p-1 border rounded-lg border-gray-200 w-full"
            value={user.role}
            onChange={(e) => assignRole(user._id, e.target.value)}
          >
            <option value="user">user</option>
            <option value="author">author</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-lg">{user.name}</h2>
          <button onClick={() => deleteUsers(user._id)}>
            <MdDelete className='text-red-500' size={20} />
          </button>
        </div>
       
        <div>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Number:</strong> {user.number || "belirtilmemiş"}</p>
          <p><strong>Address:</strong> {user.Address || "belirtilmemiş"}</p>
        </div>
      
      </div>
    ))}
  </div>
</div>

  );
}

export default Users
