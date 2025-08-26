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
    }, []);

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
    <div className='flex flex-col w-full  items-center text-center p-4  h-full '>
<div className={`w-full h-auto flex ${mode ? 'bg-slate-400 text-white' : 'bg-slate-50 text-black'}`}>
  <table className="table-auto w-full text-black ">
    <thead>
      <tr className='bg-blue-300 text-white '>
        <th></th>
        <th>User ID</th>
        <th>User image</th>
        <th>User Role</th>
        <th>User Name</th>
        <th>User email</th>
        <th>User gender</th>
        <th>User Number</th>
        <th>User Address</th>
      </tr>
    </thead>
    <tbody >
      {userInformation?.map((user) => (
        <tr className='   ' key={user._id}>
          <td><button 
          onClick={()=>deleteUsers(user._id)}
            
            ><MdDelete className='text-red-500' size={20}/></button></td>
          <td className='border-r  border-gray-300  '>{user._id}</td>
          <td className='border-r  border-gray-300 '><img src={user.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt='users' className='p-2 w-20 h-20'></img></td>
          <td className='border-r  border-gray-300 '>       
              <select
                  className="m-2 p-2 border rounded-lg border-gray-200"
                  value={user.role}
                  onChange={(e) => assignRole(user._id, e.target.value)}
                >
                  <option value="user">user</option>
                  <option value="author">author</option>
                  <option value="admin">admin</option>
                </select>
          </td>
          <td className='border-r border-gray-300 '> {user.name}</td>
          <td className='border-r  border-gray-300 '>{user.email}</td>
          <td className='border-r  border-gray-300 '>{user.gender}</td>
          <td className='border-r border-gray-300 '>{user.number || "belirtilmemiş"}</td>
          <td className='border-r border-gray-300 '>{user.Address || "belirtilmemiş"}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  </div>
  )
}

export default Users
