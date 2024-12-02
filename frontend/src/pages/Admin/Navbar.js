import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegNewspaper } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { NewsContext } from '../../context/NewsContext';
function Navbar() {
  const {user}=useContext(NewsContext);
  return (
    <div className='fixed top-0 p-4 space-y-8 h-screen  border-r  shadow-md border-r-gray-300   z-40'  >
      <div>
      <Link to={"/"} className='flex justify-center text-center text-4xl font-bold text-gray-400  w-full hover:text-blue-600 focus:text-blue-600'>
  NEWS
    </Link>
      </div>
    <div className='w-full'>
    <Link to={"/Admin"} className='flex text-xl  text-gray-400  w-full hover:text-blue-600 focus:text-blue-600'>
    <IoHomeOutline  size={20} className=' mx-4' />
    Dashboard</Link>
    </div>
    <div className='w-full'>
    <Link  to={"/Admin/Profile"} className='flex  text-xl  text-gray-400 w-full hover:text-blue-600 focus:text-blue-600'>
    < AiOutlineDashboard size={20} className='mx-4' />
    Profile</Link>
    </div>


    {(user?.role === "admin") && (
    <div className='w-full'>
        <Link to={"/Admin/Users"} className='flex text-gray-400 text-xl w-full hover:text-blue-600 focus:text-blue-600'>
            <CiUser size={20} className='mx-4'/>
            Users
        </Link>
    </div>
)}
    <div className='w-full'>
    <Link className='flex  text-gray-400  text-xl   w-full hover:text-blue-600 focus:text-blue-600'>
    <FaRegComment size={20} className='mx-4'/>

    Comments</Link>
    </div>

    <div className='w-full'>
    <Link to={"/Admin/AddNews"} className='flex text-xl  text-gray-400  hover:text-blue-600 focus:text-blue-600 w-full'>
    <FaRegNewspaper  size={20} className='mx-4' />
 Add News</Link>
    </div> 
    <div className='w-full'>
    <Link to={"/Admin/AddBlog"} className='flex text-xl   text-gray-400  hover:text-blue-600 focus:text-blue-600 w-full'>
    <FaRegNewspaper  size={20} className='mx-4' />
    Add Blog</Link>
    </div> 

    <div className='w-full'>
    <Link to={"/Admin/AuthorNews"} className='flex text-xl   text-gray-400   w-full hover:text-blue-600 focus:text-blue-600'>
    <FaRegNewspaper  size={20} className='mx-4' />
    News</Link>
    </div>  


    {(user?.role === "admin") && (
    <div className=' w-full '>
    <Link to={"/Admin/AddCategory"} className='flex text-xl   text-gray-400  w-full hover:text-blue-600 focus:text-blue-600'>
    <MdCategory  size={20} className='mx-4' />
    Add Category</Link>
    </div> 
 )}
       </div>
  )
}

export default Navbar
