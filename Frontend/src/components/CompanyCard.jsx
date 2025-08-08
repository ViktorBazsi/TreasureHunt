import { useNavigate } from "react-router-dom";

function CompanyCard({ company }) {
  const navigate = useNavigate();

  return (
    <div className="p-4 border rounded-xl shadow bg-white hover:shadow-md transition flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-2 text-blue-700">
          {company.name}
        </h3>
        <p className="text-gray-700 mb-1">
          🎁 Ajándék: <span className="font-medium">{company.gift}</span>
        </p>
        <p className="text-sm text-gray-500 italic">
          Kapcsolat:{" "}
          <a
            href={`mailto:${company.email}`}
            className="text-blue-600 hover:underline"
          >
            {company.email}
          </a>
        </p>
        {company.link && (
          <p className="mt-2">
            <a
              href={company.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              Weboldal megtekintése
            </a>
          </p>
        )}
      </div>

      <button
        onClick={() => navigate(`/companies/${company.id}/treasures`)}
        className="mt-4 bg-blue-600 text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition"
      >
        Kincsek megtekintése
      </button>
    </div>
  );
}

export default CompanyCard;
