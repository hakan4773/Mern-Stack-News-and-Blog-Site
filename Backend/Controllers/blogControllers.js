const Blog = require("../Models/Blog");
const fs=require("fs")
const path=require("path")
const User=require("../Models/Auth")
exports.addBlog = async ( //Blog ekleme
    req,
    res
  ) => {
    try {
const uploadDir=__dirname+"/../public/image"
if(!fs.existsSync(uploadDir)){
  await fs.promises.mkdir(uploadDir,{recursive:true});
}
let uploadImage=req.files.image
if (!uploadImage) {
  return res.status(400).json({ message: "No image file uploaded" });
}
const imageName=uploadImage.name
const uploadPath= path.join(uploadDir,imageName)
await uploadImage.mv(uploadPath)

const blog = await Blog.create({
        title: req.body.title,
        content: req.body.content,
        category:req.body.category,
        image: "/image/" + imageName,
        user: req.body.user, 

      });
      await User.findByIdAndUpdate(req.body.user, { $push: { blog: blog._id } }, { new: true }).populate('blog');

      res.status(201).json({ blog });
    } catch (error) {
      res.status(401).json({ message: "Hata oluştu", error: error.message });
    }
  };
  exports.GetAllBlog = async (//Blog görüntüleme
    req,
    res 
  ) => {
    try {
      const blog = await Blog.find().populate("category","name");
      res.status(201).json({ blog });
    } catch (error) {
      res.status(401).json({ message: "Hata oluştu", error: error.message });
    }
  };
  exports.GetBlog = async (//Tekil Blog sayfaları
    req,
    res 
  ) => {
    try {
      const blog = await Blog.findById(req.params.id).populate("category","name").populate("user","name");
      res.status(201).json({ blog });
    } catch (error) {
      res.status(401).json({ message: "Hata oluştu", error: error.message });
    }
  };

  exports.deleteBlog = async (
    req,
    res 
  ) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if(!blog){
        return res.status(404).json({ message: "Post bulunamadı" });
      }
      const imagePath = path.resolve(__dirname, "../public", blog.image.replace(/^\/+/, ""));
      if (!fs.existsSync(imagePath)) {
        return res.status(404).json({ message: "Resim bulunamadı" });
      }
      fs.unlinkSync(imagePath)
      await Blog.findByIdAndDelete(req.params.id)
      res.status(200).json({ message: "Blog ve resmi başarıyla silindi." });
    } catch (error) {
      res.status(500).json({ message: "Post silinemedi", error: error.message });
    }
  };

  exports.getUpdateBlogPage=async(req,res)=>{
    const blog = await Blog.findById(req.params.id).populate("category","name");
     if(!blog){
     res.status(401).json({message:"Sayfa bulunamadı"})
     }
    res.status(200).json({message:"Güncelleme Sayfası"})
  }

  exports.UpdateBlog = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: "Haber bulunamadı" });
      }
      let imageName;
      if (req.files && req.files.image) {
        const uploadImage = req.files.image;
        imageName = uploadImage.name;
  
        const oldImagePath = path.resolve(__dirname, "../public", news.image.replace(/^\/+/, ""));
        
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
  
        const uploadDir = path.join(__dirname, "../public/image");
        if (!fs.existsSync(uploadDir)) {
          await fs.promises.mkdir(uploadDir, { recursive: true });
        }
  
        const newUploadPath = path.join(uploadDir, imageName);
        await uploadImage.mv(newUploadPath); // Move the new image to the directory
      }
  
      
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: imageName ? "/image/" + imageName : blog.image, // Use new image or keep old one
        },
        { new: true }
      );
  
      res.status(200).json({ blog: updatedBlog });
    } catch (error) {
      res.status(500).json({ message: "Hata oluştu...", error: error.message });
    }
  };


  
exports.AddComment = async (req, res) => {
  try {
    const { name, email, comments, blog } = req.body;

    const blogItem = await Blog.findById(blog);
    if (!blogItem) {
      return res.status(404).json({ message: "Haber bulunamadı" });
    }

    const newComment = {
      name,
      email,
      comments,
      createdAt: new Date(),
    };

    blogItem.comments.push(newComment);
    await blogItem.save();

    res.status(201).json({ message: "Yorum başarıyla eklendi", comment: newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Yorum eklenirken hata oluştu", error: error.message });
  }
};

exports.getComment=async(req,res)=>{
const blogId = req.params.id; 
try { 
  const blogItem = await Blog.findById(blogId).select("comments");

  if (!blogItem) {
    return res.status(404).json({ message: "Blog bulunamadı" });
  }
  res.status(200).json({ comments: blogItem.comments });
} catch (error) {
  res.status(500).json({ message: "Yorumlar alınırken hata oluştu", error: error.message });
}
}


exports.addReply = async (req, res) => {
  try {
    const { blogId, commentId } = req.params; // Haber ve yorum ID'si
    const { name, email, comments } = req.body;

    // Haberi bul
    const blogItem = await Blog.findById(blogId);
    if (!blogItem) {
      return res.status(404).json({ message: "Blog bulunamadı" });
    }

    // Yorumu bul
    const comment = blogItem.comments.id(commentId);
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
    await blogItem.save();
    res.status(201).json({ message: "Yanıt başarıyla eklendi", reply: newReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Yanıt eklenirken hata oluştu", error: error.message });
  }
};
