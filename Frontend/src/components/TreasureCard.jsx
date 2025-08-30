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
        className={`cursor-pointer transition rounded-xl p-6 shadow-md hover:shadow-lg ${
          isOpen
            ? "bg-green-50 border border-green-300"
            : "bg-white border border-yellow-300"
        }`}
      >
        <h3 className="text-lg font-semibold text-black mb-2">
          Kincs #{treasure.number}
        </h3>
        <p className="text-gray-800 text-xl font-medium">{treasure.question}</p>
        <h4 className="text-sm text-gray-600 mt-2 italic">
          Merre? {treasure.hint}
        </h4>
        {isOpen && (
          <p className="text-sm text-gray-700 mt-3">
            ✅ Helyes válasz: <strong>{treasure.correctAns}</strong>
          </p>
        )}
        <p className="text-xs text-gray-500 mt-3">
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
