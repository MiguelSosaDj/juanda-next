"use client";

import { useState } from "react";

type Alumno = {
  id: number;
  nombre: string;
  telefono: string;
  direccion: string;
};

export default function AlumnoForm({ data }: { data: Alumno }) {
  const [formData, setFormData] = useState(data);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/alumno/update", {
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
      <h2 className="text-xl font-semibold mb-4">Editar Alumno</h2>

      <div className="space-y-2">
        <label className="block font-medium">Nombre:</label>
        <input className="border p-2 w-full rounded" name="nombre" value={formData.nombre} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Teléfono:</label>
        <input className="border p-2 w-full rounded" name="telefono" value={formData.telefono} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Dirección:</label>
        <input className="border p-2 w-full rounded" name="direccion" value={formData.direccion} onChange={handleChange} />
      </div>

      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
        {loading ? "Actualizando..." : "Guardar"}
      </button>
    </form>
  );
}
