import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import companyService from "../services/company.service";
import progressService from "../services/progress.service";
import TreasureCard from "../components/TreasureCard";
import Button from "../components/ui/Button";

function CompanyTreasuresPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [treasures, setTreasures] = useState([]);
  const [, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const companyData = await companyService.getCompanyById(id);
        const progressData = await progressService.getMyProgress();

        setCompany(companyData);
        setProgress(progressData);

        // ⬇️ Logika változatlan – a backend jelenlegi mezőnevével dolgozunk
        const merged = (companyData.tresures || []).map((t) => ({
          ...t,
          isOpen: !!progressData.find((p) => p.treasureId === t.id && p.isOpen),
        }));
        setTreasures(merged);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // if (loading) return <p className="section">Betöltés...</p>;
  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="section page-loading">
          <p className="text-black font-bold">Betöltés...</p>
        </div>
      </div>
    );
  }
  if (!company)
    return (
      <div>
        <p className="text-black section">Cég nem található</p>;
      </div>
    );

  return (
    <div className="min-h-screen ">
      <div className="section">
        {/* Fejléc blokk – világos, modern, a day designhoz igazítva */}
        <div className="mb-8 border border-yellow-300 rounded-xl shadow-sm p-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-black">
            🎭 {company.name} – kincsei
          </h2>

          {/* Ajándék, ha van megadva az adott társulathoz */}
          {company.gift && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-yellow-300 px-3 py-1">
              <span className="text-sm font-semibold text-black">
                🎁 Ajándék
              </span>
              <span className="text-sm text-gray-800">{company.gift}</span>
            </div>
          )}

          {/* Rövid bevezető */}
          <p className="mt-4 text-gray-700">
            Válaszolj helyesen a kérdésekre, hogy kinyisd a kincseket. Ha
            mindhárom kincset megszerzed ennél a társulatnál, jutalom vár —
            gyűjtsd össze mind a nyolc társulat kincseit a főnyeremény
            sorsolásához! 🎁
          </p>
        </div>

        {/* Kincsek rácsa – a TreasureCard már a day design szerint frissítve */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-8">
          {treasures.map((treasure) => (
            <TreasureCard
              key={treasure.id}
              treasure={treasure}
              isOpen={treasure.isOpen}
            />
          ))}
        </div>

        {/* Vissza gomb – a saját Button komponensed, block-kal, középre igazítva */}
        <div className="mt-12 max-w-md mx-auto">
          <Button block onClick={() => navigate(-1)}>
            Vissza
          </Button>
        </div>
      </div>
    </div>
  );
}
export default CompanyTreasuresPage;
