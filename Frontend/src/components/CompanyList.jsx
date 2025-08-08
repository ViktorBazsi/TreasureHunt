import CompanyCard from "./CompanyCard";

function CompanyList({ companies }) {
  return (
    <div className="p-6 space-y-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">
        🎁 Támogató cégek
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
}

export default CompanyList;
