import axios from 'axios';
import React, { useContext, useEffect,useState } from 'react'
import { NewsContext } from "../../context/NewsContext";
import { MdDelete } from "react-icons/md";

function AddCategory() {
    const {state,filterChange}=useContext(NewsContext);
    const [categories,setCategories]=useState([]);
    useEffect(()=>{
    const fetchCategories=async()=>{
     const responseCategory=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/categories`);
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
            `${process.env.REACT_APP_BACKEND_URL}/categories/AddCategory`,
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
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/categories/AddCategory/${id}`)
setCategories(categories.filter(category=>category._id!==id))
  } catch (error) {
    console.log("Kategori silinemedi",error.message)
  }
}


}



  return (
  <div className="flex flex-col w-full justify-center items-center text-center p-4 space-y-6">
  {/* Form */}
  <form
    className="w-full max-w-md rounded-lg bg-white p-4 shadow-md"
    onSubmit={handleSubmit}
  >
    <div className="mb-4">
      <label
        htmlFor="category-name"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Category Name
      </label>
      <input
        type="text"
        id="category-name"
        name="name"
        value={state.category.name || ""}
        onChange={(e) => filterChange(e, "category")}
        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>

    <button
      type="submit"
      className="w-full p-2 text-lg border bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
    >
      Add Category
    </button>
  </form>

  {/* Table */}
  <div className="w-full overflow-x-auto">
    <table className="table-auto w-full border-collapse border border-gray-300 text-sm md:text-base">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="p-2"></th>
          <th className="p-2 hidden sm:table-cell">Category ID</th>
          <th className="p-2">Category Name</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category._id} className="border-b border-gray-300">
            <td className="p-2">
              <button onClick={() => deleteCategory(category._id)}>
                <MdDelete className="text-red-500" size={20} />
              </button>
            </td>
            <td className="p-2 hidden sm:table-cell">{category._id}</td>
            <td className="p-2">{category.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  )
}

export default AddCategory
