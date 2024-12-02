import axios from 'axios';
import React, { useContext, useEffect,useState } from 'react'
import { NewsContext } from "../../context/NewsContext";
import { MdDelete } from "react-icons/md";

function AddCategory() {
    const {state,filterChange}=useContext(NewsContext);
    const [categories,setCategories]=useState([]);
    useEffect(()=>{
    const fetchCategories=async()=>{
     const responseCategory=await axios.get("http://localhost:5000/categories");
    setCategories(responseCategory.data.categories);
        }
    fetchCategories();
      },[categories])

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const formData = new FormData();
          formData.append('name', state.category.name);
           const response = await axios.post(
            "http://localhost:5000/categories/AddCategory",
            formData,
          );
          console.log("API Yanıtı:", response.data.category);
        } catch (error) {
          console.error(error);
        }
      };

const deleteCategory=async(id)=>{
const confirmDelete=window.confirm("Silmek istediğinizden Emin Misiniz ?")
if(confirmDelete){
  try {
    await axios.delete(`http://localhost:5000/categories/AddCategory/${id}`)
setCategories(categories.filter(category=>category._id!==id))
  } catch (error) {
    console.log("Kategori silinemedi",error.message)
  }
}


}



  return (
    <div className="flex flex-col w-full justify-center items-center text-center p-4">
      <form
        className=" w-auto rounded-lg  bg-white  mx-auto p-2"
      
        onSubmit={handleSubmit}
      >

        
        <div >
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Category Name
          </label>
          <input
            type="text"
            id="small-input"
            name="name"
            value={state.category.name || ""}
            onChange={(e) => filterChange(e, "category")}
            className="block w-[500px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
      

      
          <button
            type="submit"
      
            className=" mt-6 w-[500px] p-2 text-xl border bg-blue-600 text-white rounded-lg hover:bg-blue-300"
          >
            Add Category
          </button>


        </div>
        
      </form>

      
      <div className="flex shadow-lg bg-white p-2 m-4 w-[800px]">
  <table className="table-auto w-full text-black ">
    <thead>
      <tr className='bg-slate-500 '>
        <th></th>
        <th>Category ID</th>
        <th>Category Name</th>
      </tr>
    </thead>
    <tbody >
      {categories.map((category) => (
        <tr className='border-b-2 border-black font-serif' key={category._id}>
          <td><button onClick={()=>deleteCategory(category._id)}><MdDelete className='text-red-500' size={20}/></button></td>
          <td>{category._id}</td>
          <td>{category.name}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  )
}

export default AddCategory
