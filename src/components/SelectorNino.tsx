"use client";

import { useEffect, useState } from "react";

type NinoBaseInfo = {
  id: number;
  nombre: string;
  identificacion: string;
  sexo: string;
  edad: number;
  talla: number;
  peso: number;
  perimetroCefalico: number;
};

interface Props {
  onSelect: (nino: NinoBaseInfo) => void;
}

export default function SelectorNino({ onSelect }: Props) {
  const [ninos, setNinos] = useState<NinoBaseInfo[]>([]);

  useEffect(() => {
    fetch("/api/nino-sano/list")
      .then(res => res.json())
      .then(setNinos)
      .catch(console.error);
  }, []);

  return (
    <div className="mb-6">
      <label>Selecciona un niño:</label>
      <select onChange={(e) => {
        const selected = ninos.find(n => n.id === parseInt(e.target.value));
        if (selected) onSelect(selected);
      }}>
        <option value="">Seleccione...</option>
        {ninos.map(nino => (
          <option key={nino.id} value={nino.id}>
            {nino.nombre} - {nino.identificacion}
          </option>
        ))}
      </select>
    </div>
  );
}
