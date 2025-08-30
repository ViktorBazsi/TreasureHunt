import { useEffect, useState } from "react";
import companyService from "../services/company.service";
import CompanyList from "../components/CompanyList";
import { toast } from "react-toastify";

function CompanyPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setCompanies(await companyService.listCompanies());
      } catch (error) {
        console.error(error);
        toast.error("Nem sikerült betölteni a társulatokat.");
      } finally {
        setLoading(false);
      }
    })();
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
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="section">
        <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-3 text-center">
          Erzsébetvárosi független színházak
        </h2>
        <p className="text-gray-700 mb-8 text-center max-w-3xl mx-auto">
          Válassz egy társulatot, ismerd meg a kincseiket, és nyisd ki őket a
          helyes válaszokkal! Ha egy társulat mindhárom kincsét megszerzed,
          ajándék vár — gyűjtsd össze mind a nyolcat a főnyeremény sorsolásához.
          🎁
        </p>

        <CompanyList companies={companies} />
      </div>
    </div>
  );
}
export default CompanyPage;
