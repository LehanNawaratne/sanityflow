import { Router } from "express";
import { createBlogPostHandler, deleteBlogPostHandler, getAllBlogPostsHandler, getBlogPostByIdHandler, updateBlogPostHandler } from "../controllers/blog.controllers.js";

const blogRouter = Router();

blogRouter.get("/", getAllBlogPostsHandler);
blogRouter.get("/:id", getBlogPostByIdHandler);
blogRouter.post("/", createBlogPostHandler);
blogRouter.patch("/:id", updateBlogPostHandler);
blogRouter.delete("/:id", deleteBlogPostHandler);

export default blogRouter;