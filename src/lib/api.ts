import { cache } from 'react';
import { connectToDatabase } from '@/drizzle/db';
import { eq } from 'drizzle-orm';
import { gestanteInfo, lactanteInfo, ninoSanoInfo, sobrePesoInfo, gemelarInfo } from '@/drizzle/schema';
import type { InferModel } from 'drizzle-orm';

export type PatientType = 'gestante' | 'lactante' | 'bajo-peso' | 'sobre-peso' | 'gemelar';
export type Gestante = InferModel<typeof gestanteInfo>;
export type Lactante = InferModel<typeof lactanteInfo>;
export type NinoSano = InferModel<typeof ninoSanoInfo>;
export type SobrePeso = InferModel<typeof sobrePesoInfo>;
export type Gemelar = InferModel<typeof gemelarInfo>;

interface PatientData {
  id: string;
  name: string;
  type: PatientType;
  history: Array<{
    date: Date;
    weight: number;
    height: number;
    bmi: number;
    notes?: string;
  }>;
  appointments: Array<{
    id: string;
    date: Date;
    status: 'scheduled' | 'completed' | 'cancelled';
    notes?: string;
  }>;
}

interface AppointmentData {
  id: string;
  patientId: string;
  date: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: string;
  notes?: string;
}

// Cache the fetch requests for 60 seconds
const CACHE_TIME = 60 * 1000;

// Get all patients with optional filtering
export const getPatients = cache(async (type?: PatientType) => {
  const url = type ? `/api/patients?type=${type}` : '/api/patients';
  const res = await fetch(url, {
    next: { revalidate: CACHE_TIME }
  });
  
  if (!res.ok) throw new Error('Failed to fetch patients');
  return res.json() as Promise<PatientData[]>;
});

// Get a single patient by ID
export const getPatient = cache(async (id: string) => {
  const res = await fetch(`/api/patients/${id}`, {
    next: { revalidate: CACHE_TIME }
  });
  
  if (!res.ok) throw new Error('Failed to fetch patient');
  return res.json() as Promise<PatientData>;
});

// Get patient appointments
export const getPatientAppointments = cache(async (patientId: string) => {
  const res = await fetch(`/api/patients/${patientId}/appointments`, {
    next: { revalidate: CACHE_TIME }
  });
  
  if (!res.ok) throw new Error('Failed to fetch appointments');
  return res.json() as Promise<AppointmentData[]>;
});

// Create or update patient data
export async function updatePatient(id: string, data: Partial<PatientData>) {
  const res = await fetch(`/api/patients/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to update patient');
  return res.json() as Promise<PatientData>;
}

// Schedule new appointment
export async function createAppointment(data: Omit<AppointmentData, 'id'>) {
  const res = await fetch('/api/appointments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to create appointment');
  return res.json() as Promise<AppointmentData>;
}

// Update appointment status
export async function updateAppointmentStatus(
  id: string,
  status: AppointmentData['status'],
  notes?: string
) {
  const res = await fetch(`/api/appointments/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status, notes }),
  });

  if (!res.ok) throw new Error('Failed to update appointment');
  return res.json() as Promise<AppointmentData>;
}

// Get analytics data
export const getAnalytics = cache(async () => {
  const res = await fetch('/api/analytics', {
    next: { revalidate: CACHE_TIME }
  });
  
  if (!res.ok) throw new Error('Failed to fetch analytics');
  return res.json() as Promise<{
    totalPatients: number;
    patientsByType: Record<PatientType, number>;
    appointmentsByStatus: Record<AppointmentData['status'], number>;
    recentTrends: {
      date: string;
      count: number;
    }[];
  }>;
});

// Fetch gemelar info by ID
export async function fetchGemelarInfo(id: string) {
  const db = await connectToDatabase();
  const result = await db.select().from(gemelarInfo).where(eq(gemelarInfo.id, parseInt(id))).execute();
  if (!result[0]) throw new Error('Gemelar not found');
  return result[0];
}

export async function fetchGestanteInfo(id: string) {
  const db = await connectToDatabase();
  const result = await db.select().from(gestanteInfo).where(eq(gestanteInfo.id, parseInt(id))).execute();
  if (!result[0]) throw new Error('Gestante not found');
  return result[0];
}

export async function fetchLactanteInfo(id: string) {
  const db = await connectToDatabase();
  const result = await db.select().from(lactanteInfo).where(eq(lactanteInfo.id, parseInt(id))).execute();
  if (!result[0]) throw new Error('Lactante not found');
  return result[0];
}

export async function fetchNinoSanoInfo(id: string) {
  const db = await connectToDatabase();
  const result = await db.select().from(ninoSanoInfo).where(eq(ninoSanoInfo.id, parseInt(id))).execute();
  if (!result[0]) throw new Error('Niño Sano not found');
  return result[0];
}

export async function fetchSobrePesoInfo(id: string) {
  const db = await connectToDatabase();
  const result = await db.select().from(sobrePesoInfo).where(eq(sobrePesoInfo.id, parseInt(id))).execute();
  if (!result[0]) throw new Error('Sobre Peso not found');
  return result[0];
}