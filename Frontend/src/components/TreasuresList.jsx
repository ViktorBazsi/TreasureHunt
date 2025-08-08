import TreasureCard from "./TreasureCard";

function TreasuresList({ progress, onTreasureOpened }) {
  const groupedByCompany = progress.reduce((acc, entry) => {
    const companyName = entry.treasure.company?.name || "Ismeretlen cég";
    (acc[companyName] ??= []).push(entry);
    return acc;
  }, {});

  return (
    <div className="space-y-10">
      {Object.entries(groupedByCompany).map(([companyName, entries]) => (
        <div key={companyName}>
          <h3 className="text-xl font-semibold mb-4 text-c-secondary">
            🎁 {companyName}
          </h3>
          <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-6">
            {entries.map((entry) => (
              <TreasureCard
                key={entry.treasureId + String(entry.isOpen)}
                treasure={entry.treasure}
                isOpen={entry.isOpen}
                onTreasureOpened={onTreasureOpened}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
export default TreasuresList;
