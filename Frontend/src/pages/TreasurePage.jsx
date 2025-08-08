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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProgress(); }, []);

  if (loading) return <p className="section">Betöltés...</p>;

  return (
    <div className="section">
      <h2 className="text-2xl text-c-secondary-dark font-bold mb-6">Kincsek</h2>
      <TreasuresList progress={progress} onTreasureOpened={fetchProgress} />
    </div>
  );
}
export default TreasuresPage;
