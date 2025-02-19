import React, { useContext} from 'react'
import { NewsContext } from "../../context/NewsContext";
import axios from 'axios';
import { Link } from 'react-router-dom'

function Profile() {
    const { user,setUser ,mode} = useContext(NewsContext);  
 

      const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
          const formData = new FormData();
          formData.append('name',user.name);
          formData.append('number', user.number);
          formData.append('Address',user.Address);
     
           const response = await axios.put(`http://localhost:5000/users/users/${user._id}`,
            formData,
            {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
                withCredentials: true,  // Bu satırda oturum bilgilerini gönderiyoruz

              }
          );
          console.log(response)
        } catch (error) {
          console.error(error);
        }
      };

      const handleChange = (e) => {
    const {name,value}=e.target
    setUser(prevUser=>({...prevUser,[name]:value}))
      }
  return (
    <div className='flex flex-col w-full  items-center text-center p-4  h-full  '>
      <div className={`border-white  rounded-md shadow-lg w-[600px] h-auto flex ${mode ? 'bg-slate-400 text-white' : 'bg-slate-50 text-black'}`}>
      <div className='relative w-52'>
      <img src={user.image} className="absolute inset-0  w-40 h-40 rounded-full p-1 shadow-md" alt="User Profile" />
      <input
      className="absolute  inset-14   left-8 opacity-40 h-10 w-24 text-sm text-black border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
      type="file"
      name="image"
   
    />
      </div>
  
      <form onSubmit={handleSubmit}>
          <div className="flex flex-col w-[280px] p-4 space-y-4 text-black ">
           {/* <h1 className=" text-xl">My Profile</h1> */}
           <div className='flex justify-between '>
              <Link to={"/Admin/Profile"} className='text-slate-600 text-xl hover:text-blue-500 focus:text-blue-500'>Profile</Link>
              <Link to={"/Admin/ChangePassword"} className='text-slate-600 text-xl hover:text-blue-500 focus:text-blue-500' > Change Password</Link>

            </div>
            
            <hr className="w-80" />

            <input
              className="w-80 p-2 shadow-md bg-slate-50"
              value={user.name || ""}
              onChange={handleChange}
              name="name"
              placeholder="Adınız"
            />
            <input
              className="w-80 p-2 shadow-md bg-slate-50"
              value={user.email || ""}
              name="email"
              placeholder="E-posta"
            />
              <input
              className="w-80 p-2 shadow-md bg-slate-50"
              value={user.number || ""}
              onChange={handleChange}

              name="number"
              placeholder="Telefon numaranız"
            />
            <textarea
             value={user.Address || ""}
              className="w-80 h-20 p-2 shadow-md bg-slate-50"
              onChange={handleChange}
              name="Address"
              placeholder="Adresiniz"
            />
            <button className="w-80 border rounded-xl bg-blue-500  text-xl hover:bg-red-600">
              Update
            </button>
          </div>
        </form>






      </div>

    </div>
  )
}

export default Profile
