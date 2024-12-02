import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
function EditPage() {
const { id } = useParams();
const [categories,setCategories]=useState([]);
const [image,setİmage]=useState();
const [news,setNews]=useState({title:"" ,subtitle:"",content:"",category:"",image:""});

  useEffect(()=>{
    const fetchCategories=async()=>{
 const responseCategory=await axios.get("http://localhost:5000/categories");
setCategories(responseCategory.data.categories);
    }
fetchCategories();
   },[])
  useEffect(()=>{
  const fetchNews=async()=>{
 const response=await axios.get(`http://localhost:5000/News/${id}`);
 setNews({...response.data.news,category:response.data.news.category?._id || ""});
    }
    fetchNews();
  },[])

const handleImageChange=(e)=>{
setİmage(e.target.files[0])
}

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', news.title);
      formData.append('subtitle', news.subtitle);
      formData.append('content', news.content);
      formData.append('category', news.category);
      if (image) {
        formData.append('image', image);
    }      
       const response = await axios.put(`http://localhost:5000/News/EditPage/${id}`,
        formData,
        {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdate=(e)=>{
    const {name,value}=e.target
    setNews(prevState=>
    ({...prevState,[name]: value}))
  }
  const handleContentChange = (content) => {
    setNews(prevState => ({ ...prevState, content }));
  };

  return (
    <div className="flex flex-col w-full justify-center items-center text-center p-4">
    <form
      className="shadow-lg w-auto rounded-lg  bg-white  mx-auto p-2"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      
    >
      <div >
        <label
          htmlFor="small-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Title
        </label>
        <input
          type="text"
          id="small-input"
          name="title"
          placeholder="title..."
          value={news.title || ""}
          onChange={handleUpdate}
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="base-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Subtitle
        </label>
        <input
          type="text"
          id="base-input"
          name="subtitle"
          placeholder="subtitle..."
          value={news.subtitle || ""}
          onChange={handleUpdate}
          className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div className="mb-5">
       
        <ReactQuill 
      theme="snow" 
      name="content"
      value={news.content || ""}
      className="resize border rounded-sm w-full"
      onChange={handleContentChange}
      modules={{
        toolbar: [
          [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['bold', 'italic', 'underline'],
          [{ 'color': [] }, { 'background': [] }],
          ['image'], 
          ['clean']                                         
        ]
      }}
      placeholder="Metninizi buraya yazın..."
    />
      </div>
      <div className="mb-5">
{categories.length === 0 ? (
  <p>Yükleniyor...</p>
) : (
    <select
    className="p-2 border rounded-lg w-full"
    name="category"
    value={news.category}
    onChange={handleUpdate}
  >
    {categories.map((category) => (
      <option key={category._id} value={category._id}>
        {category.name}
      </option>
    ))}
  </select>
)}
</div>
<div className="mt-5">


{news.image && (
         <div className="flex justify-center items-center text-center mb-5">
            <img
              src={news.image} // Veritabanındaki mevcut görsel URL'si
              alt="Current"
              className="w-[300px] h-40 object-cover rounded-lg mx-auto mb-2"
            />
          </div>
        )}

        <input
          className="block w-full  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          type="file"
          name="image"
       
          onChange={handleImageChange}
        />
      </div> 

      <div>
        <button
          type="submit"
          className=" mt-6 w-full p-2 text-xl border bg-blue-600 text-white rounded-lg hover:bg-blue-300"
        >
          Update News
        </button>
      </div>
    </form>
  </div>
);
}

export default EditPage
