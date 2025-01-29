import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const MyBloge = () => {
  const [myBlog, setMyBlog] = useState([]);
  const navigateTo = useNavigate();


  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4040/api/blogs/delete/${id}`, {
        withCredentials: true,
      });
      toast.success(res.data.message || "Blog deleted successfully");

      setMyBlog((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      navigateTo("/"); // Redirect to the homepage or a specific route

      
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete blog");
    }
  };

  useEffect(() => {
    const fetchMyBlog = async () => {
      try {
        const { data } = await axios.get("http://localhost:4040/api/blogs/my-bloge", {
          withCredentials: true,
        });
        console.log(data);
        setMyBlog(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyBlog();
  }, []);

  return (
    <div>
      <div className="md:px-20 md:ml-48 my-12 p-4">
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:ml-20">
          {myBlog && myBlog.length > 0 ? (
            myBlog.map((element) => (
              <Link to={`/blog/${element._id}`}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
                key={element._id}
              >
                {element?.blogImage && (
                  <img
                    src={element?.blogImage.url}
                    alt="blogImg"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <span className="text-sm text-gray-600">{element.category}</span>
                  <h4 className="text-xl font-semibold my-2">{element.title}</h4>
                  <div className="flex justify-between mt-4">
                    <Link
                      to={`/blog/update/${element._id}`}
                      className="text-blue-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                    >
                      UPDATE
                    </Link>
                    <button
                      onClick={() => handleDelete(element._id)}
                      className="text-red-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">
              You have not posted any blog to see!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBloge;
