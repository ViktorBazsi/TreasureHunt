import TreasureCard from "./TreasureCard";

function TreasuresList({ progress, onTreasureOpened }) {
  // Csoportosítás company.name alapján
  const groupedByCompany = progress.reduce((acc, entry) => {
    const companyName = entry.treasure.company?.name || "Ismeretlen cég";
    if (!acc[companyName]) {
      acc[companyName] = [];
    }
    acc[companyName].push(entry);
    return acc;
  }, {});

  return (
    <div className="space-y-10 p-6">
      {Object.entries(groupedByCompany).map(([companyName, entries]) => (
        <div key={companyName}>
          <h2 className="text-2xl font-bold mb-4 text-blue-800">
            🎁 {companyName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {entries.map((entry) => (
              <TreasureCard
                key={entry.treasureId}
                treasure={entry.treasure}
                isOpen={entry.isOpen}
                onTreasureOpened={onTreasureOpened} // ← itt használjuk
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TreasuresList;
