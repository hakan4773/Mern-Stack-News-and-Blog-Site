const Category=require("../Models/Category")
exports.createCategory=async(req,res)=>{
try {
    const categories=await Category.create({
    name:req.body.name
    })
    res.status(201).json({ categories }); 
} catch (error) {
     res.status(401).json({ message: "Hata oluştu", error: error.message });
}
}
exports.getCategory=async(req,res)=>{
    try {
        const categories=await Category.find();
        res.status(201).json({ categories }); 
    } catch (error) {
         res.status(401).json({ message: "Hata oluştu", error: error.message });
    }
    }

    exports.deleteCategory = async (
        req,
        res 
      ) => {
        try {
          const category = await Category.findById(req.params.id);
          if(!category){
            return res.status(404).json({ message: "KATEGORİ bulunamadı" });
          }
          await Category.findByIdAndDelete(req.params.id)
          res.status(200).json({ message: "KATEGORİ başarıyla silindi." });
        } catch (error) {
          res.status(500).json({ message: "KATEGORİ silinemedi", error: error.message });
        }
      };