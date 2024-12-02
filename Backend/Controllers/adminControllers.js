const News=require("../Models/News")
const User=require("../Models/Auth") 
exports.getAdminPage = async (req, res) =>{
    try {
        const user = await User.findOne({ _id: req.session.userId}).populate({
            path: "news",
            populate: { path: "category", select: "name" } // Populate category name within news
        });  
        const news = await News.find({ authorId: user }).populate("category","name"); 
        res.status(200).json({ user, news });
    } catch (error) {
        console.error("Error fetching admin data:", error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.getProfilePage = async (req, res) =>{
    try {
        const user = await User.findById({_id: req.session.userId});  
        res.status(200).json({ user, news });
    } catch (error) {
        console.error("Error fetching admin data:", error);
        res.status(500).json({ message: "Server error" });
    }
};


