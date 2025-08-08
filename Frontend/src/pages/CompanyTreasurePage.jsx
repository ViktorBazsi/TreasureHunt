import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import companyService from "../services/company.service";
import progressService from "../services/progress.service"; // 🆕
import TreasureCard from "../components/TreasureCard";
import { useNavigate } from "react-router-dom"; // ⬅️ ezt is importáld

function CompanyTreasuresPage() {
  const { id } = useParams(); // companyId
  const [company, setCompany] = useState(null);
  const [treasures, setTreasures] = useState([]);
  const [, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // ⬅️ a komponens tetején (a useParams mellé)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyData = await companyService.getCompanyById(id);
        const progressData = await progressService.getMyProgress();

        setCompany(companyData);
        setProgress(progressData);

        const treasuresWithOpenStatus = (companyData.tresures || []).map(
          (treasure) => {
            const match = progressData.find(
              (p) => p.treasureId === treasure.id && p.isOpen
            );
            return {
              ...treasure,
              isOpen: !!match,
            };
          }
        );

        setTreasures(treasuresWithOpenStatus);
      } catch (err) {
        console.error("Hiba a cég vagy a progress betöltésekor:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // meghívás itt
  }, [id]);

  if (loading) return <p className="text-center mt-10">Betöltés...</p>;
  if (!company) return <p className="text-center mt-10">Cég nem található</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">
        🎁 {company.name} kincsei
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {treasures.map((treasure) => (
          <TreasureCard
            key={treasure.id}
            treasure={treasure}
            isOpen={treasure.isOpen} // ✅ már helyes
          />
        ))}
      </div>
      <div className="mt-12 max-w-md mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="w-full bg-black text-white rounded-xl px-6 py-3 font-semibold hover:bg-gray-800 transition"
        >
          Vissza
        </button>
      </div>
    </div>
  );
}

export default CompanyTreasuresPage;
