import { useContext } from "react";
import { FiLogIn, FiUser, FiBox, FiBriefcase } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        {user ? (
          <>
            <span className="hidden md:inline">
              Üdv a Kincskeresésen, kedves{" "}
            </span>
            {user.username}
          </>
        ) : (
          "IMeFeszt 2.0"
        )}
      </h1>

      {!user ? (
        <button
          onClick={() => navigate("/login")}
          className="text-gray-600 hover:text-gray-900 transition"
          title="Bejelentkezés"
        >
          <FiUser className="w-6 h-6" />
        </button>
      ) : (
        <div className="flex gap-4 items-center">
          <button
            onClick={() => navigate("/companies")}
            className="text-gray-600 hover:text-gray-900 transition"
            title="Cégek"
          >
            <FiBriefcase className="w-6 h-6" />
          </button>
          <button
            onClick={() => navigate("/treasures")}
            className="text-gray-600 hover:text-gray-900 transition"
            title="Kincsek"
          >
            <FiBox className="w-6 h-6" />
          </button>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 transition"
            title="Kijelentkezés"
          >
            <FiLogIn className="w-6 h-6" />
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
