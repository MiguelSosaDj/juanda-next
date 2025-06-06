"use client";

import { useState } from "react";

type SobrePesoInfo = {
  [key: string]: number | string;
  id: number;
};

interface SobrePesoFormProps {
  data: SobrePesoInfo;
  sobrePesoId?: string;
}

export default function SobrePesoForm({ data }: SobrePesoFormProps) {
  const [formData, setFormData] = useState<SobrePesoInfo>(data);
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
      const res = await fetch("/api/sobre-peso/update", {
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
      <h2 className="text-xl font-semibold mb-4">Editar Sobrepeso</h2>

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
