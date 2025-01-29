import express from 'express'
import { createBlog, deleteBlog, getAllBlogs, getmyBloge, getSingleBloge, updateBlog } from '../controller/blog.controller.js'
import { isAdmin, isAuthenticated } from '../middleware/authUser.js'

const router = express.Router()

router.post("/create",isAuthenticated, isAdmin("admin"), createBlog)
router.delete("/delete/:id",isAuthenticated, isAdmin("admin"),deleteBlog)
router.get("/all-bloges",isAuthenticated , getAllBlogs)
router.get("/single-blog/:id",isAuthenticated,getSingleBloge)
router.get("/my-bloge",isAuthenticated,isAdmin("admin"), getmyBloge)
router.put("/update/:id",isAuthenticated,isAdmin("admin"),updateBlog)

export default router