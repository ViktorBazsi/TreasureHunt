import { useEffect, useState } from "react";
import TreasureAnswerForm from "./TreasureAnswerForm";

function TreasureCardModal({ treasure, isOpen, onClose, onSuccess }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
      <div
        className={`bg-white/10 rounded-2xl shadow-2xl w-full max-w-lg relative transform transition-all duration-300 ease-out ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Bezárás gomb */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:text-gray-600 transition text-xl"
          aria-label="Bezárás"
        >
          ✕
        </button>

        {/* Fejléc */}
        <div className="bg-yellow-400 rounded-t-2xl p-6 text-center">
          <h2 className="text-2xl font-extrabold text-black">
            Kincs #{treasure.number}
          </h2>
        </div>

        {/* Tartalom */}
        <div className="p-6 text-center">
          <p className="mb-6 text-lg ">{treasure.question}</p>

          {/* Ha nyitva van */}
          {isOpen ? (
            <div className="bg-green-100/40 border border-green-300 rounded-xl p-4 shadow-inner">
              <p className="text-green-700 font-semibold mb-2">
                ✅ Ez a kincs már fel van nyitva!
              </p>
              <p className="text-gray-700">
                Helyes válasz:{" "}
                <span className="font-bold">{treasure.correctAns}</span>
              </p>
            </div>
          ) : (
            <>
              <p className="mb-4 text-sm  italic">
                Add meg a válaszodat, hogy kinyisd a kincset!
              </p>
              <TreasureAnswerForm
                treasureId={treasure.id}
                disabled={isOpen}
                onSuccess={onSuccess}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default TreasureCardModal;
