import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { BsBookmark } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { NewsContext } from "../context/NewsContext";

function News() {
  const {query,category}=useContext(NewsContext);
   const [news,setNews]=useState([]);
   const [loading,setLoading]=useState(true)
   const [error,setError]=useState("")
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1); 
useEffect(()=>{
  const fetchNews= async()=>{
try {
  const response=await axios.get("http://localhost:5000/News",{
params :{
  page:currentPage,
  limit:5,
}

  });
  setNews(response.data.news)
  setTotalPages(Math.ceil(response.data.totalCount / 5))
} catch (error) {
  setError('Haberler alınamadı: ' + error.message);
} finally {
  setLoading(false)
}
}
fetchNews();
},[currentPage])

const filteredNews= news ? news.filter(item =>
  (item.title.toLowerCase().includes(query.toLowerCase())) && (category==="" || 
    category==="Kategoriler" || item.category._id.toLowerCase() ===category.toLowerCase())
):[];





const handlePrevPage=()=>{
if(currentPage >1){
  setCurrentPage(currentPage -1)
}
}
const handleNextPage =()=>{
  if(currentPage < totalPages){
    setCurrentPage(currentPage + 1)
  }
  }

if (loading) return <div>Loading...</div>;
if (error) return <div>{error}</div>;

  return (
    <div className='flex flex-col justify-center items-center  text-center p-10 bg-slate-100'>

    <div className="w-[800px] h-auto  space-y-4  p-6">
  <div className="flex text-xl ">
        <select className="  bg-slate-100  p-2 text-xl border-none focus:border-red-600">
          <option className="bg-white text-black">En yeni</option>
          <option className="bg-white text-black">En eski</option>
        </select>
        <select className="ml-auto bg-slate-100  p-2 text-xl border-none focus:border-red-600">
          <option className="bg-white text-black">En Sevilen Haberler</option>
          <option className="bg-white text-black">En Çok okunan</option>
        </select>
</div>

{filteredNews.length > 0 ? (
   filteredNews.map(item => (
    <div key={item.id} className='flex flex-row'>

        <img src={item?.image || "No image"} className="w-[250px]  object-cover rounded-t-md" alt="Tech" />
        <p className='text-gray-500 font-semibold m-2'>{item?.category?.name || "Kategori Yok"}</p>
        <Link to={`/News/${item._id}`}>
        <h1 className='text-black font-semibold text-xl p-6 text-left'>
{item.title}
        </h1>
        </Link>

      <div>  <button className='p-6'> <BsBookmark   className='text-red-600' size={40}/> </button></div>

      </div>
      ))
) : (<p>Loading...</p>)
}
 
      </div>
      
 <div >

 <nav aria-label="Page navigation example">
  <ul class="flex items-center -space-x-px h-8 text-2xl">
    <li>
      <button onClick={handlePrevPage} disabled={currentPage===1} class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <span class="sr-only">Previous</span>
        <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
        </svg>
      </button>
    </li>

{[...Array(totalPages)].map((_,index) => (
    <li key={index}>
      <button onClick={()=>setCurrentPage(index +1)} class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
      {index + 1}

      </button>
    </li>

))}


    <li>
      <button onClick={handleNextPage} disabled={currentPage===totalPages}  class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <span class="sr-only">Next</span>
        <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
      </button>
    </li>
  </ul>
</nav>

</div>

    </div>
  )
}

export default News