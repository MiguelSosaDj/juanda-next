"use client";

import { useState } from "react";

type NinoSanoInfo = {
  id: number;
  alimentacion: string;
  pt?: string;
  te?: string;
  pce?: string;
  clasificacionPt?: string;
  clasificacionTe?: string;
  clasificacionPce?: string;
};

interface NinoSanoFormProps {
  data: NinoSanoInfo;
  ninoId?: string;
}

export default function NinoSanoForm({ data }: NinoSanoFormProps) {
  const [formData, setFormData] = useState(data);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/nino-sano/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error("Error actualizando");
      }

      alert("Datos actualizados correctamente");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow-md space-y-4">
      <h2 className="text-xl font-semibold mb-4">Editar Niño Sano</h2>

      <div className="space-y-2">
        <label className="block font-medium">Alimentación:</label>
        <input className="border p-2 w-full rounded" name="alimentacion" value={formData.alimentacion} onChange={handleChange} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block font-medium">PT:</label>
          <input className="border p-2 w-full rounded" name="pt" value={formData.pt || ""} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">TE:</label>
          <input className="border p-2 w-full rounded" name="te" value={formData.te || ""} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">PCE:</label>
          <input className="border p-2 w-full rounded" name="pce" value={formData.pce || ""} onChange={handleChange} />
        </div>
      </div>

      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
        {loading ? "Actualizando..." : "Guardar"}
      </button>
    </form>
  );
}
