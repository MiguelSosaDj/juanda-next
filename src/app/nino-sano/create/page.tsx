"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Nino = {
  id: number;
  nombre: string;
  identificacion: string;
  sexo: string;
  edad: number;
  estatura: number;
  talla: number;
  peso: number;
  perimetroCefalico: number;
};

export default function CreateNinoSanoPage() {
  const [ninos, setNinos] = useState<Nino[]>([]);

  useEffect(() => {
    fetch("/api/ninos/list")
      .then((res) => res.json())
      .then((data) => setNinos(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-10 px-6">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-white drop-shadow-lg">Selecciona un Niño</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {ninos.map((nino) => (
          <div
            key={nino.id}
            className="bg-gradient-to-br from-gray-800 to-gray-700 text-white rounded-2xl shadow-2xl p-6 border border-gray-600 hover:scale-105 transform transition duration-300 ease-in-out"
          >
            <div className="mb-4 space-y-1">
              <p className="text-xl font-semibold">👶 {nino.nombre}</p>
              <p>Edad: <span className="font-medium">{nino.edad} años</span></p>
              <p>ID: <span className="font-medium">{nino.identificacion}</span></p>
              <p>Sexo: <span className="font-medium">{nino.sexo}</span></p>
            </div>

            <Link
              href={`/nino-sano/create/${nino.id}`}
              className="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:brightness-110 text-white text-center py-3 rounded-xl font-bold shadow-md transition duration-300"
            >
              Seleccionar
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
