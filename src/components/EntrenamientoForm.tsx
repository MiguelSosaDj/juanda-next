"use client";

import { useState } from "react";

export default function EntrenamientoForm({ alumnoId }: { alumnoId: number }) {
  const [formData, setFormData] = useState({
    semana: 1,
    peso: 0,
    tipoEntrenamiento: "",
    altura: 0
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "tipoEntrenamiento" ? value : Number(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/entrenamiento/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, alumnoId }),
      });

      if (!res.ok) throw new Error("Error creando entrenamiento");

      alert("Entrenamiento creado");
    } catch (err) {
      console.error(err);
      alert("Error");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow-md space-y-4">
      <h2 className="text-xl font-semibold mb-4">Nuevo Entrenamiento</h2>

      <div>
        <label>Semana:</label>
        <input className="border p-2 w-full rounded" name="semana" type="number" value={formData.semana} onChange={handleChange} />
      </div>

      <div>
        <label>Peso:</label>
        <input className="border p-2 w-full rounded" name="peso" type="number" value={formData.peso} onChange={handleChange} />
      </div>

      <div>
        <label>Tipo:</label>
        <input className="border p-2 w-full rounded" name="tipoEntrenamiento" value={formData.tipoEntrenamiento} onChange={handleChange} />
      </div>

      <div>
        <label>Altura:</label>
        <input className="border p-2 w-full rounded" name="altura" type="number" value={formData.altura} onChange={handleChange} />
      </div>

      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
        {loading ? "Guardando..." : "Crear"}
      </button>
    </form>
  );
}
