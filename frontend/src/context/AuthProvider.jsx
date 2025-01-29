
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState();
  const [profile, setProfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (token) {
          const { data } = await axios.get("http://localhost:4040/api/users/my-profile", {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          });
          setProfile(data);
          setIsAuthenticated(true); // Set to true when profile fetch is successful
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Ensure loading is set to false after fetch completes
      }
    };

    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get("http://localhost:4040/api/blogs/all-bloges", {
          withCredentials: true,
        });
        setBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogs();
    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Render a loading state while fetching
  }

  return (
    <AuthContext.Provider value={{ blogs, profile, isAuthenticated, setIsAuthenticated, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


