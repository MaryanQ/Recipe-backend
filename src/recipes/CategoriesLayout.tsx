import { useOutlet } from "react-router-dom";
import CategoryList from "./CategoryList";
import "./RecipesLayout.css";

export default function CategoriesLayout() {
  const outlet = useOutlet();

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, flexDirection: "column" }}>
        <CategoryList />
      </div>
      <div className="outlet-container">
        {outlet || <h3>Select a category to see details</h3>}
      </div>
    </div>
  );
}
