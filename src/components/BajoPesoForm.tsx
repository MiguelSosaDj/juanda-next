"use client";

import { useState } from "react";

type BajoPesoInfo = {
  id: number;
  imcSaludable: number;
  pesoPregestacionalSaludable: number;
  gramosSemana: number;
  ganancia1Trimestre: number;
  ganancia2y3TrimestreGramos: number;
  ganancia2y3TrimestreKg: number;
  pesoTotalEmbarazo: number;
  pesoFinal: number;
  gananciaPesoEmbarazo: number;
  gananciaPesoClasificacion: string;
  gananciaPrimerTrimestre: number;
  ganancia2y3TrimestreGsem: number;
  pesoTotalEmbarazoTitulo4: number;
  imcSemana40: number;
  gananciaTipo: string;
  gano: number;
  debioGanar: number;
  pesoAGanar: number;
  semanasFaltantes: number;
  gramosPorSemana: number;
  clasificacionGramos: string;
  tasaMetabolica: number;
  factorActividadFisica: number;
  requerimientoEnergiaTotal: number;
  adicionGestante: number;
  totalEnergiaAdicion: number;
  metodo1GDia: number;
  metodo1Kcal: number;
  metodo1Amdr: number;
  metodo2GDia: number;
  metodo2Kcal: number;
  metodo2Amdr: number;
};

export default function BajoPesoForm({ data, bajoPesoId }: { data: BajoPesoInfo; bajoPesoId: string }) {
  const [formData, setFormData] = useState(data);
  const [loading, setLoading] = useState(false);
  void bajoPesoId; // This is to ensure the bajoPesoId is used in the future if needed

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: isNaN(Number(value)) ? value : Number(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/bajo-peso/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error actualizando");

      alert("Datos actualizados correctamente");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md space-y-4">
      <h2 className="text-xl font-semibold mb-4">Editar Bajo Peso</h2>

      {Object.entries(formData).map(([key, value]) => {
        if (key === "id") return null;

        return (
          <div key={key} className="space-y-2">
            <label className="block font-medium capitalize">{key}:</label>
            <input
              className="border p-2 w-full rounded"
              name={key}
              type={typeof value === "number" ? "number" : "text"}
              value={value}
              onChange={handleChange}
            />
          </div>
        );
      })}

      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
        {loading ? "Actualizando..." : "Guardar"}
      </button>
    </form>
  );
}
