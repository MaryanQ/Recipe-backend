import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../services/apiFacade";

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState<string | undefined>(undefined); // Specify the type of 'error'
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryName) {
      setError("Category name is required.");
      return;
    }

    setIsLoading(true);
    try {
      await addCategory({ name: categoryName });
      alert("Category added successfully.");
      navigate("/categories");
    } catch (error) {
      if (error instanceof Error) {
        setError(`Failed to add category. Error: ${error.message}`);
      } else {
        setError("Failed to add category due to an unknown error.");
      }
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h2>Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Category Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={categoryName}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? "Adding..." : "Create"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default CategoryForm;
