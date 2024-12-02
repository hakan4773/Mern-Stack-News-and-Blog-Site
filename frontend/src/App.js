import { BrowserRouter as Router, Routes, Route, useLocation,useParams } from 'react-router-dom';
import Header from './componenets/Header';
import Home from './pages/Home';
import { NewsProvider } from './context/NewsContext';
import News from "./pages/News";
import SingleNews from './pages/SingleNews';
import Footer from './componenets/Footer';
import AdminRouter from './AdminRouter';
import SingleBlog from './pages/SingleBlog';
import Notfound  from './pages/Notfound'
function App() {
  return (
    
    <NewsProvider>
      <Router >
        
        <Content />
      </Router>
    </NewsProvider>
  );
}

function Content() {
  const location = useLocation();
  const showHeaderFooter = !(
    location.pathname.startsWith('/Admin') ||
    location.pathname.match(/^\/News\/EditPage\/[a-zA-Z0-9]+$/)
  );
  return (
    <>
          {showHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/News" element={<News />} />
        <Route path="/News/:id" element={<SingleNews />} />
        <Route path="/Blog/:id" element={<SingleBlog />} />
        <Route path="/Admin/*" element={<AdminRouter />} />  {/* Admin için özel rota */}
        <Route path="/*" element={<Notfound />} />  {/* 404 Sayfası */}       
        
         </Routes>
      {showHeaderFooter && <Footer />}
     
      </>
  );
}


export default App;
