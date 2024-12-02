const express=require("express");
const newsController = require("../Controllers/newsController");

const router=express.Router();

router.post("/AddNews",newsController.addNews)
router.get("/",newsController.GetAllNews)
router.get("/:id",newsController.GetNews)
router.delete("/AuthorNews/:id",newsController.deleteNews)
router.get("/EditPage/:id",newsController.getUpdatePage)
router.put("/EditPage/:id",newsController.UpdateNews)


router.get("/comment/:id",newsController.getComment)
router.post("/comment",newsController.AddComment)


router.post("/comment/:newsId/:commentId/reply", newsController.addReply);

module.exports = router; 