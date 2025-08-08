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

  if (loading) return <p className="section">Betöltés...</p>;
  if (!company) return <p className="section">Cég nem található</p>;

  return (
    <div className="section">
      <h2 className="text-2xl font-bold text-c-secondary mb-6">
        🎁 {company.name} kincsei
      </h2>

      <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-6">
        {treasures.map((treasure) => (
          <TreasureCard
            key={treasure.id}
            treasure={treasure}
            isOpen={treasure.isOpen}
          />
        ))}
      </div>

      <div className="mt-12 max-w-md mx-auto">
        <Button block onClick={() => navigate(-1)}>
           Vissza
        </Button>
      </div>
    </div>
  );
}
export default CompanyTreasuresPage;
