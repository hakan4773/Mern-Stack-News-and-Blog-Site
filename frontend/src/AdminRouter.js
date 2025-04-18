// routers/AdminRouter.js
import { Routes, Route, Link } from 'react-router-dom';
import Admin from './pages/Admin/Admin';
import AddNews from './pages/Admin/AddNews';
import Navbar from './pages/Admin/Navbar';
import AdminHeader from './pages/Admin/AdminHeader';
import AuthorNews from './pages/Admin/AuthorNews';
import AddCategory from './pages/Admin/AddCategory';
import AddBlog from './pages/Admin/AddBlog';
import EditPage from './pages/Admin/EditPage';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect,useState } from 'react';
import Profile from './pages/Admin/Profile';
import axios from "axios";
import { NewsContext } from './context/NewsContext';
import Users from './pages/Admin/Users';
import ChangePassword from './pages/Admin/ChangePassword';
import EditBlogPage from './pages/Admin/EditBlogPage';
function AdminRouter() {
  const {mode}=useContext(NewsContext)
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/Admin`, { withCredentials: true })
      .then(response => {
        setIsAdmin(true);
      })
      .catch(error => {
        console.error("Erişim engellendi: ", error.response?.data?.message || error.message);
        setIsAdmin(false);  // Set to false on error
        navigate("/");  // Redirect to home
      });
  }, [navigate]);

  return isAdmin ? (
    <div className={`flex h-full ${mode ? 'bg-zinc-700 text-white' : 'bg-white text-black'}`}>      
      <Navbar />

      
      <div className="flex-1 flex flex-col ">
      <AdminHeader />
<div className='h-screen ml-52 '>
 
          <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="AddNews" element={<AddNews />} />
            <Route path="AuthorNews" element={<AuthorNews />} />
            <Route path="AddCategory" element={<AddCategory />} />
            <Route path="AddBlog" element={<AddBlog />} />
            <Route path="Profile/" element={<Profile />} />
            <Route path="ChangePassword" element={<ChangePassword />} />
            <Route path="Users" element={<Users />} />
            <Route path="/News/EditPage/:id" element={<EditPage />} />
            <Route path="/Blog/EditBlogPage/:id" element={<EditBlogPage />} />
          </Routes>
        </div>
      </div></div>
  ) : (
    <Link to="/" /> 
  );
}
export default AdminRouter;
