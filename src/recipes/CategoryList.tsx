import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./CategoriesLayout.css";
import { getCategories } from "../services/apiFacade"; // Ensure this function is implemented correctly
import { useAuth } from "../security/Authprovider";

const CategoryList = () => {
  const [queryString] = useSearchParams();
  const initialCategory = queryString.get("category");

  const [categories, setCategories] = useState<string[]>([]); // Initialize categories state with an empty array
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    setIsLoading(true);
    getCategories()
      .then((res) => {
        setCategories(res);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Error fetching categories. Is the server running?");
        setIsLoading(false);
      });
  }, []);

  const handleClearCategory = () => {
    setSelectedCategory(null);
    setIsLoading(true);
    getCategories()
      .then((res) => {
        setCategories(res);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Error fetching categories. Is the server running?");
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <h2>Loading categories...</h2>;
  }

  if (error) {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }

  return (
    <div>
      <h3>Categories</h3>
      {selectedCategory && (
        <div>
          <h4>Recipes in '{selectedCategory}' category</h4>
          <button onClick={handleClearCategory}>Clear</button>
        </div>
      )}
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {categories.map((category) => (
          <li key={category}>
            <Link to={`/recipes?category=${category}`}>{category}</Link>
            {auth.isLoggedIn() && (
              <Link className="category-btn" to={`/edit-category/${category}`}>
                Edit
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
