import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import Login from "./Login";
import { NewsContext } from "../context/NewsContext";
import axios from "axios";

function Header() {
  const { FilterSelect, Filterİnput } = useContext(NewsContext);
  const [categories, setCategories] = useState([]);
  const [toggleNotification, setToggleNotification] = useState(false);
  const [menu,setMenu]=useState(false)
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendUrl}/categories`);
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
  const HandleMenu = () => {
    setMenu((prev) => !prev);
  };

  return (
    <div className="w-screen pb-8  lg:h-24 h-auto bg-red-600  flex flex-wrap justify-between items-center  z-50">
      {/* <div className="font-thin lg:visible  text-white lg:p-4 py-2 ">
         <h1 className="">
          <Link to="/" className="font-semibold lg:text-4xl sm:text-xs  ">
            <span className="text-blue-500">TEKNO</span><span>NEWS</span>
          </Link>
        </h1> 
      </div> */}
<div className={`block sm:hidden justify-center text-center  items-center ${menu && 'h-52'}`}>
<button onClick={HandleMenu}>
          <IoMenu className="text-white" size={40} />
        </button>
        {menu && (
          <div className="absolute top-14 left-0 w-full   bg-red-600 text-white shadow-lg z-50">
            <ul className="flex flex-col text-xl">
              <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer">
                <Link to="/">AnaSayfa</Link>
              </li>
              <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer">
                <Link to="/News">Haberler</Link>
              </li>
              <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer">
                <Link to="/">Önerilenler</Link>
              </li>
              <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer">
                <select
                  onChange={FilterSelect}
                  className="bg-red-600 hover:bg-gray-700 text-white p-2 border-none focus:outline-none"
                >
                  <option>Kategoriler</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id} className="bg-white text-black">
                      {category.name}
                    </option>
                  ))}
                </select>
              </li>
            </ul>
          </div>
        )}

</div>
      <div className=" px-8 lg:p-4 hidden sm:flex sm:flex-wrap   lg:flex-row  text-center items-center mr-auto ">
        <div id="home"><Link to="/" className="text-white font-bold lg:text-xl sm:text-sm lg:hover:bg-red-400 lg:rounded-md rounded-lg lg:p-2 p-1  hover:bg-red-300">AnaSayfa</Link></div>
        <div id="news"><Link to="/News" className="text-white font-bold lg:text-xl sm:text-sm  lg:hover:bg-red-400 lg:rounded-md rounded-lg lg:p-2 p-1 hover:bg-red-300">Haberler</Link></div>
        <div id="recommend"><Link to="/" className="text-white font-bold lg:text-xl sm:text-sm  lg:hover:bg-red-400 lg:rounded-md rounded-lg lg:p-2 p-1 hover:bg-red-300">Önerilenler</Link></div>

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

      <div className="lg:px-5 px-10 md:px-2 hidden sm:block relative">
        <input
          type="text"
          name="filter"
          onChange={Filterİnput}
          placeholder="Ara..."
          className="border border-gray-300 rounded-md p-2 pl-10 text-gray-800 w-[300px] md:w-44  lg:w-60"
        />
        <CiSearch className="absolute lg:top-3 lg:left-8   top-3 text-gray-600" size={20} />
      </div>


      <div className="relative lg:p-4  lg:mr-0 mr-auto hidden sm:block ">
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

      {/* relative bottom-[100px] left-0 lg:top-0       //lg:p-2 pr-6*/}
        <div className="lg:pr-8 pr-3 hidden sm:block  lg:mr-0 mr-auto" ><Login /></div>
  
    </div>
  );
}

export default Header;
