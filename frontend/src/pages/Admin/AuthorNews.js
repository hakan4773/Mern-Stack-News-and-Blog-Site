import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { NewsContext } from "../../context/NewsContext";

function AuthorNews() {
  const {setUser } = useContext(NewsContext);
    const [news,setNews]=useState([]);
    const [blog,setBlog]=useState([]);
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState("")
    const [selectedType, setSelectedType] = useState("News");
   
    useEffect(()=>{
   const fetchNews= async()=>{
 try {
   const response=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Admin`, { withCredentials: true });
   const responseBlog=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Blog`, { withCredentials: true });
   setUser(response.data.user);
   setNews(response.data.user.news)
   setBlog(responseBlog.data.blog)
 } catch (error) {
   setError('Haberler alınamadı: ' + error.message);
 } finally {
   setLoading(false)
 }
 }
 fetchNews();
 },[setUser])

  const deletePosts=async(id)=>{
    const confirmDelete=window.confirm("Silmek istediğinizden emin misiniz?")
    console.log(id)
if(confirmDelete){
  try {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/${selectedType}/AuthorNews/${id}`);
   selectedType==="News" ? setNews(news.filter(item => item._id !== id)) : setBlog(blog.filter(item => item._id !== id))
    console.log("Haber başarıyla silindi")
  } catch (error) {
    setError('Haber silinemedi: ' + error.message);
  } finally {
    setLoading(false)
  }
  }
}


const selectedChange=(e)=>{
setSelectedType(e.target.value)
}
const getData=selectedType==="News" ? news : blog

 if (loading) return <div>Loading...</div>;
 if (error) return <div>{error}</div>;

  return (
    <div className='flex flex-col  p-6   '>
      {selectedType ==="News" ? <p className=' text-lg font-bold'>News Count : {news.length} </p> :<p className=' text-lg font-bold'>Blog Count : <span className='text-red-500'>{blog.length}</span></p> }

      <div className='flex'>
        
        <div className='py-4'>
        <div className="text-xl text-black">
        <select  onChange={selectedChange} className="bg-slate-50 p-2 text-xl border-none rounded-xl focus:border-red-600">
          <option value="News" className="bg-white text-black">My News</option>
          <option value="Blog" className="bg-white text-black">My Blogs</option>
        </select>
      </div>

        </div>

      </div>

       <div  className='grid lg:grid-cols-4 sm:grid-cols-1 gap-8  h-full '>
    {getData.length > 0 ? (
  getData.map((item) => (
      <div key={item._id} className='border w-[250px] h-auto '>
        <Link to={`/${selectedType}/${item._id}`}>
          <img className="w-full h-64 object-cover rounded-t-md" src={item?.image || "No image"} alt="Tech" />
          <p className='text-gray-500 font-semibold p-1 flex justify-start text-start items-start'>{item?.category?.name || "Kategori Yok"}</p>
          <h1 className=' p-2 flex justify-start text-start items-start'>{item.title.substring(0,80)+"..."}</h1>
          </Link>
      
       <div className='flex flex-col p-2'>  
         <button onClick={()=>deletePosts(item._id)} className='w-full border rounded-md bg-red-500 p-1 m-1'>Sil</button>
         {selectedType === "News" ? (
  <Link to={`/Admin/News/EditPage/${item._id}`}  className=' w-full flex justify-center text-center items-center border rounded-md bg-blue-500 p-1 m-1'>
    Güncelle
  </Link>
) : (
  <Link to={`/Admin/Blog/EditBlogPage/${item._id}`} className=' w-full flex justify-center text-center items-center border rounded-md bg-blue-500 p-1 m-1'>
    Güncelle
  </Link>
)}

    
    
    
    </div>
    
     </div>
    ))
) : (
  <p>Yükleniyor...</p> 
)}    </div>

      </div>
  )}
export default AuthorNews
