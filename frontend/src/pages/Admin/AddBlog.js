import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NewsContext } from "../../context/NewsContext";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
function AddBlog() {
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
          formData.append('title', state.blog.title);
          formData.append('content', state.blog.content);
          formData.append('category', state.blog.category);
          formData.append('image', image); 
          formData.append('user',  user._id); 
           const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/Blog/AddBlog`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },  withCredentials: true
            }
          );
          console.log("API Yanıtı:", response.data);
        } catch (error) {
          console.error(error);
        }
      };
  return (
    <div className="flex flex-col w-full justify-center items-center text-center p-4">
    <form
      className="w-full    mx-auto p-2"
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
          value={state.blog.title || ""}
          onChange={(e) => filterChange(e, "blog")}
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5 mt-5">
      <label
          htmlFor="small-input"
          className="block mb-2 text-sm font-medium  dark:text-white"
        >
          Content
        </label>
         <ReactQuill 
       theme="snow" 
       name="content"
       value={state.blog.content || ""}
       className="resize border rounded-sm w-full bg-white text-black"
       onChange={(content) => filterChange({ target: { name: "content", value: content } }, "blog")}
       modules={{
         toolbar: [
           [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
           [{ 'list': 'ordered'}, { 'list': 'bullet' }],
           ['bold', 'italic', 'underline'],
           [{ 'align': [] }],
           [{ 'color': [] }, { 'background': [] }],
           ['clean']                                         
         ]
       }}
       placeholder="Metninizi buraya yazın..."
     />        </div>

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
    className="p-2 border rounded-lg w-full "
    name="category"
    value={state.blog.category || ""}
    onChange={(e) => filterChange(e, "blog")}
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
          Add Blog
        </button>
      </div>
    </form>
  </div>
  )
}

export default AddBlog
