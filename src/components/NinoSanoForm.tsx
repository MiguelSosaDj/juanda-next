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
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Editar Niño Sano
      </h2>

      <div className="space-y-2">
        <label className="block font-medium text-gray-700 dark:text-gray-300">
          Alimentación:
        </label>
        <input
          className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="alimentacion"
          value={formData.alimentacion}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300">PT:</label>
          <input
            className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="pt"
            value={formData.pt || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300">TE:</label>
          <input
            className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="te"
            value={formData.te || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300">PCE:</label>
          <input
            className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="pce"
            value={formData.pce || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Actualizando..." : "Guardar"}
      </button>
    </form>
  );
}
