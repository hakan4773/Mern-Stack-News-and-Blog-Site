import React, { useEffect, useState } from 'react'
import { Carousel } from "flowbite-react";
import { Link } from 'react-router-dom';
import Main from '../componenets/Main';
import axios from 'axios';
function Home() {
 const [news,setNews]=useState([]);

 useEffect(()=>{  
const fetchNews=async()=>{
try {
const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/https://mern-stack-news-and-blog-site-1.onrender.com/News?limit=10`)
setNews(response.data.news)
} catch (error) {
  console.log(error)
}
}
fetchNews();
},[])


  return (
    <div className='w-full bg-slate-100 min-w-[400px]' >
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96  ">
    <Carousel>
      {news.length > 0 ?( 
        news.slice(0,10).map((item,index)=> (
    <Link to={"/news"} key={index}>
      <div  className="relative flex h-full items-center justify-center  bg-gray-400 dark:bg-gray-700 dark:text-white">
     <img className='w-auto object-cover ' src={item.image} alt={item.category.name}>
     </img>  
     <div className='absolute inset-0 text-4xl w-[500px] flex  text-center justify-center items-center'>
     <h1 className=' text-white '>{item.title} </h1>
     </div>
   </div>
   </Link>
   ))
):(<p>Yükleniyor...</p>) }


    </Carousel>
    </div>

<Main />




    </div>


  )
}

export default Home
