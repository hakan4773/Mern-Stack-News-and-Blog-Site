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


    <div  className='grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2  gap-4 lg:w-[70%] w-[65%] h-full '>
    {filteredNews.length > 0 ? (
  filteredNews.slice(0,6).map((item) => (
      <div key={item._id} className='shadow-sm rounded-md bg-white lg:w-[300px] w-60 h-auto hover:shadow-xl' >
        <button onClick={()=>getSingleNews(item._id)}  >
          <img className="w-full h-40 object-cover rounded-t-md" src={item.image} alt="Tech" />
          <p className='text-gray-500 font-semibold p-2 text-left'>{item?.category?.name || "Kategori Yok"}</p>
          <div className='flex text-center justify-center items-center'>
          <h1 className='text-black  text-xl p-1 text-left'>{item.title}</h1>
          </div>
        </button>
      </div>
  ))
) : (
  <p>No results found...</p> // Veri gelene kadar bir yükleme mesajı göster
)}    </div>

    {/* Sağ taraftaki div */}
    <div className='lg:w-[20%]  mt-4  h-full shadow-sm w-[35%] '>
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
 
  <div className='flex  justify-between p-4 h-auto gap-2 '>

<div className='grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4 w-[70%] h-full'>
{filteredBlog.length > 0 ? (
  filteredBlog.map((item) => (
  <div key={item._id} className='border lg:w-[300px] w-60 h-auto rounded-md hover:shadow-xl shadow-sm bg-white'>
  <Link to={`/Blog/${item._id}`}>
    <img className="w-full h-40 object-cover rounded-t-md" src={item.image || "No image"} alt="Tech" />
     <p className='text-gray-500 font-semibold p-2 '>{item?.category?.name || "Kategori Yok"}</p>
     <h1 className='text-black text-xl p-2'>
{item.title}
    </h1>
    </Link>
  </div>

))): (
  <p>No results found...</p> )}
</div>


{/* Günün Sözü bölümü */}
<div className='lg:w-20%] w-52 p-2 h-full shadow-sm bg-white'>
      <h4 className='text-red-500 font-bold text-xl'>Günün Sözleri</h4>
      <div>
<p>İnsanın özgürlüğü; istediği her şeyi yapabilmesinde değil, istemediği hiçbir şeyi yapmak zorunda olmamasındadır.	</p>        
  <p className='flex text-end justify-end font-serif'>Jean-Jacques Rousseau</p>  
      </div>
</div>
</div>
  
</div>
  )
}

export default Main
