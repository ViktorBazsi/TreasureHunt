import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import companyService from "../services/company.service";
import PrizeCard from "../components/PrizeCard";

function PrizesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await companyService.listCompanies();
        setCompanies(data || []);
      } catch (error) {
        console.error(error);
        toast.error("Nem sikerült betölteni a nyereményeket.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="section page-loading">
          <p className="text-c-text/80">Betöltés...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="section">
        {/* Oldalfejléc + leírás */}
        <div className="card border mb-8 bg-white/0">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-c-secondary-dark">
            Nyeremények
          </h1>
          <p className="text-black">
            Minden társulat saját ajándékkal készül. Ha egy társulat mindhárom
            kincsét kinyitod, megkapod az adott ajándékot. Ha mind a nyolc
            társulatnál teljesítesz, bekerülsz a főnyeremény sorsolásába. 🎁
          </p>
        </div>

        {/* Főnyeremény kiemelve */}
        <div className="card-inverse mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Főnyeremény</h2>
          <p className="text-white/90">
            Nagy Mari monodrámája <strong>exkluzíve</strong> előadva a
            nappalidban, konyhádban, vagy ahol szeretnéd. A sorsolásra az kerül
            be, aki <strong>mind a 8 társulat</strong> mindhárom kincsét
            kinyitotta (összesen 24 helyes válasz).
          </p>
        </div>

        {/* Társulati nyeremények listája */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-8">
          {companies.map((c) => (
            <PrizeCard key={c.id} company={c} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PrizesPage;
