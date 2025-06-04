"use client";

import { useState } from "react";

type GestanteInfo = {
  id: number;
  seleccionMultiple: string;
  semanaGestacion: number;
  pesoActual: number;
  pesoPregestacional: number;
  imcPregestacional: number;
  imcGestacional: number;
  imcPregestacionalCat: string;
};

interface GestanteFormProps {
  data: GestanteInfo;
  gestanteId?: string;
}

export default function GestanteForm({ data }: GestanteFormProps) {
  const [formData, setFormData] = useState(data);
  const [loading, setLoading] = useState(false);

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
      const res = await fetch("/api/gestante/update", {
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
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow-md space-y-4">
      <h2 className="text-xl font-semibold mb-4">Editar Gestante</h2>

      <div className="space-y-2">
        <label className="block font-medium">Selección múltiple:</label>
        <select
          name="seleccionMultiple"
          value={formData.seleccionMultiple}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          <option value="adecuado">Adecuado</option>
          <option value="bajo_peso">Bajo peso</option>
          <option value="sobrepeso">Sobrepeso</option>
          <option value="obesidad">Obesidad</option>
          <option value="adolescente">Adolescente</option>
          <option value="gemelar">Gemelar</option>
        </select>
      </div>

      {[
        { name: "semanaGestacion", label: "Semana de gestación" },
        { name: "pesoActual", label: "Peso actual" },
        { name: "pesoPregestacional", label: "Peso pregestacional" },
        { name: "imcPregestacional", label: "IMC pregestacional" },
        { name: "imcGestacional", label: "IMC gestacional" },
        { name: "imcPregestacionalCat", label: "Clasificación IMC", isText: true },
      ].map(({ name, label, isText }) => (
        <div key={name} className="space-y-2">
          <label className="block font-medium">{label}:</label>
          <input
            className="border p-2 w-full rounded"
            name={name}
            type={isText ? "text" : "number"}
            value={formData[name as keyof GestanteInfo]}
            onChange={handleChange}
          />
        </div>
      ))}

      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
        {loading ? "Actualizando..." : "Guardar"}
      </button>
    </form>
  );
}
