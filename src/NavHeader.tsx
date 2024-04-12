import { NavLink } from "react-router-dom";
import AuthStatus from "./security/AuthStatus";
import { useAuth } from "./security/AuthProvider";

export default function NavHeader() {
  const auth = useAuth();
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/Categories">Categories</NavLink>
        </li>
        <li>
          <NavLink to="/Recipes">Recipes</NavLink>
        </li>
        <li>
          {auth.isLoggedIn() && (
            <li>
              <NavLink to="/add">Add</NavLink>
            </li>
          )}
        </li>
        <AuthStatus />
      </ul>
    </nav>
  );
}
