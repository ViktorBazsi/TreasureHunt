import { useState } from "react";
import { InverseCard } from "./ui/Card";
import TreasureCardModal from "./TreasureCardModal";

function TreasureCard({ treasure, isOpen, onTreasureOpened }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSuccess = () => {
    setIsModalOpen(false);
    onTreasureOpened?.();
  };

  return (
    <>
      <InverseCard
        onClick={() => setIsModalOpen(true)}
        className={`cursor-pointer transition ${
          isOpen ? "bg-green-100" : "hover:shadow-lg"
        }`}
      >
        <h4 className="text-lg text-c-primary-light font-semibold mb-2">Kincs #{treasure.number}</h4>
        <p className="text-white">{treasure.question}</p>
        {isOpen && (
          <p className="text-gray-100 mt-2">
            ✅ Helyes válasz: <strong>{treasure.correctAns}</strong>
          </p>
        )}
        <p className="text-sm text-gray-50 italic mt-2">
          {isOpen ? "✔️ Megnyitva" : "🔒 Zárva"}
        </p>
      </InverseCard>

      {isModalOpen && (
        <TreasureCardModal
          treasure={treasure}
          isOpen={isOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}
export default TreasureCard;
