import axios from "axios";
import { createContext, useEffect, useReducer } from "react"
import { useState } from "react"; 

const initialState ={
favorites: [],
query:"",
category:"",
login:{},
register:{},
news:{},
blog:{},
contact:{},
users:{},
}
export const NewsProvider =({children})=>{
  function NewsReducer(state,action){
    switch(action.type)
    {
      case "REMOVE_FAVORITES":
        return {
          ...state,favorites:state.favorites.filter(item=>item._id !== action.news._id)
      }
      case "ADD_FAVORITES":
        return {
          ...state,favorites:[...state.favorites,action.news]
      }
    case "HANDLE_CHANGE":
      return {
        ...state,[action.formType]:{...state[action.formType],[action.name]:action.value}
    }
    case "FİLTER_SELECT" :
      return {...state,category:action.payload}
      case "FİLTER_İNPUT" :
        return {...state,query:action.payload}
    default:
      return state;

    }
    }

const [state, dispatch] = useReducer(NewsReducer, initialState);

const filterChange=(e,formType)=>{
const { name, value } = e.target
dispatch({type:"HANDLE_CHANGE",formType,name,value})
}

const [isModalOpen,setisModalOpen]=useState(false);//Login modal
const [isRegisterModalOpen,setisRegisterModalOpen]=useState(false); //register modal

 // Login Modal aç/kapat
const toggleLoginModal = () => {
    setisModalOpen((prev) => !prev);
    if (isRegisterModalOpen) {
        setisRegisterModalOpen(false); // Register modal açıkken login açılırsa, register kapansın.
    }
  };

  // Register Modal aç/kapat
  const toggleRegisterModal = () => {
    setisRegisterModalOpen((prev) => !prev);
    if (isModalOpen) {
      setisModalOpen(false); // Login modal açıkken register açılırsa, login kapansın.
    }
  };

  //Kategori filtreleme
const FilterSelect=(e)=>{
  const value = e.target.value;
  dispatch({type:"FİLTER_SELECT",payload:value})
}
//İnput ile filtreleme
const Filterİnput=(e)=>{
  const value = e.target.value;
  dispatch({type:"FİLTER_İNPUT",payload:value})
  }

const AddFavorite=(news)=>{
if(isFavorite(news)){
  dispatch({ type: "REMOVE_FAVORITES", news });
}
else {
  dispatch({ type: "ADD_FAVORITES", news });
}
}


const isFavorite = (news) => {
  const result = state.favorites.some((item) => item._id === news._id);
  return result;
};

useEffect(() => {
  console.log("Updated favorites:", state.favorites);
}, [state.favorites]);








  const [user, setUser] = useState(initialState.login);

  //Giriş yapan kullanıcı bilgisini alma
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users/users", {
          withCredentials: true, // Session bilgisi ile istek yap
        });
        if (response.data.user) {
          setUser(response.data.user); // Session'dan gelen kullanıcıyı kaydet
        } else {
          setUser(null); // Oturum yoksa kullanıcı bilgisi null olur
        }
      } catch (error) {
        console.error("Oturum kontrol hatası:", error);
        setUser(null);
      }
    };
    checkUserSession();
  }, []);
  


  // Admin Sayfa teması
  const [mode,setMode]=useState(false)
    useEffect(()=>{
const saveMode=localStorage.getItem("theme")==="true"

if(saveMode!==null){
  setMode(saveMode)
}
    },[])
  const darkMode=()=>
    {
  setMode(prevMode=>{
const newMode=!prevMode;
localStorage.setItem("theme",newMode.toString());
return newMode;
  })
    }



//Tarih dönüştürme
    function formatTimeAgo(date) { 
      const now = new Date();
      const difference = now - new Date(date);
      const seconds = Math.floor(difference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7);
    
      if (seconds < 60) return `${seconds} saniye önce`;
      if (minutes < 60) return `${minutes} dakika önce`;
      if (hours < 24) return `${hours} saat önce`;
      if (days < 7) return `${days} gün önce`;
      if (weeks < 4) return `${weeks} hafta önce`;
      return new Date(date).toLocaleDateString(); 
    }
  

    //Logout fonksiyonu
    const handleLogout = async () => {
      try {
        await axios.post('http://localhost:5000/users/logout', {}, { withCredentials: true });
       // localStorage.removeItem('token');
       window.location.reload(); 
        setUser(null);
        alert("Logged out successfully");
        toggleLoginModal();
      } catch (error) {
        console.error('Logout error:', error);
        alert('Error logging out');
      }
    };
  

  console.log(user)
    const values={
        toggleLoginModal,
        toggleRegisterModal,
        isModalOpen,
        isRegisterModalOpen,
        setisRegisterModalOpen,
        filterChange,
        state,
        Filterİnput,
        FilterSelect,
        query:state.query,
        category:state.category,
        setUser,
        user,
        darkMode,
        mode,
        users:state.users,
        formatTimeAgo,
        handleLogout,
        AddFavorite,
        isFavorite
        }
return (
    <NewsContext.Provider value={values}>{children}</NewsContext.Provider>
)

}



export const NewsContext=createContext();