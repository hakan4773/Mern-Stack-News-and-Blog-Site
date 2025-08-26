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
    setAllusers(responseUsers.data.allUsers);
}

    catch(error){
      console.error("Hata Oluştu: ", error.message);
    }
   }
   fetchCount();
  }, []);

  const stats = [
    { icon: <FaRegUser size={40} className="text-orange-400" />, value: Allusers, label: "Users" },
    { icon: <FaRegComments size={40} className="text-orange-400" />, value: 0, label: "Comments" },
    { icon: <CiRead size={40} className="text-orange-400" />, value: 1000, label: "Reads" },
    { icon: <FaRegNewspaper size={40} className="text-orange-400" />, value: news.length, label: "News" },
    { icon: <FaRegNewspaper size={40} className="text-orange-400" />, value: blog.length, label: "Blog" },
  ];

  return (
    <div className="p-6 mx-14 ">
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 `}>
        {stats.map((stat, index) => (
          <div key={index} className="shadow-lg border border-white rounded-md p-4  w-60 flex flex-col items-center justify-center bg-white">
            <div className="mb-2">{stat.icon}</div>
            <p className="text-2xl text-orange-400 font-semibold">{stat.value}</p>
            <p className="text-lg text-green-600 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;