import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import progressService from "../services/progress.service";
import Button from "../components/ui/Button";
import { toast } from "react-toastify";

function LandingPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!user) return setLoading(false);
      try {
        const data = await progressService.getMyProgress();
        setProgress(data);
      } catch (error) {
        console.log(error);
        toast.error("Nem sikerült betölteni a haladásodat.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const handleStart = () => {
    navigate("/treasures");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-white flex items-center justify-center px-6">
      <div className="max-w-3xl text-center space-y-6 py-12">
        {/* Hero szöveg */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-black">
          Üdv a Kincskeresésben!
        </h1>
        <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
          Ez az oldal egy különleges színházi kalandra hív. Videók nyomába
          indulhatsz, amelyekben elrejtett kérdések várnak rád. Ha helyesen
          válaszolsz, kincseket nyithatsz ki – minden kincs egy új titkot és
          élményt rejt.
        </p>
        <ul className="text-left text-gray-800 list-disc list-inside space-y-2">
          <li>
            Minden társulatnak <strong>3 kincse</strong> van. Ha mindhármat
            kinyitod,{" "}
            <span className="font-semibold text-yellow-600">nyeremény</span> vár
            tőled az adott társulattól.
          </li>
          <li>
            Ha pedig mind a <strong>8 társulat</strong> összes kincsét
            megszerzed, bekerülsz a{" "}
            <span className="font-semibold text-black">
              főnyeremény sorsolásába
            </span>
            .
          </li>
        </ul>

        <div className="bg-black text-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-2">🎁 A főnyeremény:</h2>
          <p>
            Nagy Mari exkluzív monodrámája – előadva a te otthonodban, legyen az
            a nappalid, a konyhád vagy bármelyik szobád.
          </p>
        </div>

        {/* CTA gomb – három állapot */}
        {!loading && (
          <>
            {!user && (
              <Button
                variant="secondary"
                onClick={handleLogin}
                className="mt-6 px-8 py-3 text-lg font-semibold rounded-xl bg-yellow-500 hover:bg-yellow-600 text-black shadow-lg transition"
              >
                Jelentkezz be a kincsvadászathoz!
              </Button>
            )}
            {user && progress && progress.length === 0 && (
              <Button
                variant="secondary"
                onClick={handleStart}
                className="mt-6 px-8 py-3 text-lg font-semibold rounded-xl bg-yellow-500 hover:bg-yellow-600 text-black shadow-lg transition"
              >
                Indulj el a kincsvadászatban!
              </Button>
            )}
            {user && progress && progress.length > 0 && (
              <Button
                variant="secondary"
                onClick={handleStart}
                className="mt-6 px-8 py-3 text-lg font-semibold rounded-xl bg-yellow-500 hover:bg-yellow-600 text-black shadow-lg transition"
              >
                Folytasd a kincsvadászatot
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
