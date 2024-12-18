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
      const response = await axios.post(
        "http://localhost:5000/contact",
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
    <footer className="w-screen  text-white bg-red-600  p-2 overflow-hidden">
      {/* Tüm içeriği aynı hizada tutmak için flex */}
      <div className="flex  flex-wrap  lg:flex-row justify-around items-start">
        {/* Bize Ulaşın */}
        <form onSubmit={handleSubmit} className="sm:w-full lg:w-1/4 ">
          <div className="flex flex-col w-[280px] lg:p-4 space-y-4 text-black">
            <h1 className="text-white text-xl">Bize Ulaşın</h1>
            <hr className="w-80" />
            <input
              className="w-80 p-2  "
              value={state.contact.name || ""}
              onChange={(e) => filterChange(e, "contact")}
              name="name"
              placeholder="Adınız"
            />
            <input
              className="w-80 p-2"
              value={state.contact.email || ""}
              onChange={(e) => filterChange(e, "contact")}
              name="email"
              placeholder="E-posta"
            />
            <textarea
              className="w-80 h-32 p-2"
              value={state.contact.message || ""}
              onChange={(e) => filterChange(e, "contact")}
              name="message"
              placeholder="Mesajınız"
            />
            <button className="w-80 border rounded-xl bg-white text-xl hover:bg-red-600">
              Gönder
            </button>
          </div>
        </form>

        {/* Sosyal Medya Hesaplarımız */}
        <div className="flex flex-col w-[150px] ml-12 lg:ml-8 my-4  space-y-4 ">
          <h1 className="text-white text-xl">Bizi Takip Edin</h1>
          <hr className="w-24" />
          <Link
            to="https://www.instagram.com/accounts/login/"
            className="hover:text-white"
          >
            <FaInstagram size={30} />
          </Link>
          <Link to="https://x.com/?lang=tr" className="hover:text-white">
            <BsTwitterX size={30} />
          </Link>
          <Link to="https://www.youtube.com/" className="hover:text-white">
            <FaYoutube size={30} />
          </Link>
          <Link
            to="https://www.facebook.com/?locale=tr_TR"
            className="hover:text-white"
          >
            <FaFacebook size={30} />
          </Link>
        </div>

        {/* Bağlantılar */}
        <div className="flex flex-col w-[180px] p-4 lg:p-4    space-y-4 items-start">
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

        {/* İletişim Bilgileri */}
        <div className="flex flex-col w-[280px] lg:p-4 space-y-4  items-start ">
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

      <div className="flex flex-row lg:space-x-4 sm:space-x-2 justify-center">
        <Link>Gizlilik Politikası</Link>
        <div className="border-l"></div>
        <Link>Çerezlerin Kullanımı</Link>
        <div className="border-l"></div>
        <Link>Kullanım Şartları</Link>
        <div className="border-l"></div>
        <Link>Site Haritası</Link>
      </div>

      <p className="lg:pb-1 lg:ml-2 ml-24 pt-2">Copyright © News 2024</p>
    </footer>
  );
}

export default Footer;
