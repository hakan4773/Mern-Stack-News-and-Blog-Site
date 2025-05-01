import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NewsContext } from "../context/NewsContext";
function Main() {

  const navigate=useNavigate();
  const {query,category}=useContext(NewsContext);
  const [news, setNews] = useState([]);
  const [blog, setBlog] = useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
useEffect(()=>{
   const fetchNews= async()=>{
try {
 const responsenews =await axios.get(`${process.env.REACT_APP_BACKEND_URL}/News?limit=6`) 
 const responseblog =await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Blog`)
 setNews(responsenews.data.news)  //haberleri kaydet
 setBlog(responseblog.data.blog)  //blog yazıları kaydet

} catch (error) {
  setError('Haberler alınamadı: ' + error.message);
} finally {
  setLoading(false)
}
   }
   fetchNews()
  },[])


const getSingleNews=(id)=>{
  navigate(`/News/${id}`);  
}

 const filteredNews= news ? news.filter(item =>
  (item.title.toLowerCase().includes(query.toLowerCase())) && (category==="" || 
    category==="Kategoriler" || item.category._id.toLowerCase() ===category.toLowerCase())
):[];
  const filteredBlog= blog ? blog.filter(item=>
    (item.title.toLowerCase().includes(query.toLowerCase())) && (category==="" || category==="Kategori Yok" || 
      category==="Kategoriler" || item.category._id.toLowerCase() ===category.toLowerCase())
):[]
  if (loading) return <p>No results found...</p>;
  if (error) return <p>{error}</p>;
  return (
     
<div className='flex  w-full overflow-hidden flex-col min-w-[400px]'> {/* üST taraftaki div */}
<div className='p-2 mx-2'>
<h1 className='font-bold text-red-600 text-2xl p-2'>GÜNCEL HABERLER</h1>
</div>


    <div className='flex  justify-between p-4 h-auto gap-2 '>

    {/* Sol taraftaki div */}


    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl mx-auto">
  {filteredNews.length > 0 ? (
    filteredNews.slice(0, 6).map((item) => (
      <div
        key={item._id}
        className="bg-white rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-full"
      >
        <button
          onClick={() => getSingleNews(item._id)}
          className="w-full text-left"
          aria-label={`View details for ${item.title}`}
        >
          <img
            className="w-full h-40 sm:h-48 object-cover rounded-t-lg"
            src={item.image}
            alt={item.title || "News image"}
          />
          <div className="p-4">
            <p className="text-gray-500 font-semibold text-sm sm:text-base">
              {item?.category?.name || "Kategori Yok"}
            </p>
            <h1 className="text-black text-lg sm:text-xl font-bold mt-2 line-clamp-2">
              {item.title}
            </h1>
          </div>
        </button>
      </div>
    ))
  ) : (
    <p className="col-span-full text-center text-gray-500">Sonuç bulunamadı...</p>
  )}
</div>

    {/* Sağ taraftaki div */}
    <div className='lg:w-[20%]  mt-4  h-full shadow-sm w-[35%] hidden md:block bg-white p-2'>
      <h1 className='text-red-500 font-bold text-xl'>En çok tıklananlar</h1>
      {news.length > 0 ? (
  news.slice(0, 3).map((item) => (
<div className=' p-1' key={item._id}>       
<img src={item.image} className="w-full object-cover rounded-t-md h-28"  alt={item?.category?.name} />
<Link to={`/news/${item._id}`} className=' hover:font-semibold '>  {item.title.substring(0,30)+"..."}
</Link>
</div>
  ))
) : (
  <p>No results found...</p>
)} 


    </div>
 
</div>





{/* AltSol taraftaki div */}
  <div className='flex  p-4 mx-4'> 
  <h1 className='font-bold text-red-600 text-2xl'>BLOG YAZILAR</h1>

  </div>
 
  <div className="flex flex-col md:flex-row justify-between p-4 gap-6  mx-auto">
  {/* Blog Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full md:w-[70%]">
    {filteredBlog.length > 0 ? (
      filteredBlog.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-full"
        >
          <Link
            href={`/Blog/${item._id}`}
            aria-label={`Read blog post: ${item.title}`}
          >
            <img
              className="w-full h-40 sm:h-48 object-cover rounded-t-lg"
              src={item.image || "/fallback-image.jpg"}
              alt={item.title || "Blog image"}
            />
            <div className="p-4">
              <p className="text-gray-500 font-semibold text-sm sm:text-base">
                {item?.category?.name || "Kategori Yok"}
              </p>
              <h1 className="text-black text-lg sm:text-xl font-bold mt-2 line-clamp-2">
                {item.title}
              </h1>
            </div>
          </Link>
        </div>
      ))
    ) : (
      <p className="col-span-full text-center text-gray-500">
        Sonuç bulunamadı...
      </p>
    )}
  </div>

  {/* Günün Sözü (Quote of the Day) */}
  <div className="w-full md:w-[25%] p-4 bg-white rounded-lg shadow-sm">
    <h4 className="text-red-500 font-bold text-lg sm:text-xl mb-4">
      Günün Sözleri
    </h4>
    <div>
      <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
        İnsanın özgürlüğü; istediği her şeyi yapabilmesinde değil, istemediği
        hiçbir şeyi yapmak zorunda olmamasındadır.
      </p>
      <p className="text-right text-gray-500 font-serif text-sm sm:text-base mt-2">
        Jean-Jacques Rousseau
      </p>
    </div>
  </div>
</div>
  
</div>
  )
}

export default Main
