import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
const app = express();
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import cors from "cors";

dotenv.config();
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Ensure no trailing slash here
    credentials: true, // Allow cookies and credentials
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

const port = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
//DB code
try {
  mongoose.connect(MONGO_URI, { connectTimeoutMS: 30000 });
  console.log("Connect to MongoDB");
} catch (error) {
  console.log(error);
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// defining routes

app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);

//CLOUDINARY
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_key,
  api_secret: process.env.CLOUD_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
