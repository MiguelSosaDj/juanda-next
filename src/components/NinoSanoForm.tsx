"use client";

import { useEffect, useState } from "react";

type NinoBaseInfo = {
  id: number;
  nombre: string;
  sexo: string;
  edad: number;
  talla: number;
  peso: number;
  perimetroCefalico: number;
};

interface Props {
  baseInfo: NinoBaseInfo;
}

export default function NinoSanoForm({ baseInfo }: Props) {
  const [alimentacion, setAlimentacion] = useState("No Aplica");
  const [pt, setPt] = useState("");
  const [te, setTe] = useState("");
  const [pce, setPce] = useState("");
  const [gananciaPesoGr, setGananciaPesoGr] = useState(0);
  const [calorias1gTejido, setCalorias1gTejido] = useState(0);
  const [vecesQueGane, setVecesQueGane] = useState(1);
  const [lecheMaternaExclusiva, setLecheMaternaExclusiva] = useState(0);
  const [formulaInfantil, setFormulaInfantil] = useState(0);
  const [lecheMaternaYFormula, setLecheMaternaYFormula] = useState(0);
  const [rango118Anos, setRango118Anos] = useState(0);
  const [caloriasCrecimiento, setCaloriasCrecimiento] = useState(0);
  const [ajusteDeficit, setAjusteDeficit] = useState(0);
  const [kcalTotales, setKcalTotales] = useState(0);

  useEffect(() => {
    const crecimiento = gananciaPesoGr * calorias1gTejido;
    setCaloriasCrecimiento(crecimiento);
    const deficit = crecimiento * vecesQueGane * 5;
    setAjusteDeficit(deficit);
    setKcalTotales(crecimiento + deficit);
  }, [gananciaPesoGr, calorias1gTejido, vecesQueGane]);

  const handleSubmit = async () => {
    const data = {
      baseInfoId: baseInfo.id,
      alimentacion,
      pt,
      te,
      pce,
      gananciaPesoGr,
      calorias1gTejido,
      vecesQueGane,
      caloriasCrecimiento,
      ajusteDeficit,
      kcalTotales,
      lecheMaternaExclusiva,
      formulaInfantil,
      lecheMaternaYFormula,
      rango118Anos,
    };

    try {
      const res = await fetch("/api/nino-sano/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error");
      alert("Guardado correctamente");
    } catch {
      alert("Error al guardar");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-10 px-6">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-600">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-white drop-shadow-md">Formulario Niño Sano</h2>

        <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-700 p-4 rounded-lg">
          <div><span className="font-semibold">Nombre:</span> {baseInfo.nombre}</div>
          <div><span className="font-semibold">Sexo:</span> {baseInfo.sexo}</div>
          <div><span className="font-semibold">Edad:</span> {baseInfo.edad} años</div>
          <div><span className="font-semibold">Talla:</span> {baseInfo.talla} cm</div>
          <div><span className="font-semibold">Peso:</span> {baseInfo.peso} kg</div>
          <div><span className="font-semibold">Perímetro Cefálico:</span> {baseInfo.perimetroCefalico} cm</div>
        </div>

        <div className="space-y-4">
          {/* ALIMENTACION */}
          <div>
            <label className="block mb-1 font-semibold">Alimentación</label>
            <select value={alimentacion} onChange={e => setAlimentacion(e.target.value)}
              className="w-full bg-gray-700 border border-gray-500 rounded-lg p-2 text-white">
              <option value="Leche materna exclusiva">Leche materna exclusiva</option>
              <option value="Fórmula infantil">Fórmula infantil</option>
              <option value="Leche materna y fórmula">Leche materna y fórmula</option>
              <option value="No Aplica">No Aplica</option>
            </select>
          </div>

          {/* PT */}
          <div>
            <label className="block mb-1 font-semibold">P/T</label>
            <select value={pt} onChange={e => setPt(e.target.value)}
              className="w-full bg-gray-700 border border-gray-500 rounded-lg p-2 text-white">
              <option value="> +3">&gt; +3</option>
              <option value="> +2 a ≤ +3">&gt; +2 a ≤ +3</option>
              <option value="> +1 a ≤ +2">&gt; +1 a ≤ +2</option>
              <option value="≥ -1 a ≤ +1">≥ -1 a ≤ +1</option>
              <option value="≥ -2 a < -1">≥ -2 a &lt; -1</option>
              <option value="< -2 a ≥ -3">&lt; -2 a ≥ -3</option>
              <option value="< -3">&lt; -3</option>
              <option value="No Aplica">No Aplica</option>
            </select>
          </div>

          {/* TE */}
          <div>
            <label className="block mb-1 font-semibold">T/E</label>
            <select value={te} onChange={e => setTe(e.target.value)}
              className="w-full bg-gray-700 border border-gray-500 rounded-lg p-2 text-white">
              <option value="≥ -1">≥ -1</option>
              <option value="≥ -2 a < -1">≥ -2 a &lt; -1</option>
              <option value="< -2">&lt; -2</option>
            </select>
          </div>

          {/* PCE */}
          <div>
            <label className="block mb-1 font-semibold">PC/E</label>
            <select value={pce} onChange={e => setPce(e.target.value)}
              className="w-full bg-gray-700 border border-gray-500 rounded-lg p-2 text-white">
              <option value="> +2">&gt; +2</option>
              <option value="≥ -2 a ≤ +2">≥ -2 a ≤ +2</option>
              <option value="< -2">&lt; -2</option>
            </select>
          </div>

          {/* CAMPOS NUMERICOS */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Ganancia Peso (g):</label>
              <input type="number" value={gananciaPesoGr}
                onChange={e => setGananciaPesoGr(parseFloat(e.target.value))}
                className="w-full bg-gray-700 border border-gray-500 rounded-lg p-2 text-white" />
            </div>
            <div>
              <label>Calorías 1g tejido:</label>
              <input type="number" value={calorias1gTejido}
                onChange={e => setCalorias1gTejido(parseFloat(e.target.value))}
                className="w-full bg-gray-700 border border-gray-500 rounded-lg p-2 text-white" />
            </div>
            <div>
              <label>Veces que gane:</label>
              <select value={vecesQueGane} onChange={e => setVecesQueGane(parseInt(e.target.value))}
                className="w-full bg-gray-700 border border-gray-500 rounded-lg p-2 text-white">
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
            <div>
              <label>Leche materna exclusiva (ml):</label>
              <input type="number" value={lecheMaternaExclusiva}
                onChange={e => setLecheMaternaExclusiva(parseFloat(e.target.value))}
                className="w-full bg-gray-700 border border-gray-500 rounded-lg p-2 text-white" />
            </div>
            <div>
              <label>Fórmula infantil (ml):</label>
              <input type="number" value={formulaInfantil}
                onChange={e => setFormulaInfantil(parseFloat(e.target.value))}
                className="w-full bg-gray-700 border border-gray-500 rounded-lg p-2 text-white" />
            </div>
            <div>
              <label>Leche materna y fórmula (ml):</label>
              <input type="number" value={lecheMaternaYFormula}
                onChange={e => setLecheMaternaYFormula(parseFloat(e.target.value))}
                className="w-full bg-gray-700 border border-gray-500 rounded-lg p-2 text-white" />
            </div>
            <div>
              <label>Rango 1-18 años:</label>
              <input type="number" value={rango118Anos}
                onChange={e => setRango118Anos(parseFloat(e.target.value))}
                className="w-full bg-gray-700 border border-gray-500 rounded-lg p-2 text-white" />
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg mt-4">
            <p>Calorías crecimiento: {caloriasCrecimiento}</p>
            <p>Ajuste déficit: {ajusteDeficit}</p>
            <p>Kcal Totales: {kcalTotales}</p>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:brightness-110 transition duration-300"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
