import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import progressService from "../services/progress.service";
import treasureService from "../services/treasure.service";
import TreasuresList from "../components/TreasuresList";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import Button from "../components/ui/Button";

function TreasuresPage() {
  const { user } = useContext(AuthContext);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProgress = async () => {
    try {
      const data = await progressService.getMyProgress();
      setProgress(data);
    } catch (error) {
      console.log(error);
      toast.error("Nem sikerült betölteni a kincseket.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!user) {
      toast.error("A frissítéshez be kell jelentkezned!");
      return;
    }
    try {
      await treasureService.begin();
      toast.success("Kincsek frissítve!");
      fetchProgress(); // újratöltjük a listát
    } catch (error) {
      console.error(error);
      toast.error("Nem sikerült frissíteni a kincseket.");
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="section page-loading">
          <p className="text-black font-bold">Betöltés...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-6">
          Kincseid
        </h2>

        {/* Bevezető */}
        <p className="text-gray-700 mb-6">
          Találd meg és nyisd ki a társulatok kincseit! Ha helyesen válaszolsz,
          kincseket oldhatsz fel – ha minden társulat összes kincsét megszerzed,
          bekerülsz a főnyeremény sorsolásába. 🎁
        </p>

        <TreasuresList progress={progress} onTreasureOpened={fetchProgress} />

        {/* Frissítés gomb */}
        <div className="mt-8 mb-8 flex justify-center">
          <Button onClick={handleRefresh} className="px-8 py-3">
            Frissítés
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TreasuresPage;
