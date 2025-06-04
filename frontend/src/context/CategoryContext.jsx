import React, { createContext, useState, useEffect } from "react";
import Api from "./ApiContext";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await Api.getAllCategories();
        if (data && data.length > 0) {
          setCategories(data);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, loading, error }}>
      {children}
    </CategoryContext.Provider>
  );
};