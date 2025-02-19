import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { NewsContext } from '../../context/NewsContext';
import { MdDelete } from "react-icons/md";

function Users() {
    const {mode}=useContext(NewsContext);
    const [userİnformation, setUserİnformation] = useState([]);

    useEffect(() => {
     const fetchUser=async()=>{
  try
  {
      const responseUsers =await axios.get("http://localhost:5000/users/users",{ withCredentials: true })
      setUserİnformation(responseUsers.data.userİnformation);
      console.log(responseUsers.data.userİnformation)
  }
      catch(error){
        console.error("Hata Oluştu: ", error.message);
      }
     }
     fetchUser();
    }, []);

const deleteUsers=async(id)=>
  {
     const confirmUsers=window.confirm("Are You Sure")

if(confirmUsers){
  try {
  await axios.delete(`http://localhost:5000/users/users/${id}`)
  setUserİnformation(userİnformation.filter(user=>user._id!==id))
} catch (error) {
  console.log("Kategori silinemedi",error.message)
}
}

  }



  return (
    <div className='flex flex-col w-full  items-center text-center p-4  h-full '>
<div className={`w-full h-auto flex ${mode ? 'bg-slate-400 text-white' : 'bg-slate-50 text-black'}`}>
  <table className="table-auto w-full text-black ">
    <thead>
      <tr className='bg-blue-500 text-white '>
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
      {userİnformation.map((user) => (
        <tr className='border-b border-black ' key={user._id}>
          <td><button 
          onClick={()=>deleteUsers(user._id)}
            
            ><MdDelete className='text-red-500' size={20}/></button></td>
          <td className='border-r  border-black '>{user._id}</td>
          <td className='border-r  border-black '><img src={user.image} alt='users' className='p-2 w-20 h-20'></img></td>
          <td className='border-r  border-black '>       
               <select className='m-2 '>
                <option className=' p-2' value={user.role}>{user.role}</option>
                </select>
          </td>
          <td className='border-r border-black '> {user.name}</td>
          <td className='border-r  border-black '>{user.email}</td>
          <td className='border-r  border-black '>{user.gender}</td>
          <td className='border-r border-black '>{user.number || "belirtilmemiş"}</td>
          <td >{user.Address || "belirtilmemiş"}</td>


        </tr>
      ))}
    </tbody>
  </table>
</div>






  </div>
  )
}

export default Users
