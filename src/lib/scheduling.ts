type Frequency = 'weekly' | 'biweekly' | 'monthly';

interface AppointmentRule {
  frequency: Frequency;
  duration: number; // in minutes
  startDate: Date;
  endDate?: Date;
  daysOfWeek?: number[]; // 0 = Sunday, 6 = Saturday
}

interface TimeSlot {
  start: Date;
  end: Date;
  available: boolean;
}

export function generateAppointments(rule: AppointmentRule): Date[] {
  const appointments: Date[] = [];
  let currentDate = new Date(rule.startDate);
  const endDate = rule.endDate || addMonths(rule.startDate, 6);

  while (currentDate <= endDate) {
    if (isValidAppointmentDay(currentDate, rule.daysOfWeek)) {
      appointments.push(new Date(currentDate));
    }

    switch (rule.frequency) {
      case 'weekly':
        currentDate = addDays(currentDate, 7);
        break;
      case 'biweekly':
        currentDate = addDays(currentDate, 14);
        break;
      case 'monthly':
        currentDate = addMonths(currentDate, 1);
        break;
    }
  }

  return appointments;
}

export function generateTimeSlots(
  date: Date,
  workingHours: { start: string; end: string },
  duration: number,
  existingAppointments: { start: Date; end: Date }[]
): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const [startHour, startMinute] = workingHours.start.split(':').map(Number);
  const [endHour, endMinute] = workingHours.end.split(':').map(Number);

  let currentSlot = new Date(date);
  currentSlot.setHours(startHour, startMinute, 0, 0);

  const endTime = new Date(date);
  endTime.setHours(endHour, endMinute, 0, 0);

  while (currentSlot < endTime) {
    const slotEnd = new Date(currentSlot.getTime() + duration * 60000);
    
    const isAvailable = !existingAppointments.some(
      appointment =>
        (currentSlot >= appointment.start && currentSlot < appointment.end) ||
        (slotEnd > appointment.start && slotEnd <= appointment.end)
    );

    slots.push({
      start: new Date(currentSlot),
      end: slotEnd,
      available: isAvailable,
    });

    currentSlot = slotEnd;
  }

  return slots;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

function isValidAppointmentDay(date: Date, allowedDays?: number[]): boolean {
  if (!allowedDays || allowedDays.length === 0) return true;
  return allowedDays.includes(date.getDay());
}