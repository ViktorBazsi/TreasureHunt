import { useEffect, useState } from "react";
import companyService from "../services/company.service";
import CompanyList from "../components/CompanyList";

function CompanyPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await companyService.listCompanies();
        setCompanies(data);
      } catch (err) {
        console.error("Hiba a cégek betöltésekor:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) return <p className="text-center mt-10">Betöltés...</p>;

  return <CompanyList companies={companies} />;
}

export default CompanyPage;
