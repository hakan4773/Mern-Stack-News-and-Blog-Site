const express=require("express");
const blogController=require("../Controllers/blogControllers");
const router=express.Router();

//blog
router.post("/AddBlog",blogController.addBlog)
router.get("/",blogController.GetAllBlog)
router.get("/:id",blogController.GetBlog)
router.delete("/AuthorNews/:id",blogController.deleteBlog)

router.get("/EditBlogPage/:id",blogController.getUpdateBlogPage)
router.put("/EditBlogPage/:id",blogController.UpdateBlog)


router.get("/comment/:id",blogController.getComment)
router.post("/comment",blogController.AddComment)


router.post("/comment/:blogId/:commentId/reply", blogController.addReply);


module.exports = router; 