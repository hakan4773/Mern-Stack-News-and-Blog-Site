const News = require("../Models/News");
const fs=require("fs")
const path=require("path")
const User = require("../Models/Auth");
exports.addNews = async ( //Haber ekleme
  req,
  res
) => {
  try {
   
 const uploadDir=path.join(__dirname+"/../public/image") //klasör yolu
    if(!fs.existsSync(uploadDir)){
    await  fs.promises.mkdir(uploadDir,{recursive:true})//klasör oluşturma
    }
      let uploadImage=req.files.image;//dosyayı al
      if (!uploadImage) {
        return res.status(400).json({ message: "No image file uploaded" });
      }
      const imageName=uploadImage.name //dosya ismini al
      const uploadPath=path.join(uploadDir,imageName)
      await uploadImage.mv(uploadPath) 


      const news = await News.create({
      title: req.body.title,
      subtitle: req.body.subtitle,
      content: req.body.content,
      category:req.body.category,
      image: "/image/" + imageName,
      user: req.body.user, 
    });

    await User.findByIdAndUpdate(req.body.user, { $push: { news: news._id } }, { new: true }).populate('news');



    res.status(201).json({ news });
  } catch (error) {
    res.status(401).json({ message: "Hata oluştu", error: error.message });
  }
};
exports.GetAllNews = async (//Haberleri görüntüleme
  req,
  res 
) => {
  try {
    const {page,limit}=req.query;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 5;
    const totalNews = await News.countDocuments();  // Get total count


    const news = await News.find().populate('category', 'name').sort("-createdAt").skip((pageNumber - 1 )* pageSize).limit(pageSize);
    res.status(201).json({ news,totalCount:totalNews });
  } catch (error) {
    res.status(401).json({ message: "Hata oluştu", error: error.message });
  }
};
exports.GetNews = async (//Tekil haber sayfaları
  req,
  res 
) => {
  try {
    const news = await News.findById(req.params.id).populate("category","name").populate("user","name");

    res.status(201).json({ news });
  } catch (error) {
    res.status(401).json({ message: "Hata oluştu", error: error.message });
  }
};

exports.deleteNews = async (
  req,
  res 
) => {
  try {
    const news = await News.findById(req.params.id);
    if(!news){
      return res.status(404).json({ message: "Post bulunamadı" });
    }
    const imagePath = path.resolve(__dirname, "../public", news.image.replace(/^\/+/, ""));
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ message: "Resim bulunamadı" });
    }
    fs.unlinkSync(imagePath)
    await News.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Haber ve resmi başarıyla silindi." });
  } catch (error) {
    res.status(500).json({ message: "Post silinemedi", error: error.message });
  }
};
exports.getUpdatePage=async(req,res)=>{
  const news = await News.findById(req.params.id).populate("category","name");
   if(!news){
   res.status(401).json({message:"Sayfa bulunamadı"})
   }
  res.status(200).json({message:"Güncelleme Sayfası"})
}

exports.UpdateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "Haber bulunamadı" });
    }
    let imageName;
    if (req.files && req.files.image) {
      const uploadImage = req.files.image;
      imageName = uploadImage.name;

      // Define the path for the old image
      const oldImagePath = path.resolve(__dirname, "../public", news.image.replace(/^\/+/, ""));
      
      // Delete the old image if it exists
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      // Set up the upload directory
      const uploadDir = path.join(__dirname, "../public/image");
      if (!fs.existsSync(uploadDir)) {
        await fs.promises.mkdir(uploadDir, { recursive: true }); // Create directory if it doesn't exist
      }

      // Move the new image to the upload directory
      const newUploadPath = path.join(uploadDir, imageName);
      await uploadImage.mv(newUploadPath); // Move the new image to the directory
    }

    // Update the news article
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        subtitle: req.body.subtitle,
        content: req.body.content,
        category: req.body.category,
        image: imageName ? "/image/" + imageName : news.image, // Use new image or keep old one
      },
      { new: true }
    );

    res.status(200).json({ news: updatedNews });
  } catch (error) {
    res.status(500).json({ message: "Hata oluştu...", error: error.message });
  }
};

exports.AddComment = async (req, res) => {
    try {
      const { name, email, comments, news } = req.body;
  
      const newsItem = await News.findById(news);
      if (!newsItem) {
        return res.status(404).json({ message: "Haber bulunamadı" });
      }
  
      const newComment = {
        name,
        email,
        comments,
        createdAt: new Date(),
      };

      newsItem.comments.push(newComment);
      await newsItem.save();
  
      res.status(201).json({ message: "Yorum başarıyla eklendi", comment: newComment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Yorum eklenirken hata oluştu", error: error.message });
    }
};
exports.getComment=async(req,res)=>{
  const newsId = req.params.id; 
  try { 
    const newsItem = await News.findById(newsId).select("comments");

    if (!newsItem) {
      return res.status(404).json({ message: "Haber bulunamadı" });
    }
    res.status(200).json({ comments: newsItem.comments });
  } catch (error) {
    res.status(500).json({ message: "Yorumlar alınırken hata oluştu", error: error.message });
  }
  }


  exports.addReply = async (req, res) => {
    try {
      const { newsId, commentId } = req.params; // Haber ve yorum ID'si
      const { name, email, comments } = req.body;
  
      // Haberi bul
      const newsItem = await News.findById(newsId);
      if (!newsItem) {
        return res.status(404).json({ message: "Haber bulunamadı" });
      }
  
      // Yorumu bul
      const comment = newsItem.comments.id(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Yorum bulunamadı" });
      }
  
      // Yanıt ekle
      const newReply = {
        name,
        email,
        comments,
        replies:[],
        createdAt: new Date(),
      };
      comment.replies.push(newReply);
  
      // Haber kaydet
      await newsItem.save();
      res.status(201).json({ message: "Yanıt başarıyla eklendi", reply: newReply });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Yanıt eklenirken hata oluştu", error: error.message });
    }
  };
  