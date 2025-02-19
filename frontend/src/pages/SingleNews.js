import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { NewsContext } from "../context/NewsContext";
import { IoReloadOutline } from "react-icons/io5";

function SingleNews() {
  const { formatTimeAgo, user } = useContext(NewsContext);
  const { id } = useParams();
  const [news, setNews] = useState({});
  const [leftnews, setLeftNews] = useState({});
  const [toggleInput, setToggleInput] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [reply, setReply] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/News/${id}`);
        const responseNews = await axios.get(
          "http://localhost:5000/News?limit=4"
        );
        const responseComment = await axios.get(
          `http://localhost:5000/News/comment/${id}`
        );
        setNews(response.data.news); //get news
        setLeftNews(responseNews.data.news); //get left news
        setComments(responseComment.data.comments); //get news comments
      } catch (error) {
        console.log("Haberler alınamadı: " + error.message);
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
        news: id,
      };
      const response = await axios.post(
        "http://localhost:5000/News/comment",
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
    <div className="flex  p-10 ">
      <div className="w-[80%] h-auto  space-y-2  p-6 ">
        <p className="text-gray-500 font-semibold p-2">
          <Link to={"/"}> Anasayfa</Link> {">"}
          <Link>{news?.category?.name || "Kategori Yok"} </Link>
        </p>
        <div className="w-[800px]">
          <h1 className="font-bold text-4xl ">{news.title}</h1>
        </div>
        <img src={news.image} className="w-full h-[400px]" alt=""></img>
        <p className="text-gray-500  ">
          by{" "}
          <span className="font-semibold">
            {news.user ? news.user.name : "Unknown"}
          </span>
        </p>
        <p className="text-gray-500 ">
          Yayınlanma Tarihi
          <span className="font-semibold"> {news.createdAt} </span>
        </p>
        <div className="px-20 py-6">
          <h1 className=" text-3xl py-4">{news.subtitle}</h1>
          <div
            className="text-xl space-y-4"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </div>
        {/* Yorum Paneli */}

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

      <div className="w-[20%]  p-4 h-full">
        <h1 className="text-red-500 font-bold text-xl">
          Günün Öne Çıkan Haberleri
        </h1>

        {leftnews.length > 0 ? (
          leftnews.slice(1, 4).map((item) => (
            <div key={item.id} className="mb-4 hover:shadow-md">
              <img
                src={item.image}
                className="w-full object-cover rounded-t-md"
                alt={item?.category?.name}
              />
              <Link to={`/news/${item._id}`} className="font-bold ">
                {item.title}
              </Link>
            </div>
          ))
        ) : (
          <p>..Yükleniyor</p>
        )}
      </div>
    </div>
  );
}

export default SingleNews;
