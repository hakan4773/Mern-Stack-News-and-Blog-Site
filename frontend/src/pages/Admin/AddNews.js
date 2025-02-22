import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NewsContext } from "../../context/NewsContext";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
function AddNews() {
const { state, filterChange,user } = useContext(NewsContext);
const [categories,setCategories]=useState([]);
const [image,setİmage]=useState();

  useEffect(()=>{
    const fetchCategories=async()=>{
 const responseCategory=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/categories`);
setCategories(responseCategory.data.categories);
    }
fetchCategories();
  },[])



const handleImageChange=(e)=>{
setİmage(e.target.files[0])
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', state.news.title);
      formData.append('subtitle', state.news.subtitle);
      formData.append('content', state.news.content);
      formData.append('category', state.news.category);
      formData.append('image', image);  
      formData.append('user',  user._id); 
       const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/News/AddNews`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("API Yanıtı:", response.data);
      
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized: Check your token or authentication settings.");
      } else {
        console.error("An error occurred:", error);
      }
    }
  };
  return (
    <div className="flex flex-col w-full   justify-center items-center text-center p-4">
      <form
        className=" w-full rounded-lg    mx-auto p-2"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        
      >

        
        <div >
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium  dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="small-input"
            name="title"
            placeholder="title..."
            value={state.news.title || ""}
            onChange={(e) => filterChange(e, "news")}
            className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium  dark:text-white"
          >
            Subtitle
          </label>
          <input
            type="text"
            id="base-input"
            name="subtitle"
            placeholder="subtitle..."
            value={state.news.subtitle || ""}
            onChange={(e) => filterChange(e, "news")}
            className="bg-gray-50 w-full border text-black border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="mb-5">
        <label
          htmlFor="small-input"
          className="block mb-2 text-sm font-medium  dark:text-white"
        >
          Content
        </label>
          <ReactQuill 
        theme="snow" 
        name="content"
        value={state.news.content || ""}
        className="resize border rounded-sm w-full bg-white text-black"
        onChange={(content) => filterChange({ target: { name: "content", value: content } }, "news")}
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
        <label
          htmlFor="small-input"
          className="block mb-2 text-sm font-medium  dark:text-white"
        >
          Category
        </label>
  {categories.length === 0 ? (
    <p>Yükleniyor...</p>
  ) : (
    <select
      className="p-2 border rounded-lg w-full text-black"
      name="category"
      value={state.news.category || ""}
      onChange={(e) => filterChange(e, "news")}
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
<label
          htmlFor="small-input"
          className="block mb-2 text-sm font-medium  dark:text-white"
        >
          İmage
        </label>
          <input
            className="block w-full  text-sm text-black border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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
            Add News
          </button>

          
        </div>
    
      </form>
       
    </div>
  );
}

export default AddNews;
