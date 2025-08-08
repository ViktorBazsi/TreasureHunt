import { useEffect, useState } from "react";
import { InverseCard } from "./ui/Card";
import TreasureAnswerForm from "./TreasureAnswerForm";

function TreasureCardModal({ treasure, isOpen, onClose, onSuccess }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
      <InverseCard
        className={`w-full max-w-lg relative transform transition-all duration-300 ease-out ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          aria-label="Bezárás"
        >
          ❌
        </button>

        <h2 className="text-2xl font-bold mb-2 text-center text-c-primary-dark">
          Kincs #{treasure.number}
        </h2>
        <p className="mb-4 text-center text-white">{treasure.question}</p>

        <TreasureAnswerForm
          treasureId={treasure.id}
          disabled={isOpen}
          onSuccess={onSuccess}
        />
      </InverseCard>
    </div>
  );
}
export default TreasureCardModal;
