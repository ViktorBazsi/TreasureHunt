import { useEffect, useState } from "react";
import progressService from "../services/progress.service";
import TreasuresList from "../components/TreasuresList";

function TreasuresPage() {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProgress = async () => {
    try {
      const data = await progressService.getMyProgress();
      setProgress(data);
    } catch (err) {
      console.error("Hiba a progress betöltésekor:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  if (loading) return <p>Betöltés...</p>;

  return <TreasuresList progress={progress} onTreasureOpened={fetchProgress} />;
}

export default TreasuresPage;
