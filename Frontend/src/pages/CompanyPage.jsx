import { useEffect, useState } from "react";
import companyService from "../services/company.service";
import CompanyList from "../components/CompanyList";

function CompanyPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setCompanies(await companyService.listCompanies());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="section">Betöltés...</p>;

  return (
    <div className="section">
      <h2 className="text-2xl font-bold mb-6 text-c-secondary-dark">Erzsébetvárosi független színházak</h2>
      <CompanyList companies={companies} />
    </div>
  );
}
export default CompanyPage;
