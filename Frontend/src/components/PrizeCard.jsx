function PrizeCard({ company }) {
  const gift = company?.gift || "—";

  return (
    <div className="card border bg-white/0">
      <h3 className="text-xl font-bold text-c-secondary-dark mb-1">
        {company?.name}
      </h3>

      {company?.website && (
        <p className="text-sm mb-2">
          <a
            href={company.website}
            target="_blank"
            rel="noreferrer"
            className="underline text-c-primary hover:text-c-primary-light"
          >
            Weboldal ↗
          </a>
        </p>
      )}

      <div className="mt-3">
        <p className="text-black">
          <span className="font-semibold">Ajándék:</span>{" "}
          <span className="text-c-primary-dark">{gift}</span>
        </p>
      </div>
    </div>
  );
}

export default PrizeCard;
