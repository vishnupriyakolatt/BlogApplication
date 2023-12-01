
import express from "express";
import { addBlog, deleteBlog, getAllBlogs,getById,getByUserId,updateBlog } from "../controllers/blog-controller";
const blogRouter=express.Router()

blogRouter.get("/getAllBlogs",getAllBlogs)
blogRouter.get("/addblogs",addBlog)
blogRouter.put("/updateblog/:id",updateBlog)
 blogRouter.get("/:id",getById)
 blogRouter.delete("/:id",deleteBlog)
 blogRouter.get('/user/:id',getByUserId)

export default blogRouter;