import axios from "axios";
import React, { useContext,useEffect, useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { IoReloadOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { NewsContext } from "../context/NewsContext";

function SingleBlog() {
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const { formatTimeAgo, user } = useContext(NewsContext);
  const [toggleInput, setToggleInput] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [reply, setReply] = useState("");

        useEffect(() => {
            const fetchPosts = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/Blog/${id}`); 
                    setBlog(response.data.blog); 
                    const responseComment = await axios.get(
                      `http://localhost:5000/Blog/comment/${id}`
                    );
                    setComments(responseComment.data.comments); //get news comments

                } catch (error) {
                    console.log('Haberler alınamadı: ' + error.message);
                } 
            };
            fetchPosts(); 
        }, [id]);


        const handleSubmit = async () => {
          try {
            const commentdata = {
              name: user.name,
              email: user.email,
              comments: newComment,
              blog: id,
            };
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Blog/comment`,
              commentdata,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            setComments([...comments, response.data.comment]);
            setNewComment("");
          } catch (error) {
            console.error("Yorum gönderilemedi: ", error.message);
          }
        };

        const isComment = (id) => {
          setToggleInput((prev) => (prev === id ? null : id));
        };




  return (
    <div className="flex  p-10 w-full">
      <div className=" h-auto  space-y-2  p-6 ">
        <p className="text-gray-500 font-semibold p-2">
          <Link to={"/"}> Anasayfa</Link> {">"}
          <Link>{blog?.category?.name || "Kategori Yok"} </Link> 
        </p>
        <div className="w-[800px]">
          <h1 className="font-bold text-4xl ">
           {blog.title}
          </h1>
        </div>

        <img src={blog.image} alt="blogs" className="w-full h-[400px]"></img>
        <p className="text-gray-500  ">
          by <span className="font-semibold">Hakan Bulduk</span>
        </p>

        <p className="text-gray-500 ">
          Yayınlanma Tarihi
          <span className="font-semibold"> 20 Ekim 2024 Pazar 23.00 </span>
        </p>
        <div className="flex flex-row  py-6 space-x-8 h-auto">
          <div className="text-xl space-y-4 w-[75%] h-full" dangerouslySetInnerHTML={{ __html: blog.content }} />

          <div className="text-xl space-y-4  w-[25%] h-[400px] shadow-lg">
        <h1 className="flex text-center justify-center items-center text-xl font-serif ">Blog Yazarı</h1>
        <div className="flex flex-col justify-center items-center text-center">
        <img src="/image/5.jpg" className="w-48 h-48 rounded-full"  alt="admin"></img>
        <p className="font-serif font-semibold">Ahmet Yazar</p>
        <p className="font-serif ">iletisim@Ahmetyazar.com</p>



        </div>

          </div>

        </div>
   
   
     
      <div className="flex  flex-col  h-auto space-y-6">
          <h1 className="p-2 border-b-2 border-slate-200 text-xl ">
            Yorumlar({comments?.length || 0})
          </h1>

          {/* Yorum kutusu */}
          <div className="flex   w-full h-auto ">
            <img
              src="/image/4.jpg"
              className="w-10 h-10 rounded-full"
              alt="User avatar"
            ></img>

            <div className="p-4 w-full ">
              <textarea
                value={newComment}
                className="h-20 w-full border-slate-300 p-3"
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Yorumunuzu yazın..."
              ></textarea>
              <div className="flex w-full justify-between">
                <p className="text-slate-500 text-sm">
                  {" "}
                  Yorumunuz minimum{" "}
                  <span className="font-bold text-blue-600">10</span> kelimeden
                  oluşmalıdır.<br></br>
                  Lütfen küfür veya hakaret içerikli yorumlar yapmayınız.
                </p>

                <button
                  className="bg-blue-500 border rounded-sm p-2 text-white font-bold hover:bg-blue-400"
                  onClick={handleSubmit}
                >
                  Yorumu Gönder
                </button>
              </div>
            </div>
          </div>

          {comments && comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={comment._id || index} className="flex">
                <img
                  src={user.image}
                  className="w-10 h-10 rounded-full"
                  alt="user"
                ></img>

                <ul>
                  <div className="flex">
                    <p className="px-4 text-lg font-semibold">{comment.name}</p>{" "}
                    <span>-</span>{" "}
                    <p className="px-4 py-1 text-slate-400 text-sm">
                      {" "}
                      {formatTimeAgo(new Date(comment.createdAt))}
                    </p>
                  </div>
                  <li className=" w-full h-auto   p-4 ">{comment.comments}</li>

                  <li className="flex space-x-3">
                    <button
                      onClick={() => isComment(comment._id)}
                      className="text-slate-400 text-sm"
                    >
                      Yanıtla
                    </button>
                    <button className="px-4 ">
                      {" "}
                      <AiOutlineLike
                        className="hover:text-slate-300"
                        size={20}
                      />
                    </button>
                    <button>
                      <AiOutlineDislike
                        className="hover:text-slate-300"
                        size={20}
                      />
                    </button>
                  </li>

                  <div className="flex  p-2">
                    {toggleInput === comment._id && (
                      <div className="flex   w-full h-auto ">
                        <img
                          src="/image/4.jpg"
                          className="w-10 h-10 rounded-full"
                          alt="comment"
                        ></img>
                        <div className="p-4 w-full ">
                          <textarea
                            name="reply"
                            value={reply}
                            className="h-20 w-full border-slate-300 p-3"
                            onChange={(e) => setReply(e.target.value)}
                            placeholder="Yorumunuzu yazın..."
                          ></textarea>
                          <div className="flex    w-full justify-between">
                            <p className="text-slate-500 text-sm">
                              {" "}
                              Yorumunuz minimum{" "}
                              <span className="font-bold text-blue-600">
                                10
                              </span>{" "}
                              kelimeden oluşmalıdır.<br></br>
                              Lütfen küfür veya hakaret içerikli yorumlar
                              yapmayınız.
                            </p>

                            <button
                              className="bg-blue-500 border rounded-sm p-2 text-white font-bold hover:bg-blue-400"
                              onClick={handleSubmit}
                            >
                              Yorumu Gönder
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ul>
              </div>
            ))
          ) : (
            <p>Yorum bulunamadı.</p>
          )}
          <div className="flex justify-center items-center text-center">
            <button>
              <h2 className="flex text-slate-500  text-xl">
                <IoReloadOutline className="my-2 " />
                <span className="mx-4">Daha Fazla Yorum göster</span>{" "}
              </h2>
            </button>
          </div>
        </div>
     </div>
     
     
    
    </div>
  );
}

export default SingleBlog;
