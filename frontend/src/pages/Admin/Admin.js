import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FaRegComments } from "react-icons/fa";
import { CiRead } from "react-icons/ci";
import { FaRegNewspaper } from "react-icons/fa6";
import axios from "axios";
import { FcOvertime } from "react-icons/fc";

function Admin() {
  const [news, setNews] = useState(0);
  const [blog, setBlog] = useState(0);
  const [Allusers, setAllusers] = useState(0);
  useEffect(() => {
   const fetchCount=async()=>{
try{
  const responseNews =await axios.get(`${process.env.REACT_APP_BACKEND_URL}/News`,{ withCredentials: true })
  const responseBlog =await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Blog`,{ withCredentials: true })
  const responseUsers =await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/users`,{ withCredentials: true })
    setNews(responseNews.data.news);
    setBlog(responseBlog.data.blog);
    setAllusers(responseUsers.data.Allusers);
}

    catch(error){
      console.error("Hata Oluştu: ", error.message);
    }
   }
   fetchCount();
  }, []);

  return (
    <div className="flex flex-row ">

<div className="py-2 px-2"> 
<div className="relative"> 
<FcOvertime className="absolute top-1 left-1" size={27}/>
  <select className="border-2 p-1 pl-10  rounded-md text-black border-slate-500 border-opacity-40 w-40">

  <option>
   1 hour
  </option>
  <option>
  7 days
  </option>
  <option>
   1 month
  </option>
  <option>
  All Time
  </option>
  </select>

</div>

      <div className="flex space-x-8 py-12">
      <div className="shadow-lg w-60 border-white  p-4 border rounded-md">
        <div className="flex justify-center items-center text-center">
          <FaRegUser size={40} className="text-orange-400" />
        </div>
        <div className="flex flex-col justify-center items-center text-center p-2">
          <p className="text-2xl text-orange-400 font-semibold">{Allusers}</p>
          <p className="text-2xl text-green-600">Welcome</p>
        </div>
      </div>
      <div className="shadow-lg w-40 border-white  p-4 border rounded-md">
        <div className="flex justify-center items-center text-center">
          <FaRegComments size={40} className="text-orange-400" />
        </div>
        <div className="flex flex-col justify-center items-center text-center p-2">
          <p className="text-2xl text-orange-400 font-semibold">120</p>
          <p className="text-2xl text-green-600">Comments</p>
        </div>
      </div>
      <div className="shadow-lg w-40 border-white  p-4 border rounded-md">
        <div className="flex justify-center items-center text-center">
          <CiRead size={40} className="text-orange-400" />
        </div>
        <div className="flex flex-col justify-center items-center text-center p-2">
          <p className="text-2xl text-orange-400 font-semibold">1000</p>
          <p className="text-2xl text-green-600">Reads</p>
        </div>
      </div>
      <div className="shadow-lg w-40 border-white  p-4 border rounded-md">
        <div className="flex justify-center items-center text-center">
          <FaRegNewspaper size={40} className="text-orange-400" />
        </div>
        <div className="flex flex-col justify-center items-center text-center p-2">
          <p className="text-2xl text-orange-400 font-semibold">{news.length}</p>
          <p className="text-2xl text-green-600">News</p>
        </div>
      </div>
      <div className="shadow-lg w-40 border-white  p-4 border rounded-md">
        <div className="flex justify-center items-center text-center">
          <FaRegNewspaper size={40} className="text-orange-400" />
        </div>
        <div className="flex flex-col justify-center items-center text-center p-2">
          {blog.length > 0 ? (
          <p className="text-2xl text-orange-400 font-semibold">{blog.length}</p>
        ):(<p>0</p>)}
          <p className="text-2xl text-green-600">Blog</p>
        </div>
      </div>
    </div>
    </div></div>

  );
}

export default Admin;
