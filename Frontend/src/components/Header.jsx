import { useContext } from "react";
import { FiLogIn, FiUser, FiBox, FiBriefcase, FiGift } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur shadow-md bg-c-secondary-dark/5">
      <div className="container flex justify-between items-center px-2 py-3">
        <h1
          className="text-2xl font-bold cursor-pointer text-c-secondary-dark"
          onClick={() => navigate("/")}
        >
          {user ? (
            <>
              <span className="hidden md:inline text-c-primary-dark">
                Üdv a Kincskeresésen, kedves{" "}
              </span>
              {user.username}
            </>
          ) : (
            "IMeFeszt 2.0"
          )}
        </h1>

        {!user ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="text-c-primary hover:text-c-primary-light transition"
              title="Bejelentkezés"
            >
              <FiUser className="w-6 h-6" />
            </button>
            {/* Téma váltó mindig elérhető */}
            <ThemeToggle className="px-3 py-2" />
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <button
              onClick={() => navigate("/treasures")}
              className="text-c-secondary-light hover:text-c-secondary-dark transition"
              title="Kincsek"
            >
              <FiBox className="w-6 h-6" />
            </button>

            <button
              onClick={() => navigate("/companies")}
              className="text-c-secondary-light hover:text-c-secondary-dark transition"
              title="Cégek"
            >
              <FiBriefcase className="w-6 h-6" />
            </button>

            {/* Opcionális: nyeremények gyorslink */}
            <button
              onClick={() => navigate("/prizes")}
              className="text-c-secondary-light hover:text-c-secondary-dark transition"
              title="Nyeremények"
            >
              <FiGift className="w-6 h-6" />
            </button>

            <button
              onClick={handleLogout}
              className="text-c-warning hover:text-c-warning-dark transition"
              title="Kijelentkezés"
            >
              <FiLogIn className="w-6 h-6" />
            </button>

            {/* Téma váltó a sor végén */}
            <ThemeToggle className="px-3 py-2" />
          </div>
        )}
      </div>
    </header>
  );
}
export default Header;
