import { useState } from "react";
import TreasureCardModal from "./TreasureCardModal";

function TreasureCard({ treasure, isOpen, onTreasureOpened }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSuccess = () => {
    setIsModalOpen(false);
    onTreasureOpened?.();
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className={`p-4 border rounded-xl shadow cursor-pointer transition ${
          isOpen ? "bg-green-100" : "bg-white hover:shadow-lg"
        }`}
      >
        <h3 className="text-xl font-semibold mb-2">Kincs #{treasure.number}</h3>
        <p className="text-gray-700">{treasure.question}</p>
        {isOpen && (
          <p className="text-green-700 mt-2">
            ✅ Helyes válasz: <strong>{treasure.correctAns}</strong>
          </p>
        )}
        <p className="text-sm text-gray-500 italic">
          {isOpen ? "✔️ Megnyitva" : "🔒 Zárva"}
        </p>
      </div>

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
