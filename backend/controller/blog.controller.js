import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import cloudinary from "cloudinary";

export const createBlog = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        message: "Bloge Image is required",
      });
    }
    const { blogImage } = req.files;
    const allowedFile = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFile.includes(blogImage.mimetype)) {
      return res.status(400).json({
        message: "Invalide photo formate. only jpg and png are allowed",
      });
    }
    const { title, category, about } = req.body;
    if (!title || !category || !about) {
      return res.status(400).json({
        message: "title, category and about are required",
      });
    }
    const adminName = req?.user?.name;
    const adminPhoto = req?.user?.photo?.url;
    const createdBy = req?.user?._id;

    const clodinaryResponse = await cloudinary.uploader.upload(
      blogImage.tempFilePath
    );
    if (!clodinaryResponse || clodinaryResponse.error) {
      console.log(clodinaryResponse.error);
    }
    const blogeData = {
      title,
      about,
      category,
      adminName,
      adminPhoto,
      createdBy,
      blogImage: {
        public_id: clodinaryResponse.public_id,
        url: clodinaryResponse.url,
      },
    };
    const blog = await Blog.create(blogeData);
    return res.status(201).json({
      message: "blog created successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  await blog.deleteOne();
  res.status(200).json({ message: "Blog deleted successfully" });
};

export const getAllBlogs = async (req, res) => {
  const allBlog = await Blog.find();
  return res.status(200).json(allBlog);
};

export const getSingleBloge = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalide Id" });
  }
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog is not found" });
  }
  res.status(200).json(blog);
};

export const getmyBloge = async (req, res) => {
  const createdBy = req.user._id;
  const myBlogs = await Blog.find({ createdBy });
  res.status(200).json(myBlogs);
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalide Id" });
  }
  const updateBloge = await Blog.findByIdAndUpdate(id, req.body, { new: true });
  if (!updateBloge) {
    return res.status(404).json({ message: "Bloge not found" });
  }
  res.status(200).json(updateBloge);
};
