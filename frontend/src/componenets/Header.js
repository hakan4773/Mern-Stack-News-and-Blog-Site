import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import Login from "./Login";
import { NewsContext } from "../context/NewsContext";
import axios from "axios";

function Header() {
  const { FilterSelect, Filterİnput } = useContext(NewsContext);
  const [categories, setCategories] = useState([]);
  const [toggleNotification, setToggleNotification] = useState(false);
  
  const [isOpen, setIsOpen] = useState(false);
 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/categories`);
        setCategories(response.data.categories);
      } catch (error) {
        console.log("Kategori verisi alınamadı:", error);
      }
    };

    fetchCategories();
  }, []);

  const toggleNotificationHandler = () => {
    setToggleNotification(prev => !prev);
  };


  return (
    <div className="w-full  min-w-[400px] z-50
     bg-red-600  flex flex-wrap justify-between items-center  ">

<div className= "hidden md:flex justify-center text-center items-center container">


       <div className="  px-8 lg:p-4  sm:flex sm:flex-wrap   lg:flex-row  text-center items-center mr-auto ">
        <div id="home"><Link to="/" className="block text-white font-bold lg:text-xl sm:text-sm lg:hover:bg-red-400 lg:rounded-md rounded-lg lg:p-2 p-1  hover:bg-red-300">AnaSayfa</Link></div>
        <div id="news"><Link to="/News" className="block text-white font-bold lg:text-xl sm:text-sm  lg:hover:bg-red-400 lg:rounded-md rounded-lg lg:p-2 p-1 hover:bg-red-300">Haberler</Link></div>
        <div id="recommend"><Link to="/" className="block text-white font-bold lg:text-xl sm:text-sm  lg:hover:bg-red-400 lg:rounded-md rounded-lg lg:p-2 p-1 hover:bg-red-300">Önerilenler</Link></div>

{/* Select */}
        <div className="lg:p-4  font-bold lg:text-xl sm:text-sm ">
          {categories.length === 0 ? (
            <p>Yükleniyor...</p>
          ) : (
            <select
              onChange={FilterSelect}
              className="bg-red-600 lg:hover:bg-red-400 lg:rounded-md lg:p-2 text-white p-2 lg:text-xl sm:text-sm border-none focus:border-red-600"
            >
              <option className="bg-white text-black ">Kategoriler</option>
              {categories.map(category => (
                <option key={category._id} value={category._id} className="bg-white text-black">
                  {category.name}
                </option>
              ))}
            </select>
          )}


        </div>

  
  
    </div>
      {/* İnput */}    
      
 <div className="lg:px-5 px-10  relative">
        <input
          type="text"
          name="filter"
          onChange={Filterİnput}
          placeholder="Ara..."
          className="border border-gray-300 rounded-md p-2 pl-10 text-gray-800 w-[300px] md:w-44  lg:w-60"
        />
        <CiSearch className="absolute lg:top-3 lg:left-8   top-3 text-gray-600" size={20} />
      </div>
       


{/* bildirim */}
      <div className="relative lg:p-4   flex items-center ">
        <button className="relative lg:hover:bg-red-400 lg:rounded-md   hover:bg-red-300" onClick={toggleNotificationHandler}>
          <IoMdNotificationsOutline className="m-1 text-white" size={30} />
          <span className="absolute top-0 right-0 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
        </button>
        {toggleNotification && (
          <ul className="absolute top-14 right-4 bg-white shadow-lg rounded-md py-2 text-black w-40 z-[9999]">
            <p className="flex justify-center items-center text-center font-bold border-b-4">Notification</p>
            <li className="p-2 border-b hover:bg-gray-100 cursor-pointer">
              <span className="mx-1 font-bold">1)</span>X kullanıcısından bir mesajınız var
            </li>
            <li className="p-2 border-b hover:bg-gray-100 cursor-pointer">
              <span className="mx-1 font-bold">2)</span>A:selam
            </li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">
              <span className="mx-1 font-bold">3)</span>A:Nasılsın
            </li>
          </ul>
        )}
      </div>



    {/* Login */}
        <div className="flex justify-end items-end " ><Login /></div>
      </div>




      <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {isOpen && (
  <div className="md:hidden    flex flex-col px-4 w-full">
    {/* Üst Kısım - Bildirim ve Login */}
    <div className="flex justify-end items-end w-full px-4 gap-3">
      {/* Bildirim */}
      <div className="relative">
        <button className="p-2 hover:bg-red-300 rounded-md transition-colors" onClick={toggleNotificationHandler}>
          <IoMdNotificationsOutline className="text-white" size={25} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
        </button>
        {toggleNotification && (
          <ul className="absolute top-12 right-0 bg-white shadow-lg rounded-md py-2 text-black w-64 z-[9999]">
            <p className="flex justify-center items-center text-center font-bold border-b p-2">Notification</p>
            <li className="p-3 border-b hover:bg-gray-100 cursor-pointer text-sm">
              <span className="mr-2 font-bold">1)</span>X kullanıcısından bir mesajınız var
            </li>
            <li className="p-3 border-b hover:bg-gray-100 cursor-pointer text-sm">
              <span className="mr-2 font-bold">2)</span>A:selam
            </li>
            <li className="p-3 hover:bg-gray-100 cursor-pointer text-sm">
              <span className="mr-2 font-bold">3)</span>A:Nasılsın
            </li>
          </ul>
        )}
      </div>
      <div><Login /></div>
    </div>

    {/* Navigasyon Linkleri */}
    <div className="flex flex-col space-y-3 w-full">
      <Link to="/" className="text-white hover:text-red-500 transition py-2 text-center">AnaSayfa</Link>
      <Link to="/News" className="text-white hover:text-red-500 transition py-2 text-center">Haberler</Link>
      <Link to="/" className="text-white hover:text-red-500 transition py-2 text-center">Önerilenler</Link>
      {/* Kategoriler Select */}
    <div className="w-full mx-2">
      {categories.length === 0 ? (
        <p className="text-center text-white">Yükleniyor...</p>
      ) : (
        <select
          onChange={FilterSelect}
          className="w-full bg-red-600 hover:bg-red-400 text-center rounded-md p-2.5 text-white text-sm border-none focus:border-red-600"
        >
          <option className="bg-white text-black ">Kategoriler</option>
          {categories.map(category => (
            <option key={category._id} value={category._id} className="bg-white text-black">
              {category.name}
            </option>
          ))}
        </select>
      )}
    </div>
    </div>


  

    {/* Arama Kutusu */}
    <div className="relative w-full p-3 ">
      <input
        type="text"
        name="filter"
        onChange={Filterİnput}
        placeholder="Ara..."
        className="w-full border border-gray-300 rounded-md p-2.5 pl-10 text-gray-800"
      />
      <CiSearch className="absolute top-6 left-6 text-gray-600" size={20} />
    </div>
  </div>
)}







      </div>



 
  );
}

export default Header;
