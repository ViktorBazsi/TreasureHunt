import { useEffect, useState } from "react";
import TreasureAnswerForm from "./TreasureAnswerForm";

function TreasureCardModal({ treasure, isOpen, onClose, onSuccess }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // pici késleltetés a smooth megjelenéshez
    const timeout = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className={`bg-white w-full max-w-lg p-6 rounded-xl shadow-lg relative transform transition-all duration-300 ease-out ${
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

        <h2 className="text-2xl font-bold mb-2 text-center">
          Kincs #{treasure.number}
        </h2>
        <p className="mb-4 text-center text-gray-700">{treasure.question}</p>

        <TreasureAnswerForm
          treasureId={treasure.id}
          disabled={isOpen}
          onSuccess={onSuccess}
        />
      </div>
    </div>
  );
}

export default TreasureCardModal;
