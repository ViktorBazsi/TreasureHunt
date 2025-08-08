import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import progressService from "../services/progress.service";
import Button from "../components/ui/Button";

function LandingPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!user) return setLoading(false);
      try {
        const data = await progressService.getMyProgress();
        setProgress(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const handleStartOrContinue = async () => {
    if (progress.length === 0) {
      try {
        await progressService.beginProgress();
      } catch {}
    }
    navigate("/treasures");
  };

  return (
    <main className="section min-h-screen flex flex-col items-center justify-center text-center">
      <h2 className="text-4xl font-bold mb-4">Üdvözöl a TreasureHunt!</h2>
      <p className="text-lg max-w-xl mb-8 text-c-secondary-dark">
        Találd meg az összes kincset, hogy egy exkluzív előadást nyerhess a
        nappalidba!
      </p>

      {!user ? (
        <div className="w-full max-w-md">
          <Button block onClick={() => navigate("/login")}>
            Bejelentkezés
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-md">
          {loading ? (
            <p>Betöltés…</p>
          ) : (
            <Button block onClick={handleStartOrContinue}>
              {progress.length === 0 ? "Kezdés" : "Folytatás"}
            </Button>
          )}
        </div>
      )}
    </main>
  );
}
export default LandingPage;
