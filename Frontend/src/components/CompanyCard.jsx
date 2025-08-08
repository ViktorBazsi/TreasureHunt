import { useNavigate } from "react-router-dom";
import { InverseCard } from "./ui/Card";
import Button from "./ui/Button";

function CompanyCard({ company }) {
  const navigate = useNavigate();

  return (
    <InverseCard className="hover:shadow-md transition flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-2 text-c-primary-light">
          {company.name}
        </h3>
        <p className="text-white mb-1">
          🎁 Ajándék: <span className="font-medium">{company.gift}</span>
        </p>
        <p className="text-sm text-c-primary-dark italic">
          Kapcsolat:{" "}
          <a
            href={`mailto:${company.email}`}
            className="text-c-primary hover:text-c-primary-light underline-offset-2 hover:underline"
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
              className="text-sm text-c-accent hover:brightness-110 underline-offset-2 hover:underline"
            >
              Weboldal megtekintése
            </a>
          </p>
        )}
      </div>

      <Button
        className="mt-4"
        onClick={() => navigate(`/companies/${company.id}/treasures`)}
      >
        Kincsek megtekintése
      </Button>
    </InverseCard>
  );
}
export default CompanyCard;
