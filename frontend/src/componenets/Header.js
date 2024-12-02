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
    <div className="w-screen h-20 bg-red-600 flex flex-row justify-start top-0 left-0 z-50">
      <div className="font-thin text-4xl text-white p-4">
        <h1 className="flex">
          <Link to="/" className="font-semibold text-4xl">
            <span className="text-blue-500">TEKNO</span>NEWS
          </Link>
        </h1>
      </div>

      <div className="space-x-8 flex justify-center text-center items-center mr-auto">
        <div><Link to="/" className="text-white font-bold text-xl">AnaSayfa</Link></div>
        <div><Link to="/News" className="text-white font-bold text-xl">Haberler</Link></div>
        <div><Link to="/" className="text-white font-bold text-xl">Önerilenler</Link></div>

        <div className="p-4 font-bold text-xl">
          {categories.length === 0 ? (
            <p>Yükleniyor...</p>
          ) : (
            <select
              onChange={FilterSelect}
              className="bg-red-600 text-white p-2 text-xl border-none focus:border-red-600"
            >
              <option className="bg-white text-black">Kategoriler</option>
              {categories.map(category => (
                <option key={category._id} value={category._id} className="bg-white text-black">
                  {category.name}
                </option>
              ))}
            </select>
          )}
        </div>

       
      </div>

      <div className="p-5 relative">
        <input
          type="text"
          name="filter"
          onChange={Filterİnput}
          placeholder="Ara..."
          className="border border-gray-300 rounded-md p-2 pl-10 text-gray-800"
        />
        <CiSearch className="absolute top-8 left-8 text-gray-600" size={20} />
      </div>

      <div className="py-6 ml-4 relative">
        <button className="relative" onClick={toggleNotificationHandler}>
          <IoMdNotificationsOutline className="m-1 text-white" size={30} />
          <span className="absolute top-0 right-0 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
        </button>
        {toggleNotification && (
          <ul className="absolute top-13 right-4 bg-white shadow-lg rounded-md py-2 text-black w-40 z-50">
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

      
        <div className="p-4"><Login /></div>
  
    </div>
  );
}

export default Header;
