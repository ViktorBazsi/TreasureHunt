import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import progressService from "../services/progress.service";

function LandingPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      if (user) {
        try {
          const data = await progressService.getMyProgress();
          setProgress(data);
        } catch (err) {
          console.error("Hiba a progress lekérésekor:", err);
        }
        setLoading(false);
      }
    };

    fetchProgress();
  }, [user]);

  const handleStartOrContinue = async () => {
    try {
      await progressService.beginProgress();
    } catch (err) {
      console.error("Hiba a játék kezdésekor:", err);
      return;
    }

    navigate("/treasures");
  };

  return (
    <main className="flex flex-col items-center justify-center text-center px-4 py-24 min-h-screen bg-gray-50 text-gray-800">
      <h2 className="text-4xl font-bold mb-4">Üdvözöl a TreasureHunt!</h2>
      <p className="text-lg max-w-xl mb-8 text-gray-600">
        Találd meg az összes kincset, hogy egy exkluzív előadást nyerhess a
        nappalidba!
      </p>

      {!user ? (
        <div>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-black text-white rounded-xl px-6 py-3 font-semibold hover:bg-gray-800 transition"
          >
            Bejelentkezés
          </button>
        </div>
      ) : (
        <div className="w-full max-w-4xl space-y-6">
          {loading ? (
            <p>Betöltés...</p>
          ) : (
            <button
              onClick={handleStartOrContinue}
              className="w-2/3 bg-black text-white rounded-xl px-6 py-3 font-semibold hover:bg-gray-800 transition"
            >
              {progress.length === 0 ? "Kezdés" : "Folytatás"}
            </button>
          )}
        </div>
      )}
    </main>
  );
}

export default LandingPage;
