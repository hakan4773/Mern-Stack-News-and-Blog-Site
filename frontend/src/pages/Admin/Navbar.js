import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegNewspaper } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { NewsContext } from '../../context/NewsContext';

function Navbar({ open, setOpen }) {

  const { user } = useContext(NewsContext);

  return (
    <div
      className={`fixed top-0 left-0 h-screen border-r shadow-md border-gray-300 z-40 
        bg-white transition-all duration-300
        ${open ? 'w-64' : 'w-16'}
      `}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className='flex items-center justify-center p-4'>
        {open && <h1 className='text-2xl font-bold text-gray-400'>Admin Panel</h1>}
      </div>

      <div className='flex flex-col mt-4 space-y-2 justify-center '>
        <NavItem to="/Admin" icon={<IoHomeOutline size={24} />} label="Dashboard" open={open} />
        <NavItem to="/Admin/Profile" icon={<AiOutlineDashboard size={24} />} label="Profile" open={open} />

        {user?.role === "admin" && (
          <NavItem to="/Admin/Users" icon={<CiUser size={24} />} label="Users" open={open} />
        )}

        <NavItem to="/Admin/AddNews" icon={<FaRegNewspaper size={24} />} label="Add News" open={open} />
        <NavItem to="/Admin/AddBlog" icon={<FaRegNewspaper size={24} />} label="Add Blog" open={open} />
        <NavItem to="/Admin/AuthorNews" icon={<FaRegNewspaper size={24} />} label="News" open={open} />

        {user?.role === "admin" && (
          <NavItem to="/Admin/AddCategory" icon={<MdCategory size={24} />} label="Add Category" open={open} />
        )}
      </div>
    </div>
  );
}

// NavItem Component
const NavItem = ({ to, icon, label, open }) => (
  <Link to={to} className='flex items-center p-3 text-gray-400 hover:text-blue-600 transition-colors'>
    {icon}
    {open && <span className='ml-4 text-lg'>{label}</span>}
  </Link>
);

export default Navbar;
