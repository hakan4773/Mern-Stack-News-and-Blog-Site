import { FaInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { FaYoutube ,FaFacebook,FaMapMarkerAlt,FaPhoneAlt} from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";
import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import { Link } from "react-router-dom";
import axios from "axios";
function Footer() {
  const { filterChange, state } = useContext(NewsContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const contactData = {
        name: state.contact.name,
        email: state.contact.email,
     message:state.contact.message
      };
     await axios.post(`${process.env.REACT_APP_BACKEND_URL}/contact`,
        contactData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <footer className="w-screen  text-white bg-red-600  p-2 min-w-[400px]">
      <div className="flex  flex-wrap  lg:flex-row justify-around items-start">
        <form onSubmit={handleSubmit} className="w-full flex justify-center text-center items-center lg:w-1/4 ">
          <div className="flex flex-col lg:w-[280px] w-full lg:p-4 p-4 space-y-4 text-black">
            <h1 className="text-white text-xl">Bize Ulaşın</h1>
            <hr className="lg:w-80 w-full" />
            <input
              className="lg:w-80 w-full  p-2  "
              value={state.contact.name || ""}
              onChange={(e) => filterChange(e, "contact")}
              name="name"
              placeholder="Adınız"
            />
            <input
              className="lg:w-80 w-full p-2"
              value={state.contact.email || ""}
              onChange={(e) => filterChange(e, "contact")}
              name="email"
              placeholder="E-posta"
            />
            <textarea
              className="lg:w-80 w-full h-32 p-2"
              value={state.contact.message || ""}
              onChange={(e) => filterChange(e, "contact")}
              name="message"
              placeholder="Mesajınız"
            />
            <button className="lg:w-80 w-full border rounded-xl bg-white text-xl hover:bg-gray-100 ">
              Gönder
            </button>
          </div>
        </form>

        <div className="flex flex-col  lg:ml-8 my-4  space-y-4 ">
          <h1 className="text-white text-xl">Bizi Takip Edin</h1>
          <hr className="w-24" />
          <Link
            to="https://www.instagram.com/accounts/login/"
            className="hover:text-white"
          >
            <FaInstagram size={30} className=" transform hover:rotate-180 transition duration-400 hover:size-10" />
          </Link>
          <Link to="https://x.com/?lang=tr" className="hover:text-white">
            <BsTwitterX size={30} className=" transform hover:rotate-180 transition duration-400 hover:size-10" />
          </Link>
          <Link to="https://www.youtube.com/" className="hover:text-white">
            <FaYoutube size={30}  className=" transform hover:rotate-180 transition duration-400 hover:size-10"/>
          </Link>
          <Link
            to="https://www.facebook.com/?locale=tr_TR"
            className="hover:text-white"
          >
            <FaFacebook size={30} className=" transform hover:rotate-180 transition duration-400 hover:size-10"/>
          </Link>
        </div>

        <div className="flex flex-col  p-4 lg:p-4    space-y-4 items-start">
          <h1 className="text-white text-xl">Bağlantılar</h1>
          <hr className="w-20" />
          <ul className="font-medium space-y-4">
            <li>
              <Link className="hover:text-gray-400" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-400" to="/News">
                News
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-400" to="/">
                About
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-400" to="/">
                Contact
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-400" to="/">
                Help
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col  p-4 space-y-4  items-start ">
          <h1 className="text-white text-xl">İletişim bilgileri</h1>
          <hr className="w-40" />
          <p className="flex ">
            <GrLanguage className="m-2" />{" "}
            <span className="text-xl">Türkiye</span>{" "}
          </p>
          <p className="flex">
            <FaMapMarkerAlt className="m-2" />
            <span>İstanbul / Avrupa</span>
          </p>
          <p className="flex">
            <FaPhoneAlt className="m-2" />
            <span>(+90) 556 024 4561</span>
          </p>

        </div>
      </div>

      <div className="flex flex-row lg:space-x-4 sm:space-x-1 pt-6 justify-center">
        <Link>Gizlilik Politikası</Link>
        <div className="border-l lg:pr-2 mx-4"></div>
        <Link>Çerezlerin Kullanımı</Link>
        <div className="border-l lg:pr-2 mx-4"></div>
        <Link>Kullanım Şartları</Link>
        <div className="border-l lg:pr-2 mx-4"></div>
        <Link>Site Haritası</Link>
      </div>

      <p className="pt-2 text-center">Copyright © News 2024</p>
    </footer>
  );
}

export default Footer;
