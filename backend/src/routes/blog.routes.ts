import { Router } from "express";
import auth, { requireRole } from "../middleware/auth.js";
import { createBlogPostHandler, deleteBlogPostHandler, getAllBlogPostsHandler, getBlogPostByIdHandler, updateBlogPostHandler } from "../controllers/blog.controllers.js";

const blogRouter = Router();

blogRouter.get("/", getAllBlogPostsHandler);
blogRouter.get("/:id", getBlogPostByIdHandler);
blogRouter.post("/", auth, requireRole('admin'), createBlogPostHandler);
blogRouter.patch("/:id", auth, requireRole('admin'), updateBlogPostHandler);
blogRouter.delete("/:id", auth, requireRole('admin'), deleteBlogPostHandler);

export default blogRouter;