import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import Login from "./Login";
import { jwtDecode } from "jwt-decode";
import { NewsContext } from "../context/NewsContext";
import axios from "axios";

function Header() {
  const { FilterSelect, Filterİnput,user,setUser } = useContext(NewsContext);
  const [categories, setCategories] = useState([]);
  const [toggleNotification, setToggleNotification] = useState(false);

 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");
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
    <div className="w-full lg:h-20 h-24 bg-red-600 flex flex-wrap justify-between items-center  top-0 left-0 z-50">
      <div className="font-thin lg:visible  text-white lg:p-4 py-2 ">
        {/* <h1 className="">
          <Link to="/" className="font-semibold lg:text-4xl sm:text-xs  ">
            <span className="text-blue-500">TEKNO</span><span>NEWS</span>
          </Link>
        </h1> */}
      </div>

      <div className="lg:space-x-4 gap-2  flex sm:flex-wrap   lg:flex-row  text-center items-center mr-auto ">
        <div><Link to="/" className="text-white font-bold lg:text-xl sm:text-sm lg:hover:bg-red-400 lg:rounded-md lg:p-2  hover:bg-red-300">AnaSayfa</Link></div>
        <div><Link to="/News" className="text-white font-bold lg:text-xl sm:text-sm  lg:hover:bg-red-400 lg:rounded-md lg:p-2  hover:bg-red-300">Haberler</Link></div>
        <div><Link to="/" className="text-white font-bold lg:text-xl sm:text-sm  lg:hover:bg-red-400 lg:rounded-md lg:p-2  hover:bg-red-300">Önerilenler</Link></div>

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

      <div className="p-5 relative bottom-[100px] lg:left-0 left-24 lg:top-0">
        <input
          type="text"
          name="filter"
          onChange={Filterİnput}
          placeholder="Ara..."
          className="border border-gray-300 rounded-md p-2 pl-10 text-gray-800 w-40 lg:w-60"
        />
        <CiSearch className="absolute top-8 left-8 text-gray-600" size={20} />
      </div>

      <div className="py-6 ml-4 relative bottom-[100px] lg:left-0 left-6 lg:top-0 overflow-visible ">
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

      
        <div className="lg:p-4 relative bottom-[100px] left-0 lg:top-0"><Login /></div>
  
    </div>
  );
}

export default Header;
